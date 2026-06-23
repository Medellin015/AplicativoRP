'use strict';
/* ============================================================================
   2) Capa de acceso a datos (expone window.DB)
   ----------------------------------------------------------------------------
   Única capa que habla con el almacén. Si hay Firestore, lo usa; si no, usa
   localStorage. La UI nunca toca Firestore directamente.
   Colecciones / claves:
     - cdp        : registros de la hoja CDP (Tabla2)
     - crp        : registros de la hoja CRP (Tabla3)
     - proveedores: catálogo NIT -> nombre (reconstruye el PROVEEDOR roto del Excel)
   ============================================================================ */
(function () {
  const LS_PREFIX = 'cdpcrp2026_';
  const usaFb = window.USA_FIREBASE;

  /* ===== Plan B: localStorage ===== */
  const lsLeer = (col) => {
    try { return JSON.parse(localStorage.getItem(LS_PREFIX + col) || '[]'); }
    catch (e) { return []; }
  };
  const lsGuardar = (col, arr) => localStorage.setItem(LS_PREFIX + col, JSON.stringify(arr));

  /* ===== API de alto nivel ===== */
  const DB = {
    modo: usaFb ? 'firestore' : 'local',

    async listar(col) {
      if (usaFb) {
        await window.authReady;
        const snap = await window.db.collection(col).get();
        return snap.docs.map((d) => ({ _id: d.id, ...d.data() }));
      }
      return lsLeer(col);
    },

    // Suscripción en vivo (Firestore) o lectura puntual (local) con callback
    suscribir(col, cb) {
      if (usaFb) {
        let unsub = () => {};
        window.authReady.then(() => {
          unsub = window.db.collection(col).onSnapshot((snap) => {
            cb(snap.docs.map((d) => ({ _id: d.id, ...d.data() })));
          }, (err) => console.warn('onSnapshot', col, err && err.code));
        });
        return () => unsub();
      }
      cb(lsLeer(col));
      return () => {};
    },

    async guardar(col, registro) {
      if (usaFb) {
        await window.authReady;
        if (registro._id) {
          const id = registro._id; const data = { ...registro }; delete data._id;
          await window.db.collection(col).doc(id).set(data, { merge: true });
          return id;
        }
        const ref = await window.db.collection(col).add({ ...registro, _creado: Date.now() });
        return ref.id;
      }
      const arr = lsLeer(col);
      if (registro._id) {
        const i = arr.findIndex((x) => x._id === registro._id);
        if (i >= 0) arr[i] = { ...registro }; else arr.push({ ...registro });
      } else {
        registro = { ...registro, _id: 'L' + Date.now() + Math.random().toString(36).slice(2, 7), _creado: Date.now() };
        arr.push(registro);
      }
      lsGuardar(col, arr);
      return registro._id;
    },

    async eliminar(col, id) {
      if (usaFb) { await window.authReady; await window.db.collection(col).doc(id).delete(); return; }
      lsGuardar(col, lsLeer(col).filter((x) => x._id !== id));
    },

    // Carga masiva (importación de Excel). Inserta en lote.
    async guardarLote(col, registros) {
      if (usaFb) {
        await window.authReady;
        const CH = 400; // límite de batch de Firestore es 500
        for (let i = 0; i < registros.length; i += CH) {
          const batch = window.db.batch();
          registros.slice(i, i + CH).forEach((r) => {
            const ref = window.db.collection(col).doc();
            batch.set(ref, { ...r, _creado: Date.now() });
          });
          await batch.commit();
        }
        return;
      }
      const arr = lsLeer(col);
      registros.forEach((r) => arr.push({
        ...r, _id: 'L' + Date.now() + Math.random().toString(36).slice(2, 7), _creado: Date.now()
      }));
      lsGuardar(col, arr);
    },

    async vaciar(col) {
      if (usaFb) {
        await window.authReady;
        const snap = await window.db.collection(col).get();
        const CH = 400;
        const docs = snap.docs;
        for (let i = 0; i < docs.length; i += CH) {
          const batch = window.db.batch();
          docs.slice(i, i + CH).forEach((d) => batch.delete(d.ref));
          await batch.commit();
        }
        return;
      }
      lsGuardar(col, []);
    }
  };

  window.DB = DB;
})();
