# Configurar Firebase (nube) — proyecto `cdp-rp-pagos`

Esta guía deja la app sincronizando en la nube con Firestore. Son unos pocos
clics en la consola de Firebase más pegar un bloque de configuración en el
código.

> **Importante sobre la clave que compartiste.** El archivo
> `...firebase-adminsdk-fbsvc...json` es una **cuenta de servicio** (clave
> privada de administrador). **No** se puede usar en el navegador y **no** debe
> subirse a git. La app web usa otra cosa: la *config de la App web*. Además,
> como esa clave viajó por el chat, conviene **rotarla** (ver el punto 6).

## Por qué no pude crearla automáticamente

Con la clave que enviaste intenté crear/configurar la base desde aquí, pero
Google respondió `403 PERMISSION_DENIED` en todas las operaciones de
administración: esa cuenta de servicio **no tiene roles IAM asignados** en el
proyecto. Aun con permisos, la base debe crearse eligiendo una **ubicación
permanente** (una decisión tuya) y el navegador necesita la *config web*, que
solo se obtiene registrando una App web. Por eso los pasos siguientes son
manuales (y rápidos).

## 1. Crear la base de datos Firestore

1. Entra a la [consola de Firebase](https://console.firebase.google.com/) →
   proyecto **cdp-rp-pagos**.
2. Menú **Compilación → Firestore Database → Crear base de datos**.
3. Elige el modo **Producción** (usaremos reglas propias, ver paso 4).
4. **Ubicación** (⚠️ *no se puede cambiar después*):
   - `nam5` (EE. UU., multirregión) — opción por defecto, máxima durabilidad.
   - `southamerica-east1` (São Paulo) — **menor latencia para Colombia**.
   Recomendación para uso en Colombia: `southamerica-east1`.

## 2. Activar autenticación anónima

La app entra con sesión anónima. En **Compilación → Authentication → Comenzar →
pestaña Sign-in method → Anónimo → Habilitar**.

## 3. Registrar la App web y copiar la config

1. **⚙ Configuración del proyecto → Tus apps → icono `</>` (Web)**.
2. Ponle un apodo (ej. "AplicativoRP") y registra (no necesitas Hosting).
3. Copia el objeto `firebaseConfig` que te muestra. Se ve así:

   ```js
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "cdp-rp-pagos.firebaseapp.com",
     projectId: "cdp-rp-pagos",
     storageBucket: "cdp-rp-pagos.firebasestorage.app",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef..."
   };
   ```

4. Abre **`js/firebase-config.js`** y pega los valores que faltan: `apiKey`,
   `messagingSenderId` y `appId` (los demás ya están puestos). En cuanto
   `apiKey` y `appId` tengan valor, la app cambia sola a modo nube.

## 4. Publicar las reglas de seguridad

El repo ya trae **`firestore.rules`** (acceso para usuarios autenticados).
Publícalas de una de estas formas:

- **Consola:** Firestore Database → pestaña **Reglas** → pega el contenido de
  `firestore.rules` → **Publicar**.
- **CLI:** `npm i -g firebase-tools && firebase login && firebase deploy --only firestore:rules`

## 5. (Opcional) Cargar tus datos actuales a la nube

- La forma más simple: abre la app ya configurada y usa **Importar Excel** con
  tu archivo; los datos quedan en Firestore.
- Alternativa por terminal, con la cuenta de servicio (uso correcto, fuera del
  navegador). Antes concede a la cuenta de servicio el rol **Cloud Datastore
  User** en Google Cloud → IAM. Luego:

  ```bash
  export GOOGLE_APPLICATION_CREDENTIALS=/ruta/segura/serviceAccount.json
  npm install firebase-admin
  node scripts/firestore-admin.js check       # prueba de conexión + conteos
  node scripts/firestore-admin.js seed-demo    # opcional: datos de ejemplo
  ```

## 6. Seguridad: rota la clave compartida

Como la clave de cuenta de servicio se envió por el chat, lo prudente es
invalidarla y generar una nueva:

1. Google Cloud → **IAM y administración → Cuentas de servicio** →
   `firebase-adminsdk-fbsvc@cdp-rp-pagos...` → pestaña **Claves**.
2. **Elimina** la clave con ID `1d89a2bcdd...` y **crea** una nueva si la
   necesitas para el script del paso 5.
3. Guarda la nueva clave fuera del repositorio (el `.gitignore` ya bloquea los
   nombres típicos de estas claves).
