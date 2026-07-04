# AplicativoRP — CDP & CRP 2026

Registro y Análisis Presupuestal (CDP & CRP) para **ACTIVA — Empresa de Parques
y Eventos de Antioquia**. Aplicación web hecha con React. Funciona en **modo
local** (los datos se guardan en el navegador con `localStorage`) o, si
configuras Firebase, en **modo nube** (Firestore).

## Cómo abrir la aplicación

### Opción 1 — Doble clic (modo local)
Abre `index.html` con doble clic. La app se carga directamente; los datos se
guardan en el propio navegador. Necesitas conexión a internet la primera vez
para que se descarguen las librerías (React, Tailwind, etc.) desde sus CDN.

### Opción 2 — Servidor local (recomendado)
Algunos navegadores restringen ciertas funciones al abrir con `file://`. Para
evitarlo, sirve la carpeta:

```bash
npm start          # arranca un servidor estático en http://localhost:3000
```

(o cualquier servidor estático, p. ej. `python3 -m http.server`).

## Estructura del proyecto

El proyecto antes era **un solo `index.html` de ~1.200 líneas**. Ahora está
dividido para que sea más fácil de mantener:

```
index.html              Estructura HTML + enlaces a CSS/JS y librerías (CDN)
css/
  styles.css            Estilos propios (animaciones, scrollbar, tablas fijas)
js/
  firebase-config.js    Configuración de Firebase (opcional → modo nube)
  db.js                 Capa de datos (Firestore o localStorage). Expone window.DB
  app.jsx               CÓDIGO FUENTE de la app React (JSX) — se edita aquí
  app.js                Versión compilada de app.jsx que carga la página
build.js                Compila js/app.jsx → js/app.js
package.json            Scripts: build / start
```

### ¿Por qué `app.jsx` y `app.js`?

La versión anterior compilaba el JSX **en el navegador** con Babel en cada
carga. Eso era lento y dependía de que Babel se descargara correctamente: si
fallaba, la página quedaba en blanco (no abría). Ahora el JSX se compila una
sola vez a JavaScript normal (`js/app.js`) y la página carga ese archivo
directamente, sin Babel → **abre más rápido y de forma más fiable**.

- Edita siempre **`js/app.jsx`**.
- Después de editarlo, regenera `js/app.js`:

```bash
npm install        # solo la primera vez
npm run build
```

## Configurar Firebase (opcional, modo nube)

Para sincronizar los datos entre equipos, edita `js/firebase-config.js` y pega
tu configuración dentro de `firebaseConfig`. Si lo dejas vacío, la app sigue
funcionando en modo local.

## Funcionalidades

- Registro de **CDP** (Certificados de Disponibilidad Presupuestal) y **CRP/RP**
  (Registros Presupuestales) con fórmulas replicadas del Excel original.
- **Control de pagos**: registro y seguimiento de facturas (hoja
  `CONTROL DE PAGOS` del Excel) — fechas del flujo (INFO, supervisor,
  financiera, contabilidad, tesorería), valores (antes de IVA, IVA, TOTAL
  automático), proveedor/NIT, OP/CRP, cliente y estado de pago
  (OK, EN TESORERÍA, EN CONTABILIDAD, PENDIENTE DE CERTIFICAR,
  PENDIENTE DE ANULAR, ANULADO) con KPIs y filtro por estado.
- **Saldos CDP** (Valor CDP − Valor RP) y panel de **Análisis** (tablas
  dinámicas por fuente, categoría, rubro y contrato).
- **Importar / Exportar Excel** (`.xlsx`), con respaldo a CSV. La importación
  reconoce las hojas `CDP`, `CRP` y `CONTROL DE PAGOS`.
- Modo claro / oscuro y localización es-CO.

## Sistema de diseño (tarjetas)

Los contenedores usan un estilo de **tarjetas elevadas (soft UI)**: esquinas
redondeadas, borde hairline de 1px y sombras suaves en capas entintadas con el
color de marca. Al pasar el mouse la tarjeta sube 2px con sombra más profunda
(~150ms), y al cargar aparecen con entrada escalonada tipo fade-up. Todo se
controla con **tokens CSS** en `css/styles.css` (`:root` y `.dark`):
`--brand-rgb`, `--card-radius`, `--card-shadow`, `--card-lift`,
`--transition-fast`, `--stagger-step`, etc. Se respeta
`prefers-reduced-motion` (las animaciones se desactivan).
