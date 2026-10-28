import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const outputRoot = 'dist/balance-ton-flic/browser';
const routes = ['carte', 'a-propos', 'documentation', 'transmettre'];

for (const route of routes) {
  const destination = join(outputRoot, route);
  await mkdir(destination, { recursive: true });
  await copyFile(join(outputRoot, 'index.html'), join(destination, 'index.html'));
}

console.log(`${routes.length} route entry generated.`);
