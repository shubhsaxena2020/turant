# Turant eval harness: one command for the whole pipeline.
#   .\run.ps1                    -> score the current extract.ts into reports\latest.md (+ deltas vs baseline)
#   .\run.ps1 -Name round1       -> reports\round1.md / .json
#   .\run.ps1 -Name x -Fresh     -> also (re)builds the corpus and fills any missing audio / transcripts first
# Everything is cached: after the first full run, only node run_eval.mjs does real work.
param(
  [string]$Name = 'latest',
  [switch]$Fresh
)
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot
$env:PYTHONIOENCODING = 'utf-8'

if ($Fresh) {
  node corpus\build.mjs;  if ($LASTEXITCODE) { exit $LASTEXITCODE }
  python common.py;       if ($LASTEXITCODE) { exit $LASTEXITCODE }
  python tts.py;          if ($LASTEXITCODE) { exit $LASTEXITCODE }
  python noise.py;        if ($LASTEXITCODE) { exit $LASTEXITCODE }
  python asr.py;          if ($LASTEXITCODE) { exit $LASTEXITCODE }
}
node run_eval.mjs --name $Name
exit $LASTEXITCODE
