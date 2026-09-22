import { promises as fs } from "node:fs";
import path from "node:path";

const tutorialsRoot = path.resolve(process.cwd(), "public/tutorials");

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

function stripIndexSection(markdown) {
  const lines = markdown.split(/\r?\n/);
  const result = [];
  let removing = false;
  let removedAny = false;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (!removing && /^##\s+Index\s*$/.test(line)) {
      removing = true;
      removedAny = true;
      continue;
    }

    if (removing) {
      if (/^##\s+/.test(line)) {
        removing = false;
        result.push(line);
      }
      continue;
    }

    result.push(line);
  }

  return { markdown: result.join("\n"), removedAny };
}

async function run() {
  const files = await walkMarkdownFiles(tutorialsRoot);
  let changed = 0;

  for (const filePath of files) {
    const original = await fs.readFile(filePath, "utf8");
    const { markdown, removedAny } = stripIndexSection(original);

    if (removedAny && markdown !== original) {
      await fs.writeFile(filePath, markdown, "utf8");
      changed += 1;
    }
  }

  console.log(`Removed Index sections from ${changed} public tutorial file(s).`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
