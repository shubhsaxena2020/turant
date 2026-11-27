"""Convert a Hugging Face Whisper fine-tune to the layout transformers.js loads:
<out>/config.json, tokenizer.json (+ files), generation_config.json, onnx/encoder_model_quantized.onnx,
onnx/decoder_model_merged_quantized.onnx (8-bit dynamic quantisation, like transformers.js "q8").
The two decoders are quantised first and merged after, so the merged model shares one copy of the
8-bit weights (quantising an already merged model leaves the If-branch weights in fp32)."""
import json, shutil, sys
from pathlib import Path

from huggingface_hub import hf_hub_download
from onnxruntime.quantization import QuantType, quantize_dynamic
from optimum.exporters.onnx import main_export
from optimum.onnx import merge_decoders
from transformers import AutoFeatureExtractor, AutoTokenizer

model_id, out = sys.argv[1], Path(sys.argv[2])
raw, q = out / "_raw", out / "_q"
main_export(model_id, output=raw, task="automatic-speech-recognition-with-past", opset=17, no_post_process=True)
(out / "onnx").mkdir(parents=True, exist_ok=True)
q.mkdir(exist_ok=True)
quantize_dynamic(raw / "encoder_model.onnx", out / "onnx" / "encoder_model_quantized.onnx", weight_type=QuantType.QUInt8)
for name in ["decoder_model", "decoder_with_past_model"]:
    quantize_dynamic(raw / f"{name}.onnx", q / f"{name}.onnx", weight_type=QuantType.QUInt8)
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
