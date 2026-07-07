#!/usr/bin/env node
/**
 * Scaffold a new site from the 24shoots template.
 * Usage: npm run new-site -- my-client-name
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const name = process.argv[2];

if (!name) {
  console.error("Usage: npm run new-site -- <site-name>");
  process.exit(1);
}

const target = join(root, "..", name);

if (existsSync(target)) {
  console.error(`Directory already exists: ${target}`);
  process.exit(1);
}

const exclude = new Set(["node_modules", ".next", ".git"]);

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (exclude.has(entry)) continue;
    const s = join(src, entry);
    const d = join(dest, entry);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else cpSync(s, d);
  }
}

copyDir(root, target);

const siteConfigPath = join(target, "config", "site.json");
const site = JSON.parse(readFileSync(siteConfigPath, "utf-8"));
site.name = name;
site.url = `https://${name}.vercel.app`;
writeFileSync(siteConfigPath, JSON.stringify(site, null, 2));

console.log(`\n✓ Site scaffolded at ${target}`);
console.log(`  1. cd ${target}`);
console.log(`  2. npm install`);
console.log(`  3. Edit config/site.json and content/`);
console.log(`  4. npm run dev\n`);
