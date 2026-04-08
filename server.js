import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import http from "node:http";

const port = Number.parseInt(process.env.PORT || "4173", 10);
const distDir = resolve(process.cwd(), "dist");

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

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
  ".map": "application/json; charset=utf-8",
};

const sendFile = (res, filePath, extraHeaders = {}) => {
  const ext = extname(filePath).toLowerCase();
  const type = contentTypes[ext] || "application/octet-stream";
  res.writeHead(200, {
    "Content-Type": type,
    ...SECURITY_HEADERS,
    ...extraHeaders,
  });
  createReadStream(filePath).pipe(res);
};

const server = http.createServer((req, res) => {
  const requestPath = req.url?.split("?")[0] || "/";

  // Decode percent-encoded characters before normalising, then re-normalise.
  let decoded;
  try {
    decoded = decodeURIComponent(requestPath);
  } catch {
    // Malformed URI – treat as root
    decoded = "/";
  }

  const safePath = normalize(decoded).replace(/^([.][.][/\\])+/, "");
  const candidatePath = join(distDir, safePath);

  // Strict path-traversal guard: resolved path must be inside distDir.
  const resolvedCandidate = resolve(candidatePath);
  if (
    resolvedCandidate !== distDir &&
    !resolvedCandidate.startsWith(distDir + "/") &&
    !resolvedCandidate.startsWith(distDir + "\\")
  ) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8", ...SECURITY_HEADERS });
    res.end("Forbidden");
    return;
  }

  if (existsSync(resolvedCandidate) && statSync(resolvedCandidate).isFile()) {
    // Add long cache for hashed assets; no-cache for HTML.
    const isHtml = extname(resolvedCandidate).toLowerCase() === ".html";
    sendFile(res, resolvedCandidate, {
      "Cache-Control": isHtml
        ? "no-cache, no-store, must-revalidate"
        : "public, max-age=31536000, immutable",
    });
    return;
  }

  const indexPath = join(distDir, "index.html");
  if (existsSync(indexPath)) {
    sendFile(res, indexPath, {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    });
    return;
  }

  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8", ...SECURITY_HEADERS });
  res.end("Build output not found. Run npm run build first.");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on 0.0.0.0:${port}`);
});
