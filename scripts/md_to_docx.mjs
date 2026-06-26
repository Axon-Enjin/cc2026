#!/usr/bin/env node
/**
 * Convert Markdown to .docx with mermaid diagrams pre-rendered to PNG.
 *
 * Prerequisites:
 *   - pandoc (https://pandoc.org/installing.html)
 *   - @mermaid-js/mermaid-cli via npx (installed on first run)
 *
 * Usage:
 *   node scripts/md_to_docx.mjs docs/PoC.md
 *   node scripts/md_to_docx.mjs docs/PoC.md --output docs/PoC.docx
 *   node scripts/md_to_docx.mjs docs/PROJECT_BRIEF.md
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const MERMAID_BLOCK = /```mermaid\r?\n([\s\S]*?)```/g;

function usage() {
  console.error(`Usage: node scripts/md_to_docx.mjs <input.md> [--output out.docx]`);
  process.exit(1);
}

function parseArgs(argv) {
  const positional = argv.filter((arg) => !arg.startsWith("--"));
  const input = positional[0];
  if (!input) usage();

  let output;
  const outIdx = argv.indexOf("--output");
  if (outIdx !== -1 && argv[outIdx + 1]) {
    output = argv[outIdx + 1];
  } else {
    const base = path.basename(input, path.extname(input));
    output = path.join(path.dirname(input), `${base}.docx`);
  }

  return {
    input: path.resolve(ROOT, input),
    output: path.resolve(ROOT, output),
  };
}

function ensurePrereqs() {
  const pandoc = spawnSync("pandoc", ["--version"], { encoding: "utf8" });
  if (pandoc.status !== 0) {
    console.error(
      "ERROR: pandoc not found. Install from https://pandoc.org/installing.html"
    );
    process.exit(1);
  }
}

function renderMermaidBlocks(markdown, assetsDir) {
  fs.mkdirSync(assetsDir, { recursive: true });
  let index = 0;
  const replaced = markdown.replace(MERMAID_BLOCK, (_match, diagram) => {
    index += 1;
    const mmdPath = path.join(assetsDir, `diagram-${index}.mmd`);
    const pngPath = path.join(assetsDir, `diagram-${index}.png`);
    fs.writeFileSync(mmdPath, diagram.trim() + "\n", "utf8");

    const mmdc = spawnSync(
      "npx",
      [
        "--yes",
        "@mermaid-js/mermaid-cli@11.4.0",
        "-i",
        mmdPath,
        "-o",
        pngPath,
        "-b",
        "white",
        "-w",
        "1200",
      ],
      { cwd: ROOT, encoding: "utf8", shell: true }
    );

    if (mmdc.status !== 0) {
      console.error(mmdc.stderr || mmdc.stdout);
      throw new Error(`mermaid-cli failed for ${mmdPath}`);
    }

    const rel = path.relative(path.dirname(assetsDir), pngPath).replace(/\\/g, "/");
    return `\n![Diagram ${index}](${rel})\n`;
  });

  return { markdown: replaced, diagramCount: index };
}

function runPandoc(inputMd, outputDocx, resourcePath) {
  const result = spawnSync(
    "pandoc",
    [
      inputMd,
      "-o",
      outputDocx,
      "--from",
      "markdown",
      "--to",
      "docx",
      "--resource-path",
      resourcePath,
    ],
    { cwd: ROOT, encoding: "utf8" }
  );

  if (result.status !== 0) {
    console.error(result.stderr || result.stdout);
    throw new Error("pandoc conversion failed");
  }
}

function main() {
  const { input, output } = parseArgs(process.argv.slice(2));

  if (!fs.existsSync(input)) {
    console.error(`ERROR: input not found: ${input}`);
    process.exit(1);
  }

  ensurePrereqs();

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "ciel-md-docx-"));
  const assetsDir = path.join(tmpDir, "assets");
  const processedMd = path.join(tmpDir, "processed.md");

  const source = fs.readFileSync(input, "utf8");
  const { markdown, diagramCount } = renderMermaidBlocks(source, assetsDir);
  fs.writeFileSync(processedMd, markdown, "utf8");

  fs.mkdirSync(path.dirname(output), { recursive: true });
  runPandoc(processedMd, output, tmpDir);

  console.log(`Converted: ${path.relative(ROOT, input)}`);
  console.log(`  Diagrams rendered: ${diagramCount}`);
  console.log(`  Output: ${path.relative(ROOT, output)}`);
}

main();
