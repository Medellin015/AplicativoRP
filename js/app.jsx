/* ============================================================================
   APLICACIÓN (React + JSX) — CÓDIGO FUENTE EDITABLE
   ----------------------------------------------------------------------------
   Este archivo .jsx es la fuente que se EDITA. La página (index.html) NO lo
   carga directamente: carga la versión ya compilada en js/app.js para que
   abra rápido y sin depender de Babel en el navegador.

   Si modificas este archivo, vuelve a generar js/app.js con:
       npm run build      (ver package.json / README.md)
   ============================================================================ */
'use strict';
const { useState, useMemo, useEffect, useRef, useCallback } = React;

/* ============================================================================
   1. CATÁLOGOS POR DEFECTO
   ============================================================================ */
const RUBROS_DEFAULT = {"P-2.3.2.02.02.005": "CXP Construcción y Servicios de la construcción", "P-2.1.2.02.02.007": "CXP Servicios financieros y servicios conexos; servicios inmobiliarios; y servicios de arrendamiento y leasing", "P-2.4.5.02.09": "CXP Servicios para la comunidad, sociales y personales", "P-2.1.2.02.02.008": "CXP Servicios prestados a las empresas y servicios de producción", "P-2.1.2.02.02.006": "CXP Comercio y distribución; alojamiento; servicios de suministro de comidas y bebidas; servicios de transporte; y servicios de distribución de electricidad, gas y agua", "P-2.1.2.02.02.009": "CXP Servicios para la comunidad, sociales y personales", "P-2.3.2.02.02.008": "CXP Servicios prestados a las empresas y servicios de producción", "T-2.1.1.01.02.004": "CXP Aportes a cajas de compensación familiar", "T-2.1.1.01.02.001": "CXP Aportes a la seguridad social en pensiones", "T-2.1.1.01.02.002": "CXP Aportes a la seguridad social en salud", "T-2.1.1.01.02.006": "CXP Aportes al ICBF", "T-2.1.1.01.02.007": "CXP Aportes al SENA", "T-2.1.1.01.02.005": "CXP Aportes generales al sistema de riesgos laborales", "T-2.1.1.01.02.003": "CXP Aportes de cesantías", "T-2.1.1.01.03.001.03": "CXP Bonificación especial de recreación", "T-2.1.1.01.01.001.07": "CXP Bonificación por servicios prestados", "T-2.1.1.01.01.001.06": "CXP Prima de servicio", "T-2.1.1.01.01.001.08.02": "CXP Prima de vacaciones", "T-2.1.1.01.03.001.01": "CXP Vacaciones", "T-2.4.5.02.09": "CXP Servicios para la comunidad, sociales y personales", "T-2.3.2.02.02.005": "CXP Construcción y Servicios de la construcción", "T-2.1.2.02.01.004": "CXP Productos metálicos y paquetes de software", "T-2.1.2.02.02.008": "CXP Servicios prestados a las empresas y servicios de producción", "T-2.3.2.02.02.008": "CXP Servicios prestados a las empresas y servicios de producción", "T-2.1.2.02.02.007": "CXP Servicios financieros y servicios conexos, servicios inmobiliarios y servicios de leasing", "T-2.4.5.02.08": "CXP Servicios prestados a las empresas y servicios de producción", "2.1.2.02.02.008": "Servicios prestados a las empresas y servicios de producción", "2.1.2.02.01.004": "Productos metálicos y paquetes de software", "2.1.2.02.02.007": "Servicios financieros y servicios conexos; servicios inmobiliarios; y servicios de arrendamiento y leasing", "2.4.5.02.09": "Servicios para la comunidad, sociales y personales", "2.3.2.02.02.008": "Servicios prestados a las empresas y servicios de producción", "2.1.2.02.01.001": "Minerales; electricidad, gas y agua", "2.1.2.02.02.009": "Servicios para la comunidad, sociales y personales", "2.1.1.01.01.001.01": "Sueldo básico", "2.1.1.01.01.001.06": "Prima de servicio", "2.1.1.01.01.001.07": "Bonificación por servicios prestados", "2.1.1.01.01.001.08.01": "Prima de navidad", "2.1.1.01.01.001.08.02": "Prima de vacaciones", "2.1.1.01.02.003": "Aportes de cesantías", "2.1.1.01.03.001.01": "Vacaciones", "2.1.1.01.03.001.03": "Bonificación especial de recreación", "2.1.1.01.02.001": "Aportes a la seguridad social en pensiones", "2.1.1.01.02.002": "Aportes a la seguridad social en salud", "2.1.1.01.02.004": "Aportes a cajas de compensación familiar", "2.1.1.01.02.005": "Aportes generales al sistema de riesgos laborales", "2.1.1.01.02.006": "Aportes al ICBF", "2.1.1.01.02.007": "Aportes al SENA", "2.1.8.01.14": "Gravamen a los movimientos financieros", "2.1.2.02.02.006": "Comercio y distribución; alojamiento; servicios de suministro de comidas y bebidas; servicios de transporte; y servicios de distribución de electricidad, gas y agua", "2.1.2.01.01.005.01.02.01": "Árboles frutales", "2.1.8.03": "Tasas y derechos administrativos", "2.1.8.04.01": "Cuota de fiscalización y auditaje", "2.1.2.02.02.010": "Viáticos de los funcionarios en comisión", "2.1.2.02.01.003": "Otros bienes transportables (excepto productos metálicos, maquinaria y equipo)", "2.1.8.01.54": "Impuesto de industria y comercio"};

const FUENTES_DEFAULT = [
  "ACTIVA","ASAMBLEA DEPARTAMENTAL DE ANTIOQUIA","CORPORACIÓN GILBERTO ECHEVERRI MEJÍA",
  "CXP ACTIVA","CXP IDEA","CXP INDEPORTES","CXP VOLCÁN DE LODO","CXP LOTERÍA DE MEDELLÍN",
  "CXP FABRICA DE LICORES Y ALCOHOLES DE ANTIOQUIA - FLA","CXP VIVA",
  "CXP INSTITUTO DE CULTURA Y PATRIMONIO DE ANTIOQUIA",
  "CXP INSTITUTO PARA EL DESARROLLO DE ANTIOQUIA-IDEA",
  "CXP Departamento Administrativo de Gestión del Riesgo de Antioquia - DAGRAN",
  "CXP DEPARTAMENTO DE ANTIOQUIA – SECRETARÍA DE EDUCACIÓN","IDEA","INDEPORTES","VIVA"
];

/* ============================================================================
   2. UTILIDADES es-CO Y MOTOR DE FÓRMULAS (réplica de las del Excel)
   ============================================================================ */
const fmtCOP = (n) => new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0
}).format(Number(n) || 0);

const fmtNum = (n) => new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 }).format(Number(n) || 0);

// Fecha para mostrar DD/MM/AAAA (sin desfase de zona)
const fmtFecha = (iso) => {
  if (!iso) return '';
  const [y, m, d] = String(iso).split('-').map(Number);
  if (!y) return iso;
  return `${String(d).padStart(2, '0')}/${String(m).padStart(2, '0')}/${y}`;
};
// Fecha de hoy en AAAA-MM-DD
const hoyISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
const toNum = (v) => { const n = Number(v); return isNaN(n) ? 0 : n; };

/* --- Fórmulas CDP --------------------------------------------------------- */
// ESTADO CDP  =IF(CPC<>"","Expedición","")
const calcEstadoCdp = (cpc) => (String(cpc ?? '').trim() !== '' ? 'Expedición' : '');
// CDP (nº)    =IFERROR(VALUE(MID(N CDP,4,3)),"")   -> chars 4..6 de N CDP
const calcCdpNum = (nCdp) => {
  const s = String(nCdp ?? '');
  const frag = s.substring(3, 6);
  const n = Number(frag);
  return (frag !== '' && !isNaN(n)) ? n : '';
};

/* --- Normalización del N CDP en CRP (réplica de la fórmula L) ------------- */
// Si empieza por X -> se deja igual. Si es numérico -> "CDP" + relleno a 3 dígitos.
const normalizarNCDP = (cdpRaw) => {
  const s = String(cdpRaw ?? '').trim();
  if (!s) return '';
  if (s[0].toUpperCase() === 'X') return s;       // CDP especial (XOP..)
  return 'CDP' + s.padStart(3, '0');               // 1->CDP001, 12->CDP012, 1234->CDP1234
};

/* --- Fórmulas CRP --------------------------------------------------------- */
// RP2  =IFERROR(IF(LEFT(N RP,1)="X","",VALUE(MID(RP,1,3))),"")  -> entero inicial del texto RP
const calcRp2 = (nRp, rpTexto) => {
  if (String(nRp ?? '')[0]?.toUpperCase() === 'X') return '';
  const m = String(rpTexto ?? '').match(/^\s*(\d+)/);
  return m ? Number(m[1]) : '';
};
// TIPO DE CONTRATO =LEFT(N° CONTRATO,2)
const calcTipoContrato = (nContrato) => String(nContrato ?? '').trim().substring(0, 2);
// OP-Contrato Cliente =IF(OP="","",OP&"-"&CONTRATO/CC)
const calcOpContrato = (op, contratoCC) =>
  (String(op ?? '').trim() === '' ? '' : `${op}-${contratoCC ?? ''}`);

// Resuelve todos los campos derivados de un CRP usando el índice de CDP y catálogo de proveedores
const resolverCRP = (crp, cdpIndex, provIndex) => {
  const nCdpNorm = normalizarNCDP(crp.cdpRaw);
  const cdp = cdpIndex[nCdpNorm] || null;
  const nombreRubro = cdp ? (cdp.nombreRubro || '') : '';
  const estadoRp = nombreRubro !== '' ? 'Expedición' : '';
  const nitDigits = String(crp.nit ?? '').replace(/\D/g, '');
  const proveedor = provIndex[nitDigits] || 'Por favor revisar NIT';
  const contratoCC = cdp ? (cdp.contratoCC || '') : '';
  return {
    nCdp: nCdpNorm,
    nombreRubro,
    codigoRubro: cdp ? (cdp.codigoRubro || '') : '',
    cpc: cdp ? (cdp.cpc || '') : '',
    fuente: cdp ? (cdp.fuente || '') : '',
    contratoCC,
    categoria: cdp ? (cdp.categoria || '') : '',
    fechaCdp: cdp ? (cdp.fechaCdp || '') : '',
    estadoRp,
    rp2: calcRp2(crp.nRp, crp.rp),
    tipoContrato: calcTipoContrato(crp.nContrato),
    proveedor,
    opContrato: calcOpContrato(crp.op, contratoCC),
    cdpEncontrado: !!cdp
  };
};

/* ============================================================================
   3. COMPONENTES BÁSICOS DE UI (toasts, tema, campos)
   ============================================================================ */

// --- Toasts ---
const ToastCtx = React.createContext(() => {});
function ToastHost({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, tipo = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, tipo }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);
  const color = { ok: 'bg-emerald-600', err: 'bg-rose-600', info: 'bg-sky-600', warn: 'bg-amber-600' };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`${color[t.tipo]} text-white px-4 py-2.5 rounded-lg shadow-lg slide-up max-w-xs text-sm`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => React.useContext(ToastCtx);

// --- Campo de formulario reutilizable ---
function Campo({ label, children, hint, req }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-slate-600 dark:text-slate-300">
        {label} {req && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </label>
  );
}
const inputCls = "px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition";

// --- Campo "solo lectura" para mostrar valores calculados (automáticos) ---
function CampoCalc({ label, valor }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
        {label}
        <span className="text-[10px] uppercase tracking-wide bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded">auto</span>
      </span>
      <div className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 min-h-[2.4rem] text-slate-700 dark:text-slate-200 break-words">
        {valor === '' || valor === null || valor === undefined
          ? <span className="text-slate-400 italic">—</span> : String(valor)}
      </div>
    </label>
  );
}

// --- Tarjeta KPI ---
function Kpi({ titulo, valor, sub, color = "sky" }) {
  const map = {
    sky: "from-sky-500 to-blue-600", emerald: "from-emerald-500 to-green-600",
    amber: "from-amber-500 to-orange-600", rose: "from-rose-500 to-pink-600",
    violet: "from-violet-500 to-purple-600", slate: "from-slate-500 to-slate-700"
  };
  return (
    <div className={`rounded-xl p-4 text-white shadow-md bg-gradient-to-br ${map[color]} slide-up`}>
      <div className="text-xs uppercase tracking-wide opacity-90">{titulo}</div>
      <div className="text-2xl font-bold mt-1 leading-tight">{valor}</div>
      {sub && <div className="text-xs opacity-90 mt-1">{sub}</div>}
    </div>
  );
}

// --- Modal de confirmación ---
function Confirm({ abierto, titulo, mensaje, onSi, onNo }) {
  if (!abierto) return null;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 fade-in"
         onMouseDown={(e) => { if (e.target === e.currentTarget) onNo(); }}>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 max-w-sm w-full shadow-2xl slide-up">
        <h3 className="text-lg font-semibold mb-2">{titulo}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">{mensaje}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onNo} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:opacity-80 text-sm">Cancelar</button>
          <button onClick={onSi} className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700 text-sm">Confirmar</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   4. PESTAÑA CDP — registro de Certificados de Disponibilidad Presupuestal
   ============================================================================ */
const CDP_VACIO = {
  nCdp: '', pos: 1, fechaCdp: hoyISO(), nombreRubro: '', categoria: '', cpc: '',
  codigoRubro: '', valor: '', descripcion: '', fuente: '', contratoCC: '', solicitante: ''
};

function FormularioCDP({ registro, onGuardar, onCancelar, rubros }) {
  const [f, setF] = useState(registro || CDP_VACIO);
  const toast = useToast();
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  // Borrador en localStorage para formularios largos (solo en alta)
  useEffect(() => {
    if (!registro) {
      const b = localStorage.getItem('borrador_cdp');
      if (b) { try { setF(JSON.parse(b)); } catch (e) {} }
    }
  }, []);
  useEffect(() => {
    if (!registro) localStorage.setItem('borrador_cdp', JSON.stringify(f));
  }, [f, registro]);

  // Autorelleno del NOMBRE DEL RUBRO al elegir CÓDIGO RUBRO
  const onCodigo = (v) => {
    setF((s) => ({ ...s, codigoRubro: v, nombreRubro: rubros[v] || s.nombreRubro }));
  };

  // Campos calculados (siempre automáticos)
  const estadoCdp = calcEstadoCdp(f.cpc);
  const categoria1 = f.categoria || '';
  const cdpNum = calcCdpNum(f.nCdp);

  const guardar = () => {
    if (!String(f.nCdp).trim()) { toast('El N° CDP es obligatorio', 'err'); return; }
    if (toNum(f.valor) <= 0) { toast('El VALOR debe ser mayor a 0', 'err'); return; }
    onGuardar({ ...f, valor: toNum(f.valor), pos: toNum(f.pos) || 1 });
    localStorage.removeItem('borrador_cdp');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow border border-slate-200 dark:border-slate-800 slide-up">
      <h3 className="font-semibold mb-4 text-lg">{registro ? 'Editar CDP' : 'Nuevo CDP'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Campo label="N° CDP" req hint="Ej: CDP001, CDP012 o XOP50-1">
          <input className={inputCls} value={f.nCdp} onChange={(e) => set('nCdp', e.target.value)} />
        </Campo>
        <Campo label="POS"><input type="number" className={inputCls} value={f.pos} onChange={(e) => set('pos', e.target.value)} /></Campo>
        <Campo label="Fecha de CDP"><input type="date" className={inputCls} value={f.fechaCdp} onChange={(e) => set('fechaCdp', e.target.value)} /></Campo>

        <Campo label="Código rubro" hint="Autorrellena el nombre del rubro">
          <input className={inputCls} list="dl-rubros" value={f.codigoRubro} onChange={(e) => onCodigo(e.target.value)} />
          <datalist id="dl-rubros">{Object.keys(rubros).map((c) => <option key={c} value={c}>{rubros[c]}</option>)}</datalist>
        </Campo>
        <Campo label="Nombre del rubro">
          <input className={inputCls} value={f.nombreRubro} onChange={(e) => set('nombreRubro', e.target.value)} />
        </Campo>
        <Campo label="CPC"><input className={inputCls} value={f.cpc} onChange={(e) => set('cpc', e.target.value)} /></Campo>

        <Campo label="Categoría">
          <input className={inputCls} list="dl-categorias" value={f.categoria} onChange={(e) => set('categoria', e.target.value)} />
        </Campo>
        <Campo label="Fuente presupuesto">
          <input className={inputCls} list="dl-fuentes" value={f.fuente} onChange={(e) => set('fuente', e.target.value)} />
          <datalist id="dl-fuentes">{FUENTES_DEFAULT.map((x) => <option key={x} value={x} />)}</datalist>
        </Campo>
        <Campo label="N° Contrato / Centro de costos">
          <input className={inputCls} list="dl-contratos" value={f.contratoCC} onChange={(e) => set('contratoCC', e.target.value)} />
        </Campo>

        <Campo label="Valor" req>
          <input type="number" className={inputCls} value={f.valor} onChange={(e) => set('valor', e.target.value)} />
          <span className="text-xs text-emerald-600 dark:text-emerald-400">{fmtCOP(f.valor)}</span>
        </Campo>
        <Campo label="Solicitante">
          <input className={inputCls} list="dl-solic" value={f.solicitante} onChange={(e) => set('solicitante', e.target.value)} />
        </Campo>
        <div></div>

        <div className="md:col-span-3">
          <Campo label="Descripción">
            <textarea rows={2} className={inputCls} value={f.descripcion} onChange={(e) => set('descripcion', e.target.value)} />
          </Campo>
        </div>
      </div>

      {/* Campos automáticos (fórmulas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <CampoCalc label="Estado CDP" valor={estadoCdp} />
        <CampoCalc label="Categoría_1" valor={categoria1} />
        <CampoCalc label="CDP (nº)" valor={cdpNum} />
      </div>

      <div className="flex justify-end gap-2 mt-5">
        {onCancelar && <button onClick={onCancelar} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm">Cancelar</button>}
        <button onClick={guardar} className="px-5 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-sm font-medium">
          {registro ? 'Guardar cambios' : 'Registrar CDP'}
        </button>
      </div>
    </div>
  );
}

function TablaCDP({ cdps, onEditar, onEliminar }) {
  const [q, setQ] = useState('');
  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return cdps;
    return cdps.filter((c) => [c.nCdp, c.nombreRubro, c.categoria, c.fuente, c.contratoCC, c.descripcion, c.solicitante]
      .some((x) => String(x ?? '').toLowerCase().includes(t)));
  }, [cdps, q]);
  const total = useMemo(() => filtrados.reduce((s, c) => s + toNum(c.valor), 0), [filtrados]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-3 flex flex-wrap items-center gap-3 border-b border-slate-200 dark:border-slate-800">
        <input className={inputCls + " flex-1 min-w-[200px]"} placeholder="Buscar por N° CDP, rubro, categoría, contrato…"
               value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="text-sm text-slate-500">{filtrados.length} registros · <b className="text-emerald-600 dark:text-emerald-400">{fmtCOP(total)}</b></span>
      </div>
      <div className="overflow-auto max-h-[60vh]">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky-head bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-500">
            <tr>
              {['N° CDP','Fecha','Estado','Código rubro','Nombre rubro','Categoría','CPC','Fuente','Contrato/CC','Valor','Solicitante',''].map((h) =>
                <th key={h} className="px-3 py-2 text-left whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c) => (
              <tr key={c._id} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-3 py-2 font-medium whitespace-nowrap">{c.nCdp}</td>
                <td className="px-3 py-2 whitespace-nowrap">{fmtFecha(c.fechaCdp)}</td>
                <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded text-xs ${calcEstadoCdp(c.cpc) ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-400'}`}>{calcEstadoCdp(c.cpc) || '—'}</span></td>
                <td className="px-3 py-2 whitespace-nowrap">{c.codigoRubro}</td>
                <td className="px-3 py-2 max-w-[220px] truncate" title={c.nombreRubro}>{c.nombreRubro}</td>
                <td className="px-3 py-2 whitespace-nowrap">{c.categoria}</td>
                <td className="px-3 py-2">{c.cpc}</td>
                <td className="px-3 py-2 max-w-[160px] truncate" title={c.fuente}>{c.fuente}</td>
                <td className="px-3 py-2 max-w-[140px] truncate" title={c.contratoCC}>{c.contratoCC}</td>
                <td className="px-3 py-2 text-right whitespace-nowrap font-medium">{fmtCOP(c.valor)}</td>
                <td className="px-3 py-2 max-w-[140px] truncate" title={c.solicitante}>{c.solicitante}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button onClick={() => onEditar(c)} className="text-sky-600 hover:underline mr-2">Editar</button>
                  <button onClick={() => onEliminar(c)} className="text-rose-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && <tr><td colSpan={12} className="px-3 py-8 text-center text-slate-400">Sin registros</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================================
   5. PESTAÑA CRP — registro de Registros Presupuestales (compromisos)
   ============================================================================ */
const CRP_VACIO = {
  nRp: '', rp: '', pos: 1, fechaRp: hoyISO(), valor: '', nContrato: '', nit: '',
  cdpRaw: '', descripcion: '', solicitante: '', op: '', fechaEvento: ''
};

function FormularioCRP({ registro, onGuardar, onCancelar, cdpIndex, provIndex, cdps }) {
  const [f, setF] = useState(registro || CRP_VACIO);
  const toast = useToast();
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    if (!registro) { const b = localStorage.getItem('borrador_crp'); if (b) { try { setF(JSON.parse(b)); } catch (e) {} } }
  }, []);
  useEffect(() => { if (!registro) localStorage.setItem('borrador_crp', JSON.stringify(f)); }, [f, registro]);

  // Todo lo derivado se recalcula en vivo (automático) contra CDP y catálogo de proveedores
  const der = useMemo(() => resolverCRP(f, cdpIndex, provIndex), [f, cdpIndex, provIndex]);

  const guardar = () => {
    if (!String(f.nRp).trim()) { toast('El N° RP es obligatorio', 'err'); return; }
    if (toNum(f.valor) <= 0) { toast('El VALOR debe ser mayor a 0', 'err'); return; }
    if (!der.cdpEncontrado) toast('Aviso: el CDP indicado no existe aún en la hoja CDP', 'warn');
    // Persistimos solo entradas + proveedor (editable). Lo demás se recalcula siempre.
    onGuardar({ ...f, valor: toNum(f.valor), pos: toNum(f.pos) || 1, proveedor: f.proveedor || der.proveedor });
    localStorage.removeItem('borrador_crp');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow border border-slate-200 dark:border-slate-800 slide-up">
      <h3 className="font-semibold mb-4 text-lg">{registro ? 'Editar RP' : 'Nuevo RP'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Campo label="N° RP" req hint="Ej: 1, 65 o XOP51-1"><input className={inputCls} value={f.nRp} onChange={(e) => set('nRp', e.target.value)} /></Campo>
        <Campo label="RP" hint='Texto, ej: "65 DE 2025"'><input className={inputCls} value={f.rp} onChange={(e) => set('rp', e.target.value)} /></Campo>
        <Campo label="POS"><input type="number" className={inputCls} value={f.pos} onChange={(e) => set('pos', e.target.value)} /></Campo>

        <Campo label="Fecha RP"><input type="date" className={inputCls} value={f.fechaRp} onChange={(e) => set('fechaRp', e.target.value)} /></Campo>
        <Campo label="Valor" req>
          <input type="number" className={inputCls} value={f.valor} onChange={(e) => set('valor', e.target.value)} />
          <span className="text-xs text-emerald-600 dark:text-emerald-400">{fmtCOP(f.valor)}</span>
        </Campo>
        <Campo label="CDP (referencia)" req hint="Nº o XOP… → se normaliza a N CDP">
          <input className={inputCls} list="dl-cdps" value={f.cdpRaw} onChange={(e) => set('cdpRaw', e.target.value)} />
          <datalist id="dl-cdps">{cdps.map((c) => <option key={c._id} value={c.nCdp}>{c.nombreRubro}</option>)}</datalist>
        </Campo>

        <Campo label="N° Contrato"><input className={inputCls} value={f.nContrato} onChange={(e) => set('nContrato', e.target.value)} /></Campo>
        <Campo label="NIT" hint="Autorrellena el proveedor si está en el catálogo">
          <input className={inputCls} value={f.nit} onChange={(e) => set('nit', e.target.value)} />
        </Campo>
        <Campo label="Proveedor" hint="Editable; se guarda al catálogo NIT→Proveedor">
          <input className={inputCls} value={f.proveedor ?? der.proveedor} onChange={(e) => set('proveedor', e.target.value)} />
        </Campo>

        <Campo label="OP"><input className={inputCls} value={f.op} onChange={(e) => set('op', e.target.value)} /></Campo>
        <Campo label="Fecha evento"><input type="date" className={inputCls} value={f.fechaEvento} onChange={(e) => set('fechaEvento', e.target.value)} /></Campo>
        <Campo label="Solicitante"><input className={inputCls} list="dl-solic" value={f.solicitante} onChange={(e) => set('solicitante', e.target.value)} /></Campo>

        <div className="md:col-span-3">
          <Campo label="Descripción"><textarea rows={2} className={inputCls} value={f.descripcion} onChange={(e) => set('descripcion', e.target.value)} /></Campo>
        </div>
      </div>

      {/* Campos automáticos resueltos desde el CDP */}
      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-3 text-sm">
          <span className="font-medium text-slate-600 dark:text-slate-300">Datos heredados del CDP</span>
          {der.cdpEncontrado
            ? <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">N CDP: {der.nCdp}</span>
            : <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">CDP no encontrado ({der.nCdp || '—'})</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CampoCalc label="Estado RP" valor={der.estadoRp} />
          <CampoCalc label="Nombre del rubro" valor={der.nombreRubro} />
          <CampoCalc label="Código rubro" valor={der.codigoRubro} />
          <CampoCalc label="CPC" valor={der.cpc} />
          <CampoCalc label="Fuente presupuesto" valor={der.fuente} />
          <CampoCalc label="N° Contrato / CC" valor={der.contratoCC} />
          <CampoCalc label="Categoría" valor={der.categoria} />
          <CampoCalc label="Fecha CDP" valor={fmtFecha(der.fechaCdp)} />
          <CampoCalc label="RP2" valor={der.rp2} />
          <CampoCalc label="Tipo de contrato" valor={der.tipoContrato} />
          <CampoCalc label="OP-Contrato cliente" valor={der.opContrato} />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-5">
        {onCancelar && <button onClick={onCancelar} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm">Cancelar</button>}
        <button onClick={guardar} className="px-5 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 text-sm font-medium">
          {registro ? 'Guardar cambios' : 'Registrar RP'}
        </button>
      </div>
    </div>
  );
}

function TablaCRP({ crps, cdpIndex, provIndex, onEditar, onEliminar }) {
  const [q, setQ] = useState('');
  const rows = useMemo(() => crps.map((c) => ({ ...c, _d: resolverCRP(c, cdpIndex, provIndex) })), [crps, cdpIndex, provIndex]);
  const filtrados = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((c) => [c.nRp, c.rp, c.nContrato, c.nit, c.proveedor, c._d.nombreRubro, c._d.fuente, c._d.nCdp]
      .some((x) => String(x ?? '').toLowerCase().includes(t)));
  }, [rows, q]);
  const total = useMemo(() => filtrados.reduce((s, c) => s + toNum(c.valor), 0), [filtrados]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="p-3 flex flex-wrap items-center gap-3 border-b border-slate-200 dark:border-slate-800">
        <input className={inputCls + " flex-1 min-w-[200px]"} placeholder="Buscar por N° RP, contrato, NIT, proveedor, rubro…" value={q} onChange={(e) => setQ(e.target.value)} />
        <span className="text-sm text-slate-500">{filtrados.length} registros · <b className="text-violet-600 dark:text-violet-400">{fmtCOP(total)}</b></span>
      </div>
      <div className="overflow-auto max-h-[60vh]">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky-head bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-500">
            <tr>{['N° RP','RP','Fecha','N CDP','Estado','Rubro','Fuente','Contrato','NIT','Proveedor','Valor',''].map((h) =>
              <th key={h} className="px-3 py-2 text-left whitespace-nowrap">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtrados.map((c) => (
              <tr key={c._id} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="px-3 py-2 font-medium whitespace-nowrap">{c.nRp}</td>
                <td className="px-3 py-2 whitespace-nowrap">{c.rp}</td>
                <td className="px-3 py-2 whitespace-nowrap">{fmtFecha(c.fechaRp)}</td>
                <td className="px-3 py-2 whitespace-nowrap"><span className={c._d.cdpEncontrado ? '' : 'text-amber-600'}>{c._d.nCdp}</span></td>
                <td className="px-3 py-2"><span className={`px-2 py-0.5 rounded text-xs ${c._d.estadoRp ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-slate-100 text-slate-400'}`}>{c._d.estadoRp || '—'}</span></td>
                <td className="px-3 py-2 max-w-[200px] truncate" title={c._d.nombreRubro}>{c._d.nombreRubro}</td>
                <td className="px-3 py-2 max-w-[150px] truncate" title={c._d.fuente}>{c._d.fuente}</td>
                <td className="px-3 py-2 whitespace-nowrap">{c.nContrato}</td>
                <td className="px-3 py-2 whitespace-nowrap">{c.nit}</td>
                <td className="px-3 py-2 max-w-[160px] truncate" title={c.proveedor ?? c._d.proveedor}>{c.proveedor ?? c._d.proveedor}</td>
                <td className="px-3 py-2 text-right whitespace-nowrap font-medium">{fmtCOP(c.valor)}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <button onClick={() => onEditar(c)} className="text-sky-600 hover:underline mr-2">Editar</button>
                  <button onClick={() => onEliminar(c)} className="text-rose-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && <tr><td colSpan={12} className="px-3 py-8 text-center text-slate-400">Sin registros</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================================
   6. ANÁLISIS — Saldos CDP, Tablas dinámicas (TD CDP/RP) y Compromisos vs Ppto
   ============================================================================ */

// Agrupa importes por una o dos claves
const agrupar = (arr, keyFn, valFn) => {
  const m = new Map();
  arr.forEach((x) => {
    const k = keyFn(x);
    m.set(k, (m.get(k) || 0) + toNum(valFn(x)));
  });
  return [...m.entries()].map(([k, v]) => ({ k, v })).sort((a, b) => b.v - a.v);
};

// Barra horizontal simple para los rankings
function Barra({ label, valor, max, color = "sky" }) {
  const pct = max > 0 ? Math.max(2, (Math.abs(valor) / max) * 100) : 0;
  const c = { sky: 'bg-sky-500', violet: 'bg-violet-500', emerald: 'bg-emerald-500', rose: 'bg-rose-500', amber: 'bg-amber-500' }[color];
  return (
    <div className="flex items-center gap-2 text-xs py-0.5">
      <div className="w-48 shrink-0 truncate" title={label}>{label || '(vacío)'}</div>
      <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded h-4 relative">
        <div className={`${c} h-4 rounded`} style={{ width: pct + '%' }}></div>
      </div>
      <div className="w-32 text-right shrink-0 font-medium">{fmtCOP(valor)}</div>
    </div>
  );
}

function Ranking({ titulo, datos, color, limite = 15 }) {
  const max = datos.length ? Math.max(...datos.map((d) => Math.abs(d.v))) : 0;
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold mb-3 text-sm">{titulo}</h4>
      <div className="space-y-0.5">
        {datos.slice(0, limite).map((d, i) => <Barra key={i} label={d.k} valor={d.v} max={max} color={color} />)}
        {datos.length === 0 && <div className="text-slate-400 text-sm py-4 text-center">Sin datos</div>}
      </div>
    </div>
  );
}

// --- SALDOS CDP: por cada CDP -> Valor CDP, Valor RP (SUMIF), Saldo = D - E ---
function SaldosCDP({ cdps, crps, cdpIndex, provIndex }) {
  const [q, setQ] = useState('');
  const [soloNeg, setSoloNeg] = useState(false);
  const datos = useMemo(() => {
    // Σ valor CDP por N CDP
    const valCdp = new Map();
    const meta = new Map();
    cdps.forEach((c) => {
      valCdp.set(c.nCdp, (valCdp.get(c.nCdp) || 0) + toNum(c.valor));
      if (!meta.has(c.nCdp)) meta.set(c.nCdp, { solicitante: c.solicitante, contratoCC: c.contratoCC, nombreRubro: c.nombreRubro });
    });
    // Σ valor RP por N CDP normalizado (réplica de SUMIF(CRP!L:L, CDP, CRP!G:G))
    const valRp = new Map();
    crps.forEach((r) => {
      const n = normalizarNCDP(r.cdpRaw);
      valRp.set(n, (valRp.get(n) || 0) + toNum(r.valor));
    });
    const rows = [...valCdp.keys()].map((n) => {
      const d = valCdp.get(n) || 0; const e = valRp.get(n) || 0;
      return { nCdp: n, ...(meta.get(n) || {}), valorCdp: d, valorRp: e, saldo: d - e };
    });
    return rows.sort((a, b) => a.nCdp.localeCompare(b.nCdp, 'es', { numeric: true }));
  }, [cdps, crps]);

  const filtrados = useMemo(() => {
    let r = datos;
    if (soloNeg) r = r.filter((x) => x.saldo < -0.5);
    const t = q.trim().toLowerCase();
    if (t) r = r.filter((x) => [x.nCdp, x.solicitante, x.contratoCC, x.nombreRubro].some((y) => String(y ?? '').toLowerCase().includes(t)));
    return r;
  }, [datos, q, soloNeg]);

  const tot = useMemo(() => filtrados.reduce((a, x) => ({
    cdp: a.cdp + x.valorCdp, rp: a.rp + x.valorRp, saldo: a.saldo + x.saldo
  }), { cdp: 0, rp: 0, saldo: 0 }), [filtrados]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Kpi titulo="Total CDP" valor={fmtCOP(tot.cdp)} color="sky" />
        <Kpi titulo="Total comprometido (RP)" valor={fmtCOP(tot.rp)} color="violet" />
        <Kpi titulo="Saldo disponible" valor={fmtCOP(tot.saldo)} color={tot.saldo < 0 ? 'rose' : 'emerald'} />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-3 flex flex-wrap items-center gap-3 border-b border-slate-200 dark:border-slate-800">
          <input className={inputCls + " flex-1 min-w-[200px]"} placeholder="Buscar CDP, solicitante, contrato…" value={q} onChange={(e) => setQ(e.target.value)} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={soloNeg} onChange={(e) => setSoloNeg(e.target.checked)} /> Solo saldos sobre-ejecutados (negativos)</label>
          <span className="text-sm text-slate-500">{filtrados.length} CDP</span>
        </div>
        <div className="overflow-auto max-h-[60vh]">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky-head bg-slate-100 dark:bg-slate-800 text-xs uppercase text-slate-500">
              <tr>{['N CDP','Solicitante','Contrato/CC','Valor CDP','Valor RP','Saldo'].map((h) =>
                <th key={h} className="px-3 py-2 text-left whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtrados.map((x) => (
                <tr key={x.nCdp} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-3 py-2 font-medium whitespace-nowrap">{x.nCdp}</td>
                  <td className="px-3 py-2 max-w-[180px] truncate" title={x.solicitante}>{x.solicitante}</td>
                  <td className="px-3 py-2 max-w-[150px] truncate" title={x.contratoCC}>{x.contratoCC}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{fmtCOP(x.valorCdp)}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{fmtCOP(x.valorRp)}</td>
                  <td className={`px-3 py-2 text-right whitespace-nowrap font-semibold ${x.saldo < -0.5 ? 'text-rose-600' : x.saldo < 0.5 ? 'text-slate-400' : 'text-emerald-600'}`}>{fmtCOP(x.saldo)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-100 dark:bg-slate-800 font-semibold sticky bottom-0">
              <tr>
                <td className="px-3 py-2" colSpan={3}>Totales</td>
                <td className="px-3 py-2 text-right">{fmtCOP(tot.cdp)}</td>
                <td className="px-3 py-2 text-right">{fmtCOP(tot.rp)}</td>
                <td className={`px-3 py-2 text-right ${tot.saldo < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>{fmtCOP(tot.saldo)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Tablas dinámicas (TD CDP / TD RP) y Compromisos vs Ppto ---
function Analisis({ cdps, crps, cdpIndex, provIndex }) {
  const crpRows = useMemo(() => crps.map((c) => ({ ...c, _d: resolverCRP(c, cdpIndex, provIndex) })), [crps, cdpIndex, provIndex]);

  const tdCdpFuente = useMemo(() => agrupar(cdps, (x) => x.fuente, (x) => x.valor), [cdps]);
  const tdCdpCat = useMemo(() => agrupar(cdps, (x) => x.categoria, (x) => x.valor), [cdps]);
  const tdCdpRubro = useMemo(() => agrupar(cdps, (x) => x.nombreRubro, (x) => x.valor), [cdps]);

  const tdRpFuente = useMemo(() => agrupar(crpRows, (x) => x._d.fuente, (x) => x.valor), [crpRows]);
  const tdRpCat = useMemo(() => agrupar(crpRows, (x) => x._d.categoria, (x) => x.valor), [crpRows]);
  const tdRpContrato = useMemo(() => agrupar(crpRows, (x) => x._d.contratoCC, (x) => x.valor), [crpRows]);

  // Compromisos vs Ppto: CDP por código de rubro + categoría
  const compromisos = useMemo(() =>
    agrupar(cdps, (x) => `${x.codigoRubro || '—'} · ${x.categoria || ''}`, (x) => x.valor), [cdps]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Ranking titulo="CDP por Fuente de presupuesto" datos={tdCdpFuente} color="sky" />
        <Ranking titulo="RP por Fuente de presupuesto" datos={tdRpFuente} color="violet" />
        <Ranking titulo="CDP por Categoría" datos={tdCdpCat} color="sky" />
        <Ranking titulo="RP por Categoría" datos={tdRpCat} color="violet" />
        <Ranking titulo="CDP por Rubro (nombre)" datos={tdCdpRubro} color="emerald" />
        <Ranking titulo="RP por Contrato / Centro de costos" datos={tdRpContrato} color="amber" />
      </div>
      <Ranking titulo="Compromisos (CDP) por Código de rubro · Categoría" datos={compromisos} color="rose" limite={25} />
    </div>
  );
}

/* ============================================================================
   7. IMPORTAR / EXPORTAR EXCEL  (xlsx-js-style; fallback CSV en exportación)
   ============================================================================ */
const excelFechaISO = (v) => {
  if (v == null || v === '') return '';
  if (v instanceof Date) {
    return `${v.getFullYear()}-${String(v.getMonth() + 1).padStart(2, '0')}-${String(v.getDate()).padStart(2, '0')}`;
  }
  if (typeof v === 'number') { // serial de Excel
    const d = new Date(Math.round((v - 25569) * 86400 * 1000));
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  }
  const s = String(v).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)) { const [d, m, y] = s.split('/'); return `${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`; }
  return s;
};
// Lee una hoja como matriz de objetos por encabezado de la fila 1
const hojaAObjetos = (ws) => {
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, cellDates: true, defval: '' });
  if (!rows.length) return [];
  const head = rows[0].map((h) => String(h ?? '').trim());
  return rows.slice(1).filter((r) => r.some((c) => c !== '' && c != null)).map((r) => {
    const o = {}; head.forEach((h, i) => { o[h] = r[i]; }); return o;
  });
};
const pick = (o, ...keys) => { for (const k of keys) { if (o[k] !== undefined && o[k] !== '') return o[k]; } return ''; };

async function importarExcel(file, DB, push, recargar) {
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf, { cellDates: true });
  const hoja = (n) => wb.Sheets[wb.SheetNames.find((s) => s.trim().toUpperCase() === n)] || null;
  const wsCdp = hoja('CDP'); const wsCrp = hoja('CRP');
  if (!wsCdp && !wsCrp) { push('El Excel no tiene hojas CDP ni CRP', 'err'); return; }

  let nCdp = 0, nCrp = 0, provs = {};
  if (wsCdp) {
    const objs = hojaAObjetos(wsCdp);
    const regs = objs.map((o) => ({
      nCdp: String(pick(o, 'N CDP')).trim(),
      pos: toNum(pick(o, 'POS')) || 1,
      fechaCdp: excelFechaISO(pick(o, 'FECHA DE CDP')),
      nombreRubro: String(pick(o, 'NOMBRE DEL RUBRO')).trim(),
      categoria: String(pick(o, 'CATEGORIA')).trim(),
      cpc: String(pick(o, 'CPC')).trim(),
      codigoRubro: String(pick(o, 'CODIGO RUBRO')).trim(),
      valor: toNum(pick(o, 'VALOR')),
      descripcion: String(pick(o, 'DESCRIPCIÓN', 'DESCRIPCION')).trim(),
      fuente: String(pick(o, 'FUENTE PRESUPUESTO')).trim(),
      contratoCC: String(pick(o, 'N° CONTRATO/CENTRO DE COSTOS', 'N CONTRATO/CENTRO DE COSTOS')).trim(),
      solicitante: String(pick(o, 'Solicitante', 'SOLICITANTE')).trim()
    })).filter((r) => r.nCdp);
    await DB.guardarLote('cdp', regs); nCdp = regs.length;
  }
  if (wsCrp) {
    const objs = hojaAObjetos(wsCrp);
    const regs = objs.map((o) => {
      const nit = String(pick(o, 'NIT')).replace(/\D/g, '');
      const prov = String(pick(o, 'PROVEEDOR')).trim();
      if (nit && prov && prov !== 'Por favor revisar NIT') provs[nit] = prov;
      return {
        nRp: String(pick(o, 'N RP')).trim(),
        rp: String(pick(o, 'RP')).trim(),
        pos: toNum(pick(o, 'POS')) || 1,
        fechaRp: excelFechaISO(pick(o, 'FECHA RP')),
        valor: toNum(pick(o, 'VALOR')),
        nContrato: String(pick(o, 'N° CONTRATO', 'N CONTRATO')).trim(),
        nit,
        cdpRaw: String(pick(o, 'CDP')).trim(),
        descripcion: String(pick(o, 'DESCRIPCIÓN', 'DESCRIPCION')).trim(),
        solicitante: String(pick(o, 'Solicitante', 'SOLICITANTE')).trim(),
        op: String(pick(o, 'OP')).trim(),
        fechaEvento: excelFechaISO(pick(o, 'Fecha Evento', 'FECHA EVENTO')),
        proveedor: prov
      };
    }).filter((r) => r.nRp);
    await DB.guardarLote('crp', regs); nCrp = regs.length;
  }
  // Guardar catálogo de proveedores (reconstruye el PROVEEDOR que estaba roto con #REF)
  const provArr = Object.entries(provs).map(([nit, nombre]) => ({ nit, nombre }));
  if (provArr.length) await DB.guardarLote('proveedores', provArr);

  push(`Importado: ${nCdp} CDP, ${nCrp} RP, ${provArr.length} proveedores`, 'ok');
  recargar();
}

// --- Exportación a Excel (con todos los campos calculados resueltos) ---
function exportarExcel(cdps, crps, cdpIndex, provIndex, push) {
  try {
    if (!window.XLSX) throw new Error('XLSX no disponible');
    const wb = XLSX.utils.book_new();

    const cdpData = cdps.map((c) => ({
      'N CDP': c.nCdp, 'POS': c.pos, 'FECHA DE CDP': fmtFecha(c.fechaCdp),
      'NOMBRE DEL RUBRO': c.nombreRubro, 'CATEGORIA': c.categoria, 'CPC': c.cpc,
      'CODIGO RUBRO': c.codigoRubro, 'VALOR': toNum(c.valor),
      'ESTADO CDP': calcEstadoCdp(c.cpc), 'DESCRIPCIÓN': c.descripcion,
      'FUENTE PRESUPUESTO': c.fuente, 'N° CONTRATO/CENTRO DE COSTOS': c.contratoCC,
      'CATEGORIA_1': c.categoria, 'Solicitante': c.solicitante, 'CDP': calcCdpNum(c.nCdp)
    }));
    const crpData = crps.map((c) => {
      const d = resolverCRP(c, cdpIndex, provIndex);
      return {
        'N RP': c.nRp, 'RP': c.rp, 'POS': c.pos, 'FECHA RP': fmtFecha(c.fechaRp),
        'NOMBRE DEL RUBRO': d.nombreRubro, 'CODIGO RUBRO': d.codigoRubro, 'VALOR': toNum(c.valor),
        'ESTADO RP': d.estadoRp, 'N° CONTRATO': c.nContrato, 'PROVEEDOR': c.proveedor ?? d.proveedor,
        'NIT': c.nit, 'N CDP': d.nCdp, 'CPC': d.cpc, 'DESCRIPCIÓN': c.descripcion,
        'FUENTE PRESUPUESTO': d.fuente, 'N° CONTRATO/CENTRO DE COSTOS': d.contratoCC,
        'CATEGORIA': d.categoria, 'FECHA CDP': fmtFecha(d.fechaCdp), 'Solicitante': c.solicitante,
        'RP2': d.rp2, 'TIPO DE CONTRATO': d.tipoContrato, 'OP': c.op,
        'OP-Contrato Cliente': d.opContrato, 'Fecha Evento': fmtFecha(c.fechaEvento), 'CDP': c.cdpRaw
      };
    });
    // SALDOS CDP
    const valCdp = new Map(); cdps.forEach((c) => valCdp.set(c.nCdp, (valCdp.get(c.nCdp) || 0) + toNum(c.valor)));
    const valRp = new Map(); crps.forEach((r) => { const n = normalizarNCDP(r.cdpRaw); valRp.set(n, (valRp.get(n) || 0) + toNum(r.valor)); });
    const saldoData = [...valCdp.keys()].sort((a, b) => a.localeCompare(b, 'es', { numeric: true })).map((n) => {
      const d = valCdp.get(n) || 0, e = valRp.get(n) || 0;
      return { 'N CDP': n, 'VALOR CDP': d, 'VALOR RP': e, 'SALDO': d - e };
    });

    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cdpData), 'CDP');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(crpData), 'CRP');
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(saldoData), 'SALDOS CDP');
    XLSX.writeFile(wb, `CDP_CRP_2026_${hoyISO()}.xlsx`);
    push('Excel exportado', 'ok');
  } catch (e) {
    console.warn('Fallo Excel, uso CSV:', e);
    // Plan B: CSV de CDP
    const cab = ['N CDP', 'FECHA', 'CODIGO RUBRO', 'CATEGORIA', 'VALOR', 'FUENTE', 'CONTRATO/CC'];
    const filas = cdps.map((c) => [c.nCdp, fmtFecha(c.fechaCdp), c.codigoRubro, c.categoria, toNum(c.valor), c.fuente, c.contratoCC]);
    const csv = [cab, ...filas].map((r) => r.map((x) => `"${String(x ?? '').replace(/"/g, '""')}"`).join(';')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = `CDP_2026_${hoyISO()}.csv`; a.click();
    push('Excel no disponible: exportado CSV', 'warn');
  }
}

/* ============================================================================
   8. APP RAÍZ — estado global, pestañas, tema y barra de acciones
   ============================================================================ */
function App() {
  const push = useToast();
  const [tab, setTab] = useState('resumen');
  const [cdps, setCdps] = useState([]);
  const [crps, setCrps] = useState([]);
  const [provsArr, setProvsArr] = useState([]);
  const [editCdp, setEditCdp] = useState(undefined); // undefined=cerrado, null=nuevo, obj=editar
  const [editCrp, setEditCrp] = useState(undefined);
  const [confirm, setConfirm] = useState(null);
  const [dark, setDark] = useState(() => localStorage.getItem('tema') === 'dark');
  const fileRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('tema', dark ? 'dark' : 'light');
  }, [dark]);

  // Suscripción a datos (Firestore en vivo o lectura local)
  const recargar = useCallback(() => {
    DB.listar('cdp').then(setCdps);
    DB.listar('crp').then(setCrps);
    DB.listar('proveedores').then(setProvsArr);
  }, []);
  useEffect(() => {
    const u1 = DB.suscribir('cdp', setCdps);
    const u2 = DB.suscribir('crp', setCrps);
    const u3 = DB.suscribir('proveedores', setProvsArr);
    return () => { u1 && u1(); u2 && u2(); u3 && u3(); };
  }, []);

  // Índices para resolver fórmulas
  const cdpIndex = useMemo(() => { const m = {}; cdps.forEach((c) => { if (c.nCdp) m[c.nCdp] = c; }); return m; }, [cdps]);
  const provIndex = useMemo(() => {
    const m = {};
    provsArr.forEach((p) => { if (p.nit) m[String(p.nit).replace(/\D/g, '')] = p.nombre; });
    // también desde los propios CRP guardados
    crps.forEach((c) => { const n = String(c.nit ?? '').replace(/\D/g, ''); if (n && c.proveedor && c.proveedor !== 'Por favor revisar NIT') m[n] = c.proveedor; });
    return m;
  }, [provsArr, crps]);

  // Datalists globales (categorías, contratos, solicitantes) crecen con los datos
  const catalogos = useMemo(() => {
    const cats = new Set(), contr = new Set(), sol = new Set();
    cdps.forEach((c) => { if (c.categoria) cats.add(c.categoria); if (c.contratoCC) contr.add(c.contratoCC); if (c.solicitante) sol.add(c.solicitante); });
    crps.forEach((c) => { if (c.solicitante) sol.add(c.solicitante); });
    return { cats: [...cats].sort(), contr: [...contr].sort(), sol: [...sol].sort() };
  }, [cdps, crps]);

  // KPIs globales
  const kpi = useMemo(() => {
    const tCdp = cdps.reduce((s, c) => s + toNum(c.valor), 0);
    const tRp = crps.reduce((s, c) => s + toNum(c.valor), 0);
    const huerfanos = crps.filter((c) => !cdpIndex[normalizarNCDP(c.cdpRaw)]).length;
    return { tCdp, tRp, saldo: tCdp - tRp, huerfanos };
  }, [cdps, crps, cdpIndex]);

  /* ===== Persistencia ===== */
  const guardarCdp = async (r) => {
    await DB.guardar('cdp', r); push('CDP guardado', 'ok'); setEditCdp(undefined); recargar();
  };
  const guardarCrp = async (r) => {
    await DB.guardar('crp', r);
    // Upsert del proveedor al catálogo (reconstruye la relación NIT→Proveedor)
    const nit = String(r.nit ?? '').replace(/\D/g, '');
    if (nit && r.proveedor && r.proveedor !== 'Por favor revisar NIT' && !provIndex[nit]) {
      await DB.guardar('proveedores', { nit, nombre: r.proveedor });
    }
    push('RP guardado', 'ok'); setEditCrp(undefined); recargar();
  };
  const pedirEliminar = (col, reg, etiqueta) => setConfirm({
    titulo: `Eliminar ${etiqueta}`,
    mensaje: `¿Eliminar definitivamente "${etiqueta}"? Esta acción no se puede deshacer.`,
    accion: async () => { await DB.eliminar(col, reg._id); push(`${etiqueta} eliminado`, 'info'); setConfirm(null); recargar(); }
  });

  const Tab = ({ id, children, badge }) => (
    <button onClick={() => setTab(id)}
      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${tab === id
        ? 'bg-sky-600 text-white shadow' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
      {children}{badge != null && <span className="ml-1.5 text-xs opacity-80">({badge})</span>}
    </button>
  );

  return (
    <div className="min-h-screen">
      {/* Datalists compartidos */}
      <datalist id="dl-categorias">{catalogos.cats.map((x) => <option key={x} value={x} />)}</datalist>
      <datalist id="dl-contratos">{catalogos.contr.map((x) => <option key={x} value={x} />)}</datalist>
      <datalist id="dl-solic">{catalogos.sol.map((x) => <option key={x} value={x} />)}</datalist>

      {/* Encabezado */}
      <header className="bg-gradient-to-r from-sky-700 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl font-bold leading-tight">Registro y Análisis Presupuestal · CDP &amp; CRP 2026</h1>
            <p className="text-sky-100 text-sm">ACTIVA — Empresa de Parques y Eventos de Antioquia
              <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded">{DB.modo === 'firestore' ? 'Nube (Firestore)' : 'Local (este equipo)'}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input ref={fileRef} type="file" accept=".xlsx,.xls" className="hidden"
              onChange={(e) => { const f = e.target.files[0]; if (f) importarExcel(f, DB, push, recargar).catch((err) => push('Error al importar: ' + err.message, 'err')); e.target.value = ''; }} />
            <button onClick={() => fileRef.current?.click()} className="px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-sm">Importar Excel</button>
            <button onClick={() => exportarExcel(cdps, crps, cdpIndex, provIndex, push)} className="px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-sm">Exportar Excel</button>
            <button onClick={() => setDark((d) => !d)} className="px-3 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-sm">{dark ? '☀' : '🌙'}</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-5 space-y-5">
        {/* Pestañas */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Tab id="resumen">Resumen</Tab>
          <Tab id="cdp" badge={cdps.length}>CDP</Tab>
          <Tab id="crp" badge={crps.length}>CRP</Tab>
          <Tab id="saldos">Saldos CDP</Tab>
          <Tab id="analisis">Análisis</Tab>
        </div>

        {/* RESUMEN */}
        {tab === 'resumen' && (
          <div className="space-y-4 fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Kpi titulo="Total CDP" valor={fmtCOP(kpi.tCdp)} sub={`${cdps.length} registros`} color="sky" />
              <Kpi titulo="Total RP (comprometido)" valor={fmtCOP(kpi.tRp)} sub={`${crps.length} registros`} color="violet" />
              <Kpi titulo="Saldo disponible" valor={fmtCOP(kpi.saldo)} color={kpi.saldo < 0 ? 'rose' : 'emerald'} />
              <Kpi titulo="% Ejecución" valor={`${kpi.tCdp ? fmtNum((kpi.tRp / kpi.tCdp) * 100) : 0}%`} color="amber" />
            </div>
            {kpi.huerfanos > 0 && (
              <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 rounded-lg px-4 py-3 text-sm">
                ⚠ Hay <b>{kpi.huerfanos}</b> RP cuyo CDP no existe en la hoja CDP. Revísalos en la pestaña CRP (columna N CDP en ámbar).
              </div>
            )}
            <Analisis cdps={cdps} crps={crps} cdpIndex={cdpIndex} provIndex={provIndex} />
          </div>
        )}

        {/* CDP */}
        {tab === 'cdp' && (
          <div className="space-y-4 fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Certificados de Disponibilidad Presupuestal</h2>
              {editCdp === undefined && <button onClick={() => setEditCdp(null)} className="px-4 py-2 rounded-lg bg-sky-600 text-white text-sm hover:bg-sky-700">+ Nuevo CDP</button>}
            </div>
            {editCdp !== undefined && <FormularioCDP registro={editCdp} rubros={RUBROS_DEFAULT} onGuardar={guardarCdp} onCancelar={() => setEditCdp(undefined)} />}
            <TablaCDP cdps={cdps} onEditar={(c) => setEditCdp(c)} onEliminar={(c) => pedirEliminar('cdp', c, c.nCdp)} />
          </div>
        )}

        {/* CRP */}
        {tab === 'crp' && (
          <div className="space-y-4 fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Registros Presupuestales (compromisos)</h2>
              {editCrp === undefined && <button onClick={() => setEditCrp(null)} className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm hover:bg-violet-700">+ Nuevo RP</button>}
            </div>
            {editCrp !== undefined && <FormularioCRP registro={editCrp} cdps={cdps} cdpIndex={cdpIndex} provIndex={provIndex} onGuardar={guardarCrp} onCancelar={() => setEditCrp(undefined)} />}
            <TablaCRP crps={crps} cdpIndex={cdpIndex} provIndex={provIndex} onEditar={(c) => setEditCrp(c)} onEliminar={(c) => pedirEliminar('crp', c, c.nRp)} />
          </div>
        )}

        {tab === 'saldos' && <div className="fade-in"><SaldosCDP cdps={cdps} crps={crps} cdpIndex={cdpIndex} provIndex={provIndex} /></div>}
        {tab === 'analisis' && <div className="fade-in"><Analisis cdps={cdps} crps={crps} cdpIndex={cdpIndex} provIndex={provIndex} /></div>}

        <footer className="text-center text-xs text-slate-400 pt-4 pb-8">
          Fórmulas replicadas del Excel y recalculadas automáticamente · Localización es-CO ·
          {DB.modo === 'local' ? ' Datos en este navegador (localStorage). Configura Firebase para sincronizar en la nube.' : ' Sincronizado con Firestore.'}
        </footer>
      </main>

      <Confirm abierto={!!confirm} titulo={confirm?.titulo} mensaje={confirm?.mensaje}
        onSi={() => confirm?.accion()} onNo={() => setConfirm(null)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastHost><App /></ToastHost>
);
