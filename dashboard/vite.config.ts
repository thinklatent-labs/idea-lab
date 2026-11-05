import path from 'node:path';
import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// VI Kit is vendored under vendor/vi-kit (scripts/kit-pull.mjs); the aliases match the kit's own package names.
const kit = (p: string) => path.resolve(__dirname, 'vendor/vi-kit/packages', p);

// Some libraries ship a raw U+FFFD inside string literals; write it as an escape so the bundle is clean UTF-8 text
// (the same guard as the kit's playground build).
const escapeReplacementChar: Plugin = {
  name: 'vi-escape-replacement-char',
  generateBundle(_, bundle) {
    for (const c of Object.values(bundle)) if (c.type === 'chunk') c.code = c.code.replaceAll('�', '\\uFFFD');
  },
};

export default defineConfig({
  // Relative asset paths: the page is served under a path (a claude.ai artifact, a Pages site).
  base: './',
  plugins: [react(), tailwindcss(), escapeReplacementChar, viteSingleFile()],
  resolve: {
    alias: [
      { find: /^@vi\/ui\/(.*)$/, replacement: `${kit('ui/src')}/$1` },
      { find: /^@vi\/kit$/, replacement: kit('vi-kit/src/index.ts') },
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 4000,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
