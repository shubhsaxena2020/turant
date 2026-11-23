#!/usr/bin/env bash
# One command: ./make.sh scenarios/<name>.json   (app must already be served at the scenario's url)
set -e
sc="$1"; name=$(basename "$sc" .json); out="out/$name"
mkdir -p "$out"
python narrate.py "$sc" "$out"
node record.mjs "$sc" "$out"
python compose.py "$sc" "$out"
echo "done: $out/demo_vertical.mp4 and $out/demo_landscape.mp4"
