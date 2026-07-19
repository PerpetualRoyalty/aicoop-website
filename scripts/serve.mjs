import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const port = Number(process.env.PORT ?? 4173);

const types = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

async function resolveRequest(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const relative = cleanPath === '/' ? 'index.html' : cleanPath.replace(/^\//, '');
  const candidates = [relative, path.join(relative, 'index.html')];

  for (const candidate of candidates) {
    const absolute = path.resolve(distDir, candidate);
    if (!absolute.startsWith(`${distDir}${path.sep}`) && absolute !== path.join(distDir, 'index.html')) continue;
    try {
      if ((await stat(absolute)).isFile()) return { absolute, status: 200 };
    } catch {}
  }

  return { absolute: path.join(distDir, '404.html'), status: 404 };
}

const server = http.createServer(async (request, response) => {
  const { absolute, status } = await resolveRequest(request.url ?? '/');
  response.writeHead(status, {
    'Content-Type': types.get(path.extname(absolute)) ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  });
  createReadStream(absolute).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Local URL: http://127.0.0.1:${port}`);
});
