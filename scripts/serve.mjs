import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT ?? 8081);
const ROOT = join(process.cwd(), "dist");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function safePathname(pathname = "/") {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const trimmed = decoded === "/" ? "/index.html" : decoded;
  const normalized = normalize(trimmed)
    .replace(/^[/\\]+/, "")
    .replace(/^(\.\.[/\\])+/, "");
  return join(ROOT, normalized);
}

createServer((request, response) => {
  const filePath = safePathname(request.url ?? "/");

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const extension = extname(filePath);
  const contentType = MIME_TYPES[extension] ?? "application/octet-stream";

  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(response);
}).listen(PORT, () => {
  console.log(`NICU Dose Helper running at http://localhost:${PORT}`);
});
