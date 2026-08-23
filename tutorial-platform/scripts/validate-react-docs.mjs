import { promises as fs } from "node:fs";
import path from "node:path";

const reactRoot = path.resolve(process.cwd(), "public/tutorials/react");
const requiredFrontmatterKeys = [
  "title",
  "slug",
  "dayLabel",
  "level",
  "estimatedMinutes",
  "order",
  "track",
];

const mojibakePatterns = [
  /â€|â€“|â€”|â€œ|â€|â€˜|â€™|â€¢|â†’|â†“|â†\u2013|â†\u2014|Ã|Â|ðŸ/g,
  /(?:\uFFFD|�)/g,
];

function toPosixPath(input) {
  return input.replaceAll("\\", "/");
}

async function listMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listMarkdownFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---")) {
    return { frontmatter: null, body: markdown };
  }

  const endIndex = markdown.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { frontmatter: null, body: markdown };
  }

  const rawFrontmatter = markdown.slice(3, endIndex).trim();
  const body = markdown.slice(endIndex + 4).replace(/^\r?\n/, "");
  const frontmatter = {};

  for (const line of rawFrontmatter.split(/\r?\n/)) {
    if (!line.includes(":")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}

function ensureBalancedCodeFences(text) {
  const lines = text.split(/\r?\n/);
  let fenceCount = 0;
  const badFenceLines = [];

  for (const [index, line] of lines.entries()) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("```")) {
      continue;
    }

    if (trimmed.length > 3 && !trimmed.startsWith("```")) {
      badFenceLines.push(index + 1);
    }

    fenceCount += 1;
  }

  return { balanced: fenceCount % 2 === 0, badFenceLines };
}

function hasPlaceholder(text) {
  return /\b(TBD|Coming soon|lorem ipsum|TODO:\s*fill|replace this)\b/i.test(text);
}

async function validateFile(filePath) {
  const issues = [];
  const markdown = await fs.readFile(filePath, "utf8");
  const relativePath = toPosixPath(path.relative(process.cwd(), filePath));

  for (const pattern of mojibakePatterns) {
    if (pattern.test(markdown)) {
      issues.push("Contains mojibake / broken character encoding");
      break;
    }
  }

  const { frontmatter, body } = parseFrontmatter(markdown);

  if (!frontmatter) {
    issues.push("Missing frontmatter block");
  } else {
    for (const key of requiredFrontmatterKeys) {
      if (!frontmatter[key]) {
        issues.push(`Missing required frontmatter key: ${key}`);
      }
    }
  }

  if (!/^#\s+.+/m.test(body || markdown)) {
    issues.push("Missing H1 heading");
  }

  const sections = [
    /^##\s+Goal\s*$/im,
    /^##\s+Prerequisites\s*$/im,
    /^##\s+Outcome\s*$/im,
  ];

  for (const section of sections) {
    if (!section.test(body || markdown)) {
      issues.push(`Missing expected section: ${section.toString()}`);
    }
  }

  const { balanced, badFenceLines } = ensureBalancedCodeFences(markdown);
  if (!balanced) {
    issues.push("Code fences are unbalanced");
  }
  if (badFenceLines.length > 0) {
    issues.push(`Malformed fence markers near lines: ${badFenceLines.join(", ")}`);
  }

  if (hasPlaceholder(markdown)) {
    issues.push("Contains placeholder content");
  }

  return { relativePath, issues };
}

async function run() {
  const stats = await fs.stat(reactRoot).catch(() => null);
  if (!stats || !stats.isDirectory()) {
    console.error(`React tutorial folder not found: ${reactRoot}`);
    process.exit(1);
  }

  const files = await listMarkdownFiles(reactRoot);
  const results = [];

  for (const file of files) {
    const result = await validateFile(file);
    if (result.issues.length > 0) {
      results.push(result);
    }
  }

  if (results.length === 0) {
    console.log(`React docs validation passed for ${files.length} markdown files.`);
    return;
  }

  console.error(`React docs validation failed for ${results.length} file(s):`);
  for (const result of results) {
    console.error(`\n- ${result.relativePath}`);
    for (const issue of result.issues) {
      console.error(`  * ${issue}`);
    }
  }

  process.exit(1);
}

run().catch((error) => {
  console.error("React documentation validation crashed:");
  console.error(error);
  process.exit(1);
});
