import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const distRoot = path.join(projectRoot, "dist");
const orderApiUrl = "https://orderapi.englishcommando.bd/api/orders/";
const port = Number(process.env.PORT) || 3000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const sendJson = (response, status, payload) => {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  response.end(body);
};

const readRequestBody = (request) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1024 * 1024) {
        reject(new Error("Request body is too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });

const handleOrder = async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST, OPTIONS");
    sendJson(response, 405, { detail: "Method not allowed" });
    return;
  }

  try {
    const body = await readRequestBody(request);
    const upstreamResponse = await fetch(orderApiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
    const responseBody = await upstreamResponse.arrayBuffer();

    response.writeHead(upstreamResponse.status, {
      "Content-Type":
        upstreamResponse.headers.get("content-type") ||
        "application/json; charset=utf-8",
    });
    response.end(Buffer.from(responseBody));
  } catch (error) {
    console.error("Order API proxy error:", error);
    sendJson(response, 502, { detail: "Order service unavailable" });
  }
};

const resolveStaticFile = async (requestPath) => {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0]);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const candidate = path.resolve(distRoot, relativePath || "index.html");

  if (candidate !== distRoot && !candidate.startsWith(`${distRoot}${path.sep}`)) {
    return null;
  }

  try {
    const fileStats = await stat(candidate);
    if (fileStats.isFile()) return candidate;
    if (fileStats.isDirectory()) {
      const nestedIndex = path.join(candidate, "index.html");
      await access(nestedIndex);
      return nestedIndex;
    }
  } catch {
    return null;
  }

  return null;
};

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", "http://localhost");

  if (requestUrl.pathname === "/api/orders" || requestUrl.pathname === "/api/orders/") {
    await handleOrder(request, response);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendJson(response, 405, { detail: "Method not allowed" });
    return;
  }

  let filePath = await resolveStaticFile(requestUrl.pathname);
  if (!filePath) filePath = path.join(distRoot, "index.html");

  try {
    const fileStats = await stat(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Content-Length": fileStats.size,
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath).pipe(response);
  } catch {
    sendJson(response, 404, { detail: "Not found" });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`VOCAB3kLP server listening on port ${port}`);
});
