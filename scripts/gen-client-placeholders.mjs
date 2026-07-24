import fs from "node:fs";
import path from "node:path";

const defs = [
  ["p-01", "GVA", "#1565C0", "#fff"],
  ["p-02", "AVV", "#B71C1C", "#fff"],
  ["p-03", "MAN", "#2E7D32", "#fff"],
  ["p-04", "NEXO", "#4527A0", "#fff"],
  ["p-05", "RTM", "#E65100", "#fff"],
  ["p-06", "GAST", "#00695C", "#fff"],
  ["p-07", "HOM", "#5D4037", "#fff"],
  ["p-08", "EVT", "#283593", "#fff"],
  ["p-09", "CORP", "#37474F", "#fff"],
  ["p-10", "LUX", "#212121", "#F5A623"],
  ["p-11", "GRP", "#0277BD", "#fff"],
  ["p-12", "CUL", "#6A1B9A", "#fff"],
  ["p-13", "SPT", "#00838F", "#fff"],
  ["p-14", "HRC", "#AD1457", "#fff"],
];

const dir = path.join("public", "clients", "placeholders");
for (const [file, text, bg, fg] of defs) {
  const size = text.length > 4 ? 9 : 11;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img"><rect width="64" height="64" rx="32" fill="${bg}"/><text x="32" y="38" text-anchor="middle" font-family="Arial,sans-serif" font-size="${size}" font-weight="700" fill="${fg}">${text}</text></svg>`;
  fs.writeFileSync(path.join(dir, `${file}.svg`), svg);
}

console.log("Wrote", defs.length, "placeholders");
