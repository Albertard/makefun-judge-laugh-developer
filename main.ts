// make.fun — "Make the AI Judge Laugh: Developer Excuses"
// (u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3)
//
// Writes one funny single-line excuse a developer gives when code breaks
// in production to /output/entry.txt. The text is fixed: the classic
// "it works on my machine" excuse, turned on its head — the machine
// was never the problem; the users were. Trimmed to one breath: every
// word earns its place, nothing left to cut.
//
// Node 22+, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "It works on my machine — which has never met a real user.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-200 Unicode code points, and not only white space.
// Check the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 200) {
    throw new Error(`entry is ${size} characters, outside the 1-200 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
}

checkFitsGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
