import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import http from "node:http";

const port = Number.parseInt(process.env.PORT || "4173", 10);
const distDir = join(process.cwd(), "dist");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".map": "application/json; charset=utf-8"
};

const sendFile = (res, filePath) => {
  const ext = extname(filePath).toLowerCase();
  const type = contentTypes[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  createReadStream(filePath).pipe(res);
};

const server = http.createServer((req, res) => {
  const requestPath = req.url?.split("?")[0] || "/";
  const safePath = normalize(requestPath).replace(/^([.][.][/\\])+/, "");
  const candidatePath = join(distDir, safePath);

  if (existsSync(candidatePath) && statSync(candidatePath).isFile()) {
    sendFile(res, candidatePath);
    return;
  }

  const indexPath = join(distDir, "index.html");
  if (existsSync(indexPath)) {
    sendFile(res, indexPath);
    return;
  }

  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Build output not found. Run npm run build first.");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});
