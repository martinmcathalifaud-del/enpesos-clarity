import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const siteUrl = 'https://www.enpesos.cl';
const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

const routes = [
  {
    path: '/',
    title: 'Cupo en dólares a pesos chilenos | EnPesos.cl',
    description: 'Cotiza tu cupo en dólares de la tarjeta, revisa cuántos pesos chilenos podrías recibir y decide con costo claro, proceso asistido y sin claves bancarias.',
    h1: 'Convierte el cupo en dólares de tu tarjeta en pesos chilenos',
    category: 'Inicio',
    intro: 'Primero cotizas cuánto podrías recibir en pesos chilenos. Si decides avanzar, se realiza una operación asistida con tu tarjeta y recibes una transferencia en tu cuenta.',
    points: ['Cotización previa antes de decidir', 'Pesos chilenos en tu cuenta si avanzas y la operación se confirma', 'Sin claves bancarias ni CVV por WhatsApp', 'Puede generarse un cargo o deuda en tu tarjeta'],
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
    path: '/como-funciona',
    title: 'Como funciona EnPesos | Cupo en dolares a pesos chilenos',
    description: 'Conoce como EnPesos te ayuda a cotizar tu cupo en dolares de la tarjeta, ver cuantos pesos podrias recibir y entender el cargo posterior antes de decidir.',
    h1: 'Como funciona EnPesos: cotizas primero y decides despues',
    category: 'Proceso',
    intro: 'Si tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuantos pesos chilenos podrias recibir usando ese cupo. Si decides avanzar, se realiza una operacion asistida con tu tarjeta y recibes una transferencia en pesos en tu cuenta.',
    points: ['Indicas el monto que quieres cotizar', 'Recibes una cotizacion previa', 'Revisas costo y condiciones', 'Puede generarse un cargo o deuda en tu tarjeta'],
  },
  {
    path: '/preguntas-frecuentes',
    title: 'Preguntas frecuentes EnPesos | Cupo en dolares a pesos',
    description: 'Resuelve dudas sobre EnPesos: cotizacion, costos, seguridad, datos que no pedimos, deuda posterior en la tarjeta y diferencias con prestamos o avances.',
    h1: 'Preguntas frecuentes sobre EnPesos',
    category: 'Preguntas frecuentes',
    intro: 'Resuelve dudas sobre cotizacion, costos, seguridad, datos que no pedimos, transferencia en pesos y cargo o deuda posterior en tu tarjeta.',
    points: ['Que es y que no es EnPesos', 'Costos y cotizacion', 'Seguridad y datos', 'Tarjeta, banco y deuda'],
  },
  {
    path: '/seguridad',
    title: 'Seguridad EnPesos | Datos que no pedimos y proceso claro',
    description: 'Conoce las reglas de seguridad de EnPesos. No pedimos claves bancarias ni CVV por WhatsApp. Revisa datos, titularidad y costos antes de decidir.',
    h1: 'Seguridad en EnPesos: cotiza sin entregar claves bancarias',
    category: 'Seguridad',
    intro: 'Antes de avanzar debes ver cuanto podrias recibir en pesos, el costo y las condiciones. EnPesos no pide claves bancarias ni CVV por WhatsApp.',
    points: ['No pedimos claves bancarias', 'No pedimos CVV por WhatsApp', 'Usa canales enlazados desde enpesos.cl y redes oficiales', 'Si algo no puede completarse, se detiene el proceso'],
  },
  {
    path: '/nosotros',
    title: 'Nosotros | EnPesos.cl',
    description: 'Conoce EnPesos, un servicio chileno que te ayuda a cotizar tu cupo en dolares a pesos chilenos con atencion humana, claridad y sin claves bancarias.',
    h1: 'Quienes somos y como trabajamos en EnPesos',
    category: 'Nosotros',
    intro: 'EnPesos es un servicio chileno que ayuda a cotizar cuantos pesos chilenos podrias recibir usando el cupo en dolares de tu tarjeta, con atencion humana, costo claro antes de decidir y sin claves bancarias.',
    points: ['Atencion humana', 'Cotizacion previa', 'No somos banco ni casa de cambio', 'No entregamos prestamos ni creditos'],
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
    description: 'Compara crédito de consumo, avance en efectivo, tarjeta de crédito y cupo internacional disponible antes de decidir. Revisa costo total, plazo, condiciones y deuda posterior.',
    h1: 'Formas de financiamiento para personas: crédito, avance, tarjeta y cupo en dólares',
    category: 'Financiamiento personal',
    intro: 'Si necesitas pesos chilenos, conviene comparar antes de decidir. Un crédito de consumo, un avance en efectivo, usar la tarjeta de crédito o cotizar cupo internacional disponible tienen costos, plazos y consecuencias distintas.',
    points: ['Crédito de consumo, avance en efectivo, tarjeta y cupo internacional disponible', 'Comparar costo total, plazo, banco o emisor y capacidad de pago', 'Revisar condiciones antes de aceptar cualquier alternativa', 'El cupo internacional puede generar un cargo o deuda posterior en la tarjeta'],
  },
  {
    path: '/financiamiento-para-negocios-y-pymes-chile',
    title: 'Financiamiento para negocios y pymes en Chile | EnPesos.cl',
    description: 'Compara financiamiento para negocios y pymes: crédito comercial, factoring, línea de crédito, proveedores, subsidios y cupo internacional disponible.',
    h1: 'Financiamiento para negocios y pymes en Chile',
    category: 'Financiamiento negocios',
    intro: 'Un negocio puede necesitar caja para inventario, proveedores o desfases de pago. Esta guía compara alternativas y muestra cuándo puede hacer sentido cotizar cupo internacional disponible.',
    points: ['Crédito comercial', 'Factoring', 'Línea de crédito empresa', 'Cupo internacional para caja puntual'],
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
    description: 'Entiende qué factores influyen en cuánto podrías recibir por tu cupo en dólares: monto, dólar referencial, costos, comisión, condiciones y deuda posterior.',
    h1: 'Cuánto recibo por mi cupo en dólares',
    category: 'Costos y monto neto',
    intro: 'No hay un monto automático exacto sin cotización. El neto que podrías recibir en pesos depende del monto, dólar referencial, costos, comisión si corresponde, condiciones del caso y momento de confirmación.',
    points: ['Monto en dólares que quieres cotizar', 'Dólar referencial del momento', 'Costos, comisión si corresponde y condiciones del caso', 'Una calculadora automática puede ser solo referencial', 'Puede generarse cargo o deuda posterior en la tarjeta'],
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
    intro: 'Algunos negocios necesitan caja para inventario, proveedores o desfases de pago. Si el dueño o empresa cuenta con cupo internacional disponible, puede cotizar una alternativa antes de solicitar un crédito comercial nuevo.',
    points: ['Capital de trabajo puntual', 'Proveedores', 'Inventario', 'Cotización antes de decidir'],
  },
  {
    path: '/avance-cupo-en-dolares-online',
    title: 'Avance cupo en dólares online: qué significa | EnPesos.cl',
    description: 'Compara avance en efectivo, avance bancario y cupo en dólares disponible. EnPesos no es préstamo ni crédito; cotiza primero y revisa condiciones.',
    h1: 'Avance cupo en dólares online: avance en efectivo vs cupo en dólares',
    category: 'Alternativas',
    intro: 'Un avance en efectivo es un producto del banco o emisor. Usar cupo internacional disponible es distinto: puedes cotizar cuánto recibirías en pesos, revisar costo y condiciones, y decidir después.',
    points: ['Diferencia entre avance bancario, avance con tarjeta y cupo internacional', 'EnPesos no es un avance bancario tradicional', 'Compara monto neto, costo total, plazo y condiciones', 'Puede generarse cargo o deuda posterior en la tarjeta'],
  },
  {
    path: '/como-pagar-deuda-en-dolares-tarjeta-credito',
    title: 'Cómo pagar la deuda en dólares de la tarjeta | EnPesos.cl',
    description: 'Entiende qué pasa después de usar cupo internacional: cargo o deuda en tarjeta, facturación, tipo de cambio del banco, pago mínimo, intereses y condiciones del emisor.',
    h1: 'Qué pasa con la deuda de la tarjeta después de usar cupo en dólares',
    category: 'Deuda posterior',
    intro: 'Antes de cotizar, mira la operación completa: cuánto podrías recibir en pesos y qué cargo o deuda puede quedar después en tu tarjeta de crédito.',
    points: ['Puede generarse un cargo o deuda posterior', 'El pago depende del banco o emisor', 'Revisa facturación, tipo de cambio, pago mínimo e intereses', 'EnPesos no define condiciones bancarias'],
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
  {
    slug: 'santiago',
    city: 'Santiago',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Santiago | Cotiza a pesos chilenos',
    description: 'Cotiza desde Santiago cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Santiago',
  },
  {
    slug: 'las-condes',
    city: 'Las Condes',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Las Condes | Cotiza a pesos chilenos',
    description: 'Cotiza desde Las Condes cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Las Condes',
  },
  {
    slug: 'providencia',
    city: 'Providencia',
    region: 'Región Metropolitana',
    title: 'Cupo en dólares desde Providencia | Cotiza a pesos chilenos',
    description: 'Cotiza desde Providencia cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Providencia',
  },
  {
    slug: 'concepcion',
    city: 'Concepción',
    region: 'Región del Biobío',
    title: 'Cupo en dólares desde Concepción | Cotiza a pesos chilenos',
    description: 'Cotiza desde Concepción cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Concepción',
  },
  {
    slug: 'antofagasta',
    city: 'Antofagasta',
    region: 'Región de Antofagasta',
    title: 'Cupo en dólares desde Antofagasta | Cotiza a pesos chilenos',
    description: 'Cotiza desde Antofagasta cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. No somos casa de cambio ni pedimos claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Antofagasta',
  },
  {
    slug: 'valparaiso',
    city: 'Valparaíso',
    region: 'Región de Valparaíso',
    title: 'Cupo en dólares desde Valparaíso | Cotiza a pesos chilenos',
    description: 'Cotiza desde Valparaíso cuántos pesos chilenos podrías recibir usando cupo internacional disponible de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Valparaíso',
  },
  {
    slug: 'rancagua',
    city: 'Rancagua',
    region: "Región de O'Higgins",
    title: 'Cupo en dólares desde Rancagua | Cotiza a pesos chilenos',
    description: 'Desde Rancagua, cotiza cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Con costo claro antes de decidir.',
    h1: 'Cupo en dólares a pesos chilenos desde Rancagua',
  },
];

for (const route of cityRoutes) {
  routes.push({
    path: `/cupo-en-dolares-${route.slug}`,
    title: route.title,
    description: route.description,
    h1: route.h1,
    category: `Cobertura ${route.region}`,
    intro: `Si estás en ${route.city} y tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir usando ese cupo. Primero ves monto estimado, costo y condiciones antes de decidir.`,
    points: [
      `Cotización de cupo en dólares desde ${route.city}`,
      'Pesos chilenos en tu cuenta si avanzas y la operación se confirma',
      'Sin claves bancarias, token, acceso remoto ni CVV por WhatsApp',
      'EnPesos no es una casa de cambio ni declara oficina local documentada',
      'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta',
    ],
    city: route.city,
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
  const cityContent = route.city
    ? `
        <section>
          <h2>No somos casa de cambio ni oficina local</h2>
          <p>EnPesos no es una casa de cambio, no compra ni vende divisas como actividad cambiaria y no declara una oficina física local si no está documentada. Puedes cotizar desde ${escapeHtml(route.city)} por los canales oficiales enlazados desde enpesos.cl.</p>
        </section>
        <section>
          <h2>Cargo o deuda posterior en tu tarjeta</h2>
          <p>Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.</p>
        </section>`
    : '';

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
        ${cityContent}
        <section>
          <h2>Información importante sobre EnPesos</h2>
          <p>EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir usando cupo internacional disponible o cupo en dólares de tu tarjeta. Cotizar no obliga a avanzar.</p>
          <p>Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. EnPesos no entrega préstamos, no aumenta líneas de crédito, no representa bancos y no solicita claves bancarias, token, coordenadas ni acceso remoto.</p>
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
