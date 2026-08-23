import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(process.cwd(), "public/tutorials/react");

const replacements = [
  ["â†’", "→"],
  ["â†‘", "↑"],
  ["â†“", "↓"],
  ["â†˜", "↓"],
  ["â†™", "↑"],
  ["â†”", "↔"],
  ["â†", "←"],
  ["â†", "→"],
  ["â†š", "→"],
  ["â†›", "←"],
  ["â†œ", "←"],
  ["â–¼", "▼"],
  ["â–²", "▲"],
  ["â–ˆ", "◼"],
  ["â€", ""],
  ["â€”", "—"],
  ["â€“", "–"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€¢", "•"],
  ["â”œ", "├"],
  ["â”€", "─"],
  ["â”‚", "│"],
  ["â””", "┤"],
  ["â”", "┐"],
  ["â”", "┌"],
  ["â”", "└"],
  ["â”", "┘"],
  ["â”¼", "┴"],
  ["â”´", "┬"],
  ["â”¬", "├"],
  ["â”˜", "┘"],
  ["â”š", "├"],
  ["â”›", "┤"],
  ["â”Œ", "┌"],
  ["â”Ž", "└"],
  ["â”", "┼"],
  ["â”œ", "├"],
  ["â”€", "─"],
  ["â”‚", "│"],
  ["â”", "┐"],
  ["â”", "┌"],
  ["â”", "└"],
  ["â”", "┘"],
  ["âœ…", "✓"],
  ["âœ“", "✓"],
  ["âœ—", "✗"],
  ["âŒ", "✗"],
  ["â”", "✗"],
  ["âŒ", "✗"],
  ["â‚¹", "₹"],
  ["Ã—", "×"],
  ["Ã¢â‚¬", "“"],
  ["Ã¢â€", "‘"],
  ["Â", ""],
  ["Ã", ""],
  ["ðŸ", ""],
  ["�", ""],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€", "”"],
  ["â€œ", "“"],
  ["â€", ""],
  ["â‰", "✓"],
  ["â£", "✗"],
  ["â¤", "✗"],
  ["âœ" , ""],
  ["â”", ""],
  ["â†", ""],
  ["â–", ""],
  ["â", ""],
  ["â€", ""],
  ["â€", ""],
  ["â€œ", ""],
  ["Ã¢", ""],
  ["Ã©", "é"],
  ["Ã¼", "ü"],
  ["Ã¡", "á"],
  ["Ã±", "ñ"],
  ["Ã³", "ó"],
  ["Ã¶", "ö"],
  ["Ã‰", "É"],
  ["Ã–", "Ö"],
  ["Ãœ", "Ü"],
  ["Ã€", "À"],
  ["Ã", "Á"],
  ["Ã", "Í"],
  ["Ã“", "Ó"],
  ["Ãš", "Ú"],
  ["Ã“", "Ó"],
  ["Ã·", "÷"],
  ["Ã¤", "ä"],
  ["Ã§", "ç"],
  ["Ã¥", "å"],
  ["Ã£", "ã"],
];

async function walkMarkdownFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkMarkdownFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function normalizeText(text) {
  let updated = text;

  for (const [bad, good] of replacements) {
    updated = updated.split(bad).join(good);
  }

  updated = updated.replace(/\u00A0/g, " ");
  updated = updated.replace(/\uFFFD/g, "");
  updated = updated.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");

  return updated;
}

async function run() {
  const files = await walkMarkdownFiles(rootDir);
  let changed = 0;

  for (const filePath of files) {
    const original = await fs.readFile(filePath, "utf8");
    const next = normalizeText(original);

    if (next !== original) {
      await fs.writeFile(filePath, next, "utf8");
      changed += 1;
    }
  }

  console.log(`Normalized mojibake in ${changed} React markdown file(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
