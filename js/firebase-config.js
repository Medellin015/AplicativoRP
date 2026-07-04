'use strict';
/* ============================================================================
   1) Configuración de Firebase  (expone window.db / window.auth / window.authReady)
   ----------------------------------------------------------------------------
   Si dejas firebaseConfig vacío, la app funciona igual usando localStorage como
   almacén local (plan B). Para sincronizar en la nube, pega aquí tu config y la
   app cambiará a Firestore automáticamente.
   ============================================================================ */
(function () {
  // ==========================================================================
  // Configuración de la APP WEB de Firebase (proyecto: cdp-rp-pagos).
  //
  // IMPORTANTE: esto NO es la cuenta de servicio (service account). La app del
  // navegador usa la config de la "App web" que aparece en:
  //   Consola de Firebase -> ⚙ Configuración del proyecto -> Tus apps ->
  //   App web -> "Configuración del SDK" -> objeto firebaseConfig.
  // La clave de cuenta de servicio (JSON de admin) es SECRETA y JAMÁS debe ir
  // en el navegador; solo se usa en scripts de servidor (ver scripts/).
  //
  // Ya dejamos rellenados los valores derivables del ID del proyecto. Solo
  // faltan apiKey, messagingSenderId y appId: cópialos desde la consola.
  // Mientras apiKey o appId estén vacíos, la app sigue en modo local
  // (localStorage) sin romperse.
  // ==========================================================================
  const firebaseConfig = {
    apiKey: "AIzaSyCHRruHvP9xBr_3DCH1nXoJxG5Ugv6uiPI",
    authDomain: "cdp-rp-pagos.firebaseapp.com",
    projectId: "cdp-rp-pagos",
    storageBucket: "cdp-rp-pagos.firebasestorage.app",
    messagingSenderId: "308232294692",
    appId: "1:308232294692:web:98512fa7b2cbd0745223b1"
  };

  // Solo activamos la nube cuando la config esencial está completa,
  // para no dejar la app a medio configurar.
  window.USA_FIREBASE = !!(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);

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
