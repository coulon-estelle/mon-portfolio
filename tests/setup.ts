import { createServer } from 'node:http';
import { render } from '../scripts/static-runtime.mjs';
export default async function setup() {
  const server = createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method || '')) {
      response.writeHead(405);
      response.end();
      return;
    }
    try {
      const result = await render(
        new Request(new URL(request.url || '/', 'http://127.0.0.1:4322'), {
          method: request.method,
        }),
      );
      response.writeHead(result.status, Object.fromEntries(result.headers));
      response.end(request.method === 'HEAD' ? undefined : Buffer.from(await result.arrayBuffer()));
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end();
    }
  });
  await new Promise<void>((resolve, reject) => {
    server.once('error', reject);
    server.listen(4322, '127.0.0.1', resolve);
  });
  return async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  };
}
