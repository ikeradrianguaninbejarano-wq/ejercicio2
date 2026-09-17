const fs = require("fs");
const assert = require("assert");

const html = fs.readFileSync("index.html", "utf8");
const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
const externalLinks = links.filter((href) => /^https?:\/\//i.test(href));

for (const href of externalLinks) {
  assert.match(href, /^https:\/\//i, `El enlace externo debe usar HTTPS: ${href}`);
}

console.log(`Enlaces externos verificados: ${externalLinks.length}`);