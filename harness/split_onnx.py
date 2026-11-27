"""Split a large ONNX file's weights into external-data chunks under a size limit, the layout transformers.js
(3.8+) loads: <file>.onnx + <file>.onnx_data, <file>.onnx_data_1, ... Weights are unchanged (no re-quantisation),
so accuracy is identical; it only lets a host with a per-file limit (Vercel: 100 MB) serve the model.

  python split_onnx.py <model_dir> <onnx/file.onnx> [limit_mb=90]

Also records the chunk count in <model_dir>/config.json under "transformers.js_config".use_external_data_format,
so the app needs no code change.
"""
import json
import os
import sys

import onnx
from onnx.external_data_helper import _get_all_tensors, set_external_data

model_dir, rel = sys.argv[1], sys.argv[2]
limit = int(float(sys.argv[3] if len(sys.argv) > 3 else 90) * 1e6)
path = os.path.join(model_dir, rel)
base = os.path.basename(path)
m = onnx.load(path)
chunks = [bytearray()]
for t in _get_all_tensors(m):
    if not t.HasField("raw_data") or len(t.raw_data) < 1024:
        continue
    raw = t.raw_data
    if len(chunks[-1]) and len(chunks[-1]) + len(raw) > limit:
        chunks.append(bytearray())
    i = len(chunks) - 1
    loc = f"{base}_data" if i == 0 else f"{base}_data_{i}"
    off = len(chunks[i])
    chunks[i] += raw
    set_external_data(t, location=loc, offset=off, length=len(raw))
    t.ClearField("raw_data")
    t.data_location = onnx.TensorProto.EXTERNAL
d = os.path.dirname(path)
for i, c in enumerate(chunks):
    with open(os.path.join(d, f"{base}_data" if i == 0 else f"{base}_data_{i}"), "wb") as fh:
        fh.write(c)
with open(path, "wb") as fh:
    fh.write(m.SerializeToString())
cfg_path = os.path.join(model_dir, "config.json")
cfg = json.load(open(cfg_path, encoding="utf-8"))
tj = cfg.setdefault("transformers.js_config", {})
fmt = tj.setdefault("use_external_data_format", {})
fmt[base] = len(chunks)
json.dump(cfg, open(cfg_path, "w", encoding="utf-8"), indent=2)
for f in sorted(os.listdir(d)):
    if f.startswith(base):
        print(f"{os.path.getsize(os.path.join(d, f)) / 1e6:8.1f} MB  {f}")
