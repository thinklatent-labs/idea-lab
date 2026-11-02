// Copies the register (the source of truth, in ../register) into public/data so Vite serves it.
// Never edit public/data by hand; edit ../register and run this.
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(here, '..', '..', 'register');
const dst = path.join(here, '..', 'public', 'data');
rmSync(dst, { recursive: true, force: true });
mkdirSync(dst, { recursive: true });
cpSync(path.join(src, 'register.json'), path.join(dst, 'register.json'));
cpSync(path.join(src, 'history'), path.join(dst, 'history'), { recursive: true });
console.log('public/data refreshed from register/');
