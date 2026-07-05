import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://www.enpesos.cl';
const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

const routes = [
  {
    path: '/',
    title: 'EnPesos.cl | Más pesos en tu cuenta',
    description: 'EnPesos te ayuda a cotizar cupo internacional disponible de tarjeta de crédito para evaluar pesos chilenos por WhatsApp, sin préstamos ni claves bancarias.',
    h1: 'Más pesos en tu cuenta con una cotización clara por WhatsApp',
    category: 'Inicio',
    intro: 'EnPesos es una alternativa para personas que tienen tarjeta de crédito con cupo internacional disponible y quieren evaluar cuánto podrían recibir en pesos chilenos antes de tomar una decisión.',
    points: ['Cotización previa antes de avanzar', 'Atención humana por WhatsApp', 'No pedimos claves bancarias', 'No es préstamo ni crédito de consumo'],
  },
  {
    path: '/que-es-enpesos',
    title: 'Qué es EnPesos | Cupo internacional a pesos chilenos',
    description: 'Conoce qué hace EnPesos, cómo funciona la cotización por WhatsApp y por qué no es un préstamo, crédito ni avance bancario.',
    h1: 'Qué es EnPesos y cómo funciona la cotización de cupo internacional',
    category: 'Funcionamiento',
    intro: 'EnPesos ayuda a evaluar una operación usando cupo internacional disponible de una tarjeta de crédito para recibir una cotización en pesos chilenos. La decisión de avanzar se toma solo después de revisar condiciones.',
    points: ['Evalúas tu cupo disponible', 'Recibes una cotización previa', 'Revisas costos y condiciones', 'Decides si avanzar o no'],
  },
  {
    path: '/guias',
    title: 'Guías EnPesos | Cupo internacional, financiamiento y liquidez',
    description: 'Guías para entender cupo internacional, financiamiento para personas, liquidez para negocios, seguridad, costos y alternativas antes de cotizar.',
    h1: 'Guías EnPesos para comparar antes de cotizar',
    category: 'Guías',
    intro: 'La sección de guías reúne contenidos comerciales y educativos para entender alternativas de liquidez, financiamiento, cupo en dólares, bancos, tarjetas, seguridad y costos antes de solicitar una cotización.',
    points: ['Cupo en dólares a pesos', 'Financiamiento para personas', 'Financiamiento para negocios', 'Seguridad y costos antes de operar'],
  },
  {
    path: '/cupo-en-dolares-a-pesos-chilenos',
    title: 'Cupo en dólares a pesos chilenos | Cotiza por WhatsApp | EnPesos.cl',
    description: 'Cotiza tu cupo en dólares o cupo internacional disponible a pesos chilenos por WhatsApp, con atención humana, costos claros y sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos con cotización previa',
    category: 'Cupo en dólares',
    intro: 'Si tienes una tarjeta de crédito con cupo internacional disponible, puedes solicitar una cotización para evaluar cuánto podrías recibir en pesos chilenos. EnPesos no entrega préstamos, no aumenta cupos y no pide claves bancarias.',
    points: ['No es préstamo, crédito ni avance bancario', 'Usa cupo internacional ya disponible', 'Cotización antes de decidir', 'Atención por WhatsApp'],
  },
  {
    path: '/formas-de-financiamiento-para-personas-chile',
    title: 'Formas de financiamiento para personas en Chile | EnPesos.cl',
    description: 'Compara formas de financiamiento para personas en Chile: crédito de consumo, avance, línea de crédito, tarjeta, refinanciamiento y cupo en dólares.',
    h1: 'Formas de financiamiento para personas en Chile',
    category: 'Financiamiento personal',
    intro: 'Cuando una persona necesita liquidez, puede comparar crédito de consumo, avance, línea de crédito, refinanciamiento, venta de activos, apoyo familiar y cupo internacional disponible. La mejor opción depende del monto, urgencia, costo y capacidad de pago.',
    points: ['Crédito de consumo', 'Avance en efectivo', 'Línea de crédito', 'Cupo en dólares como alternativa a cotizar'],
  },
  {
    path: '/financiamiento-para-negocios-y-pymes-chile',
    title: 'Financiamiento para negocios y pymes en Chile | EnPesos.cl',
    description: 'Compara financiamiento para negocios y pymes: crédito comercial, factoring, línea de crédito, proveedores, subsidios y cupo internacional disponible.',
    h1: 'Financiamiento para negocios y pymes en Chile',
    category: 'Financiamiento negocios',
    intro: 'Un negocio puede necesitar caja para inventario, proveedores, pagos urgentes, capital de trabajo o desfases entre cobros y pagos. Esta guía compara alternativas y muestra cuándo puede hacer sentido cotizar cupo internacional disponible.',
    points: ['Crédito comercial', 'Factoring', 'Línea de crédito empresa', 'Cupo internacional para liquidez puntual'],
  },
  {
    path: '/es-seguro-cambiar-cupo-en-dolares-a-pesos',
    title: '¿Es seguro cambiar cupo en dólares a pesos? | EnPesos.cl',
    description: 'Sí es seguro cambiar cupo en dólares a pesos si hay cotización previa, titularidad validada, costos claros y no compartes claves bancarias.',
    h1: '¿Es seguro cambiar cupo en dólares a pesos?',
    category: 'Seguridad',
    intro: 'Cambiar o cotizar cupo en dólares puede ser seguro cuando el proceso se hace por canales oficiales, con costos claros, validación de titularidad y sin entregar claves bancarias, token, coordenadas ni acceso remoto.',
    points: ['No entregues claves bancarias', 'Pide cotización previa', 'Revisa titularidad y condiciones', 'Evita ofertas poco claras'],
  },
  {
    path: '/bancos-y-tarjetas-cupo-en-dolares',
    title: 'Bancos y tarjetas con cupo en dólares | EnPesos.cl',
    description: 'Revisa qué considerar según banco, emisor o marca de tarjeta antes de cotizar cupo en dólares a pesos chilenos por WhatsApp.',
    h1: 'Cupo en dólares según banco o tarjeta',
    category: 'Bancos y tarjetas',
    intro: 'El banco, emisor o marca de tarjeta puede influir en la evaluación de una cotización. EnPesos no representa a bancos ni marcas, y revisa caso a caso según cupo internacional disponible y condiciones informadas.',
    points: ['Banco o emisor', 'Marca de tarjeta', 'Cupo internacional disponible', 'Monto y condiciones del caso'],
  },
  {
    path: '/cuanto-recibo-por-mi-cupo-en-dolares',
    title: 'Cuánto recibo por mi cupo en dólares | EnPesos.cl',
    description: 'Conoce qué factores influyen en el monto que podrías recibir en pesos al cotizar tu cupo en dólares o cupo internacional disponible.',
    h1: 'Cuánto recibo por mi cupo en dólares',
    category: 'Costos',
    intro: 'El monto final depende del monto en dólares, banco, tipo de tarjeta, costos, dólar de referencia y condiciones del caso. Por eso conviene cotizar antes de decidir y no confiar en una cifra genérica.',
    points: ['Monto en dólares', 'Tipo de tarjeta', 'Dólar de referencia', 'Costos y condiciones antes de avanzar'],
  },
  {
    path: '/vender-cupo-en-dolares-chile',
    title: 'Vender cupo en dólares en Chile | Cómo funciona | EnPesos.cl',
    description: 'Guía para entender qué significa vender o cotizar cupo en dólares en Chile, qué revisar y cómo evitar riesgos antes de avanzar.',
    h1: 'Vender cupo en dólares en Chile: cómo funciona y qué revisar',
    category: 'Funcionamiento',
    intro: 'La expresión vender cupo en dólares suele usarse para describir una operación donde una persona evalúa su cupo internacional disponible para recibir pesos chilenos. Lo responsable es revisar condiciones, costos y seguridad antes de avanzar.',
    points: ['Cotización previa', 'Cupo internacional disponible', 'Sin claves bancarias', 'Decisión informada'],
  },
  {
    path: '/liquidez-para-negocios-cupo-internacional',
    title: 'Liquidez para negocios con cupo internacional | EnPesos.cl',
    description: 'Evalúa cupo internacional disponible como alternativa de liquidez puntual para negocios, proveedores, inventario o desfases de caja.',
    h1: 'Liquidez para negocios con cupo internacional disponible',
    category: 'Negocios',
    intro: 'Algunos negocios necesitan caja puntual para inventario, proveedores o desfases de pago. Si el dueño o empresa cuenta con cupo internacional disponible, puede cotizar una alternativa antes de solicitar un crédito comercial nuevo.',
    points: ['Capital de trabajo puntual', 'Proveedores', 'Inventario', 'Cotización antes de decidir'],
  },
  {
    path: '/avance-cupo-en-dolares-online',
    title: 'Avance cupo en dólares online | Alternativas y costos | EnPesos.cl',
    description: 'Compara avance de cupo en dólares online con otras alternativas y revisa qué considerar antes de usar tu tarjeta de crédito.',
    h1: 'Avance cupo en dólares online: qué revisar antes de decidir',
    category: 'Alternativas',
    intro: 'Antes de usar un avance o una alternativa relacionada con cupo en dólares, conviene entender costos, forma de pago posterior, condiciones de la tarjeta y si existen opciones más claras para cotizar.',
    points: ['Revisa costo total', 'Compara monto neto', 'No entregues claves', 'Cotiza antes de avanzar'],
  },
  {
    path: '/como-pagar-deuda-en-dolares-tarjeta-credito',
    title: 'Cómo pagar deuda en dólares de tarjeta de crédito | EnPesos.cl',
    description: 'Guía para entender cómo revisar deuda en dólares de tarjeta de crédito, alternativas de pago y qué considerar antes de usar cupo disponible.',
    h1: 'Cómo pagar deuda en dólares de tarjeta de crédito',
    category: 'Tarjeta de crédito',
    intro: 'Las deudas en dólares de tarjeta pueden variar por tipo de cambio, fecha de facturación y condiciones del banco. Antes de tomar una decisión, conviene revisar monto, fecha de pago, costos y alternativas disponibles.',
    points: ['Revisa estado de cuenta', 'Considera tipo de cambio', 'Compara alternativas', 'Evita decisiones apuradas'],
  },
  {
    path: '/simulador-pago-tarjeta-credito',
    title: 'Simulador de pago de tarjeta de crédito | EnPesos.cl',
    description: 'Simula escenarios de pago de tarjeta de crédito y revisa cómo una cotización puede ayudarte a comparar opciones antes de decidir.',
    h1: 'Simulador de pago de tarjeta de crédito',
    category: 'Herramientas',
    intro: 'Simular pagos ayuda a entender cuotas, costos, monto total y capacidad de pago. EnPesos complementa esa evaluación permitiendo cotizar cupo internacional disponible cuando corresponde.',
    points: ['Compara cuotas', 'Evalúa capacidad de pago', 'Revisa costo total', 'Cotiza antes de decidir'],
  },
  {
    path: '/programa-de-colaboradores',
    title: 'Programa de colaboradores EnPesos | Referidos y alianzas',
    description: 'Conoce el programa de colaboradores de EnPesos para referidores, creadoras, asesoras y aliados que quieran derivar personas con cupo internacional disponible.',
    h1: 'Programa de colaboradores EnPesos',
    category: 'Colaboradores',
    intro: 'El programa de colaboradores está pensado para personas que conversan con clientes que podrían necesitar liquidez y cuentan con tarjeta de crédito con cupo internacional disponible.',
    points: ['Comisión por operación cerrada', 'Sin exclusividad', 'Proceso explicado por WhatsApp', 'Enfoque en personas con cupo disponible'],
  },
];

const cityRoutes = [
  ['santiago', 'Santiago', 'Región Metropolitana'],
  ['las-condes', 'Las Condes', 'Región Metropolitana'],
  ['providencia', 'Providencia', 'Región Metropolitana'],
  ['concepcion', 'Concepción', 'Región del Biobío'],
  ['antofagasta', 'Antofagasta', 'Región de Antofagasta'],
];

for (const [slug, city, region] of cityRoutes) {
  routes.push({
    path: `/cupo-en-dolares-${slug}`,
    title: `Cupo en dólares en ${city} | Cotiza por WhatsApp | EnPesos.cl`,
    description: `Cotiza cupo en dólares en ${city}. Atención remota por WhatsApp para evaluar cupo internacional a pesos chilenos, sin claves bancarias y sin obligación de operar.`,
    h1: `Cupo en dólares en ${city}: cotiza a pesos chilenos por WhatsApp`,
    category: `Cobertura ${region}`,
    intro: `Si estás en ${city} y tienes tarjeta de crédito con cupo internacional disponible, puedes solicitar una cotización remota para evaluar cuánto podrías recibir en pesos chilenos antes de decidir.`,
    points: ['Atención remota por WhatsApp', 'Cotización previa', 'Sin claves bancarias', `Referencia para personas en ${city}`],
  });
}

const bankRoutes = [
  ['banco-estado', 'BancoEstado', 'Banco'],
  ['santander', 'Santander', 'Banco'],
  ['banco-de-chile', 'Banco de Chile', 'Banco'],
  ['bci', 'BCI', 'Banco'],
  ['scotiabank', 'Scotiabank', 'Banco'],
  ['itau', 'Itaú', 'Banco'],
  ['cmr-falabella', 'CMR Falabella', 'Emisor retail'],
  ['tarjeta-visa', 'Visa', 'Marca de tarjeta'],
  ['tarjeta-mastercard', 'Mastercard', 'Marca de tarjeta'],
];

for (const [slug, name, category] of bankRoutes) {
  routes.push({
    path: `/cupo-en-dolares-${slug}`,
    title: `Cupo en dólares ${name} | Cotiza por WhatsApp | EnPesos.cl`,
    description: `Cotiza cupo en dólares ${name} a pesos chilenos por WhatsApp. Revisión caso a caso, sin claves bancarias y sin relación oficial con bancos o marcas de tarjeta.`,
    h1: `Cupo en dólares ${name}: cotiza a pesos chilenos por WhatsApp`,
    category,
    intro: `Si tienes una tarjeta ${name} con cupo internacional disponible, puedes solicitar una cotización asistida por WhatsApp. EnPesos no representa a ${name}; la revisión depende del caso, monto, cupo disponible y condiciones informadas.`,
    points: [`Tarjeta o emisor ${name}`, 'Cupo internacional disponible', 'Cotización antes de avanzar', 'Sin claves bancarias ni acceso remoto'],
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildStaticContent(route) {
  const safeTitle = escapeHtml(route.h1);
  const safeDescription = escapeHtml(route.description);
  const safeIntro = escapeHtml(route.intro);
  const points = route.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('\n');

  return `
    <main class="seo-prerender-content" data-seo-prerender="true">
      <article>
        <p>${escapeHtml(route.category)}</p>
        <h1>${safeTitle}</h1>
        <p>${safeIntro}</p>
        <p>${safeDescription}</p>
        <section>
          <h2>Qué puedes revisar antes de cotizar</h2>
          <ul>
            ${points}
          </ul>
        </section>
        <section>
          <h2>Información importante sobre EnPesos</h2>
          <p>EnPesos entrega una cotización asistida por WhatsApp para personas que cuentan con cupo internacional disponible. No entrega préstamos, no aumenta líneas de crédito, no representa bancos y no solicita claves bancarias, token, coordenadas ni acceso remoto.</p>
          <p>Antes de avanzar, conviene revisar el monto estimado en pesos chilenos, los costos asociados, las condiciones del caso y la forma en que se pagará posteriormente la tarjeta de crédito. Cotizar no obliga a operar.</p>
        </section>
      </article>
    </main>`;
}

function injectHead(html, route) {
  const canonical = `${siteUrl}${route.path === '/' ? '' : route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i, `<meta name="description" content="${description}" />`);

  output = output.replace(/<link\s+rel="canonical"[\s\S]*?>\s*/gi, '');
  output = output.replace(/<meta\s+property="og:[\s\S]*?>\s*/gi, '');
  output = output.replace(/<meta\s+name="twitter:[\s\S]*?>\s*/gi, '');

  const extraHead = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:site_name" content="EnPesos.cl" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: route.title,
      description: route.description,
      url: canonical,
      isPartOf: {
        '@type': 'WebSite',
        name: 'EnPesos.cl',
        url: siteUrl,
      },
    })}</script>`;

  return output.replace('</head>', `${extraHead}\n  </head>`);
}

function injectBody(html, route) {
  return html.replace('<div id="root"></div>', `<div id="root">${buildStaticContent(route)}\n    </div>`);
}

async function writeRouteHtml(template, route) {
  const html = injectBody(injectHead(template, route), route);

  if (route.path === '/') {
    await writeFile(path.join(distDir, 'index.html'), html, 'utf8');
    return;
  }

  const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html, 'utf8');
}

const template = await readFile(templatePath, 'utf8');

for (const route of routes) {
  await writeRouteHtml(template, route);
}

console.log(`Generated static SEO HTML for ${routes.length} routes.`);
