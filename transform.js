const f = require('fs'), b = require('@babel/core');
let h = f.readFileSync('github-pages/index.html', 'utf-8');

const m = h.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/);
if (!m) { console.log('No babel script found!'); process.exit(1); }

const js = b.transformSync(m[1], {
  presets: [
    ['@babel/preset-env', { modules: false, targets: { browsers: ['>0.5%'] } }],
    ['@babel/preset-react', { runtime: 'classic' }]
  ],
  compact: true
}).code;

h = h.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>/, '');
h = h.replace(/<script type="text\/babel"[^>]*>[\s\S]*?<\/script>/, '<script>' + js + '</script>');

f.writeFileSync('github-pages/index.html', h);
f.writeFileSync('deploy/index.html', h);
console.log('OK', f.statSync('github-pages/index.html').size);
