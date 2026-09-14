#!/usr/bin/env bash
# Print Ellie's résumé to the PDF the Resume page offers for download.
#
#   pnpm dev            # the dev server must be up on :3100
#   scripts/print-resume.sh
#
# Headless Chrome prints /resume-print/ — the same ResumeDoc the page shows,
# at print size — to public/ellie-thompson-resume.pdf. Re-run whenever
# src/data/resume.ts or ResumeDoc.tsx changes, and commit the PDF with them.
set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
URL="${1:-http://localhost:3100/resume-print/}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/ellie-thompson-resume.pdf"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=10000 --run-all-compositor-stages-before-draw \
  --print-to-pdf="$OUT" "$URL" 2>/dev/null

pdfinfo "$OUT" | grep -E "Pages|Page size"
echo "wrote $OUT"
