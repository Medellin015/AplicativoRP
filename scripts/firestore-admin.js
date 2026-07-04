'use strict';
/* ============================================================================
   Herramienta de ADMINISTRACIÓN de Firestore (uso en servidor/terminal).
   ----------------------------------------------------------------------------
   Usa la CUENTA DE SERVICIO (clave JSON de admin). Esta clave es SECRETA:
   NO la subas a git ni la pongas en el navegador. Guárdala fuera del repo.

   Requisitos previos (una sola vez, en la consola de Firebase/GCP):
     1. Firestore Database creada (modo Nativo) en el proyecto cdp-rp-pagos.
     2. La cuenta de servicio con permisos de Firestore. Si ves errores
        PERMISSION_DENIED, en Google Cloud -> IAM concede a
        firebase-adminsdk-fbsvc@cdp-rp-pagos.iam.gserviceaccount.com el rol
        "Cloud Datastore User" (o "Editor").

   Uso:
     export GOOGLE_APPLICATION_CREDENTIALS=/ruta/segura/serviceAccount.json
     npm install firebase-admin
     node scripts/firestore-admin.js check          # prueba de conexión + conteos
     node scripts/firestore-admin.js seed-demo       # crea 1 doc de ejemplo por colección
     node scripts/firestore-admin.js import <archivo-export.json>

   El formato de <archivo-export.json> es:
     { "cdp": [...], "crp": [...], "pagos": [...], "proveedores": [...] }
   (por ejemplo, un respaldo de las claves localStorage cdpcrp2026_*).
   ============================================================================ */
const admin = require('firebase-admin');

const COLS = ['cdp', 'crp', 'pagos', 'proveedores'];

function init() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('Falta GOOGLE_APPLICATION_CREDENTIALS apuntando al JSON de la cuenta de servicio.');
    process.exit(1);
  }
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
  return admin.firestore();
}

async function check(db) {
  console.log('Conectando a Firestore...');
  for (const c of COLS) {
    let count;
    try {
      const agg = await db.collection(c).count().get();
      count = agg.data().count;
    } catch (e) {
      // Fallback si la agregación count() no está disponible
      const snap = await db.collection(c).limit(100000).get();
      count = snap.size;
    }
    console.log(`  ${c.padEnd(12)} -> ${count} documentos`);
  }
  console.log('OK: la base de datos responde.');
}

async function seedDemo(db) {
  const now = Date.now();
  await db.collection('cdp').add({ nCdp: 'CDP001', valor: 1000000, fechaCdp: '2026-01-15', nombreRubro: 'Ejemplo', _creado: now });
  await db.collection('pagos').add({ factura: 'DEMO-1', proveedor: 'Proveedor demo', valorAntesIva: 1000000, iva: 190000, total: 1190000, pago: 'OK', _creado: now });
  console.log('Documentos de ejemplo creados en cdp y pagos.');
}

async function importJson(db, file) {
  const data = JSON.parse(require('fs').readFileSync(file, 'utf8'));
  for (const c of COLS) {
    const arr = Array.isArray(data[c]) ? data[c] : [];
    let n = 0;
    for (let i = 0; i < arr.length; i += 400) {
      const batch = db.batch();
      arr.slice(i, i + 400).forEach((r) => {
        const { _id, ...rest } = r;
        batch.set(db.collection(c).doc(), { ...rest, _creado: rest._creado || Date.now() });
      });
      await batch.commit();
      n += Math.min(400, arr.length - i);
    }
    console.log(`  ${c}: ${n} documentos importados`);
  }
  console.log('Importación completada.');
}

(async () => {
  const cmd = process.argv[2] || 'check';
  const db = init();
  try {
    if (cmd === 'check') await check(db);
    else if (cmd === 'seed-demo') await seedDemo(db);
    else if (cmd === 'import') await importJson(db, process.argv[3]);
    else { console.error('Comando desconocido:', cmd); process.exit(1); }
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
