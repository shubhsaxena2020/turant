"""Convert a Hugging Face Whisper fine-tune to the layout transformers.js loads:
<out>/config.json, tokenizer.json (+ files), generation_config.json, onnx/encoder_model_quantized.onnx,
onnx/decoder_model_merged_quantized.onnx.

  python convert_whisper.py <hf model id> <out dir> [--bits 4]

Default: 8-bit dynamic quantisation (like transformers.js "q8"). --bits 4: matrix-multiply weights in 4 bits
(MatMulNBits, block 32) and the remaining embedding lookups in 8 bits; about half the size, same file names.
The two decoders are quantised first and merged after, so the merged model shares one copy of the quantised
weights (quantising an already merged model leaves the If-branch weights in fp32).
Export with transformers 4.40 / optimum 1.19: 4.43+ adds a cache_position input transformers.js 3.8 does not send."""
import json, shutil, sys
from pathlib import Path

import onnx
from huggingface_hub import hf_hub_download
from onnxruntime.quantization import QuantType, quantize_dynamic
from optimum.exporters.onnx import main_export
from optimum.onnx import merge_decoders
from transformers import AutoFeatureExtractor, AutoTokenizer

model_id, out = sys.argv[1], Path(sys.argv[2])
bits = int(sys.argv[sys.argv.index("--bits") + 1]) if "--bits" in sys.argv else 8
raw, q = out / "_raw", out / "_q"


def quantize(src: Path, dst: Path):
    if bits == 8:
        quantize_dynamic(src, dst, weight_type=QuantType.QUInt8)
        return
    from onnxruntime.quantization.matmul_4bits_quantizer import MatMul4BitsQuantizer

    m4 = MatMul4BitsQuantizer(onnx.load(str(src)), block_size=32, is_symmetric=True)
    m4.process()
    tmp = dst.with_suffix(".q4.onnx")
    m4.model.save_model_to_file(str(tmp), use_external_data_format=False)
    quantize_dynamic(tmp, dst, weight_type=QuantType.QUInt8, op_types_to_quantize=["Gather"])
    tmp.unlink()


main_export(model_id, output=raw, task="automatic-speech-recognition-with-past", opset=17, no_post_process=True)
(out / "onnx").mkdir(parents=True, exist_ok=True)
q.mkdir(exist_ok=True)
quantize(raw / "encoder_model.onnx", out / "onnx" / "encoder_model_quantized.onnx")
for name in ["decoder_model", "decoder_with_past_model"]:
    quantize(raw / f"{name}.onnx", q / f"{name}.onnx")
merge_decoders(q / "decoder_model.onnx", q / "decoder_with_past_model.onnx", save_path=str(out / "onnx" / "decoder_model_merged_quantized.onnx"), strict=False)
AutoTokenizer.from_pretrained(model_id, use_fast=True).save_pretrained(out)
AutoFeatureExtractor.from_pretrained(model_id).save_pretrained(out)
shutil.copy(raw / "config.json", out / "config.json")
# The fine-tune keeps Whisper's multilingual vocabulary, so the stock generation config (language and task
# token ids) applies; some 2022 fine-tunes ship an old one without lang_to_id.
gen = json.load(open(hf_hub_download("openai/whisper-base", "generation_config.json")))
json.dump(gen, open(out / "generation_config.json", "w"), indent=1)
shutil.rmtree(raw)
shutil.rmtree(q)
for f in sorted(out.rglob("*")):
    if f.is_file():
        print(f"{f.stat().st_size / 1e6:8.1f} MB  {f.relative_to(out)}")
