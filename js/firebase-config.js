'use strict';
/* ============================================================================
   1) Configuración de Firebase  (expone window.db / window.auth / window.authReady)
   ----------------------------------------------------------------------------
   Si dejas firebaseConfig vacío, la app funciona igual usando localStorage como
   almacén local (plan B). Para sincronizar en la nube, pega aquí tu config y la
   app cambiará a Firestore automáticamente.
   ============================================================================ */
(function () {
  // Pega tu configuración de Firebase aquí para activar la nube (déjalo vacío para modo local):
  const firebaseConfig = {
    // apiKey: "...",
    // authDomain: "...",
    // projectId: "...",
    // storageBucket: "...",
    // messagingSenderId: "...",
    // appId: "..."
  };

  window.USA_FIREBASE = !!(firebaseConfig && firebaseConfig.projectId);

  if (window.USA_FIREBASE && window.firebase) {
    firebase.initializeApp(firebaseConfig);
    window.db = firebase.firestore();
    window.auth = firebase.auth();
    // Robustez en redes institucionales (proxies / long-polling)
    try {
      window.db.settings({ experimentalAutoDetectLongPolling: true, merge: true });
      window.db.enablePersistence({ synchronizeTabs: true })
        .catch((err) => console.warn('Persistencia offline no disponible:', err && err.code));
    } catch (e) { console.warn('No se pudo aplicar settings de Firestore:', e); }
    // Sesión anónima para cumplir reglas que exigen request.auth != null
    window.authReady = new Promise((resolve) => {
      window.auth.onAuthStateChanged((u) => { if (u) resolve(u); });
      window.auth.signInAnonymously().catch((err) => {
        console.warn('No se pudo iniciar sesión anónima:', err && err.code); resolve(null);
      });
    });
  } else {
    window.authReady = Promise.resolve(null);
  }
})();
