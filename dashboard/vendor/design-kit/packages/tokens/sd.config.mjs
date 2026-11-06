// Style Dictionary v5: DTCG source → CSS variables (prefix --kit-), a TS map and JSON.
// Validate against the DTCG schema in CI; contrast-check every text/status pair over the worst backdrop.
export default {
  source: ['src/**/*.tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'kit',
      buildPath: 'dist/css/',
      files: [{ destination: 'kit.css', format: 'css/variables', options: { outputReferences: true }, filter: (t) => !['string','fontFamily'].includes(t.$type ?? t.type) && !Array.isArray(t.$value ?? t.value) }]
    },
    ts: {
      transformGroup: 'js',
      prefix: 'kit',
      buildPath: 'dist/ts/',
      files: [{ destination: 'tokens.ts', format: 'javascript/es6' }]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [{ destination: 'tokens.json', format: 'json/nested' }]
    }
  }
};
