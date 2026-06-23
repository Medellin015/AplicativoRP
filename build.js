'use strict';
/* ============================================================================
   Compila js/app.jsx  ->  js/app.js  (JSX a JavaScript clásico, sin Babel en el
   navegador). Ejecuta:   npm run build
   ============================================================================ */
const fs = require('fs');
const path = require('path');
const Babel = require('@babel/standalone');

const src = path.join(__dirname, 'js', 'app.jsx');
const out = path.join(__dirname, 'js', 'app.js');

const code = fs.readFileSync(src, 'utf8');
const result = Babel.transform(code, {
  presets: [['react', { runtime: 'classic' }]],
});

const banner =
  '/* ARCHIVO GENERADO AUTOMÁTICAMENTE desde js/app.jsx — no editar a mano.\n' +
  '   Regenerar con: npm run build */\n';

fs.writeFileSync(out, banner + result.code);
console.log('OK -> js/app.js (' + result.code.length + ' bytes)');
