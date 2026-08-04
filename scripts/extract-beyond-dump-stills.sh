#!/usr/bin/env bash
# Extract 12 evenly spaced 1280px-wide frames from a local Beyond the Dump video file.
# Usage: ./scripts/extract-beyond-dump-stills.sh /path/to/beyond-the-dump.mp4
set -euo pipefail

VIDEO="${1:?Pass path to Beyond the Dump .mp4 (export from YouTube or your edit)}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_A="$ROOT/public/projects/beyond-the-dump/stills/set-a"
OUT_B="$ROOT/public/projects/beyond-the-dump/stills/set-b"
mkdir -p "$OUT_A" "$OUT_B"

DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO")"

extract() {
  local index="$1"
  local set="$2"
  local t="$3"
  local dir="$OUT_A"
  [[ "$set" == b ]] && dir="$OUT_B"
  ffmpeg -y -loglevel error -ss "$t" -i "$VIDEO" -frames:v 1 \
    -vf "scale=1280:-2:flags=lanczos" -q:v 2 \
    "$dir/$(printf '%02d' "$index").jpg"
}

for i in 1 2 3 4 5 6; do
  t="$(awk "BEGIN { printf \"%.3f\", ($i - 0.5) / 12 * $DUR }")"
  extract "$i" a "$t"
done
for i in 1 2 3 4 5 6; do
  t="$(awk "BEGIN { printf \"%.3f\", (6 + $i - 0.5) / 12 * $DUR }")"
  extract "$i" b "$t"
done

echo "Wrote 12 frames to $OUT_A and $OUT_B"
