import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  WalletCards,
  XCircle,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const WHATSAPP_MESSAGES = {
  hero: 'Hola, tengo un negocio/empresa y quiero cotizar una alternativa usando cupo internacional disponible.',
  caja: 'Hola, necesito revisar una necesidad puntual de caja para mi negocio y quiero cotizar con cupo internacional disponible.',
  seguridad: 'Hola, quiero cotizar para mi negocio. Vi que no piden claves bancarias y quiero entender el proceso.',
  final: 'Hola, quiero revisar mi caso como negocio y recibir una cotización antes de decidir.',
};

const cashNeeds = [
  'Pago puntual a proveedores',
  'Desfase temporal entre ventas y cobros',
  'Reposición de inventario o mercadería',
  'Gastos operativos de corto plazo',
  'Caja para cumplir un compromiso cercano',
  'Capital de trabajo puntual, no deuda de largo plazo',
];

const steps = [
  {
    title: 'Nos cuentas tu necesidad de caja',
    description: 'Puede ser un pago a proveedor, reposición de stock, desfase de flujo o una urgencia operativa de corto plazo.',
  },
  {
    title: 'Revisamos cupo internacional disponible',
    description: 'Evaluamos datos básicos de tu tarjeta y banco para ver si tiene sentido preparar una cotización. No pedimos claves bancarias.',
  },
  {
    title: 'Recibes una cotización clara',
    description: 'Te informamos monto estimado en pesos, costos considerados, condiciones y pasos antes de que decidas avanzar.',
  },
  {
    title: 'Decides si te conviene',
    description: 'Cotizar no te obliga a operar. Solo si aceptas la cotización, coordinamos el proceso por WhatsApp.',
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Sin claves bancarias',
    description: 'Nunca pedimos claves de banco, contraseñas, token de acceso ni control remoto de tus dispositivos.',
  },
  {
    icon: FileText,
    title: 'Costos antes de decidir',
    description: 'La cotización debe mostrar monto estimado, costos y condiciones para que puedas evaluar si conviene a tu negocio.',
  },
  {
    icon: MessageCircle,
    title: 'Atención humana por WhatsApp',
    description: 'Una persona te guía y responde dudas. No es un formulario frío ni una promesa automática de aprobación.',
  },
];

const businessTypes = [
  {
    title: 'Negocios y locales',
    description: 'Para dueños de locales, tiendas, servicios o actividades comerciales que necesitan resolver caja de corto plazo.',
  },
  {
    title: 'Empresas pequeñas',
    description: 'Para empresas chicas que quieren evaluar una alternativa puntual usando cupo internacional disponible.',
  },
  {
    title: 'Emprendimientos y PyMEs',
    description: 'Para emprendimientos o PyMEs que necesitan claridad de costos antes de tomar una decisión de liquidez.',
  },
];

const informationNeeded = [
  'Monto aproximado que necesitas cubrir',
  'Banco emisor de la tarjeta',
  'Cupo internacional aproximado disponible',
  'Tipo de tarjeta de crédito',
  'Datos de contacto para coordinar por WhatsApp',
  'Cuenta bancaria donde recibirías pesos si decides avanzar',
];

const informationNeverAsked = [
  'Claves bancarias o contraseñas',
  'Token, códigos dinámicos o claves de seguridad',
  'Acceso remoto a tu celular o computador',
  'Contraseñas de correo o apps financieras',
  'Acceso directo a tus cuentas bancarias',
  'Datos sensibles enviados sin explicación ni contexto',
];

const notForYou = [
  'No tienes cupo internacional disponible en tu tarjeta de crédito.',
  'Necesitas un préstamo de largo plazo o reestructurar deuda.',
  'No tienes claridad de cómo pagarás después el cargo de la tarjeta.',
  'Buscas crédito PyME formal, factoring, leasing o línea bancaria empresa.',
  'No quieres revisar costos, condiciones y riesgos antes de avanzar.',
  'Necesitas asesoría financiera, tributaria o legal personalizada.',
];

const comparisonRows = [
  {
    alternative: 'Crédito PyME o bancario',
    use: 'Financiamiento formal para empresas, generalmente sujeto a evaluación crediticia.',
    consideration: 'Puede ser más adecuado para montos grandes, plazos largos o necesidades recurrentes.',
  },
  {
    alternative: 'Factoring',
    use: 'Liquidez contra facturas o cuentas por cobrar.',
    consideration: 'Puede servir si tienes facturas emitidas y aceptadas; no aplica a todos los negocios.',
  },
  {
    alternative: 'Avance de tarjeta',
    use: 'Producto bancario con cargo a la tarjeta.',
    consideration: 'Tiene condiciones, intereses y comisiones definidas por el banco.',
  },
  {
    alternative: 'EnPesos.cl',
    use: 'Cotización asistida usando cupo internacional disponible de tarjeta de crédito.',
    consideration: 'Puede servir para caja puntual si entiendes costos y puedes pagar después el cargo de la tarjeta.',
  },
];

const deepDiveSections = [
  {
    heading: 'Qué revisar antes de usar el cupo internacional de tu negocio',
    paragraphs: [
      'Antes de cotizar, conviene tener claro cuánto cupo internacional aparece disponible en la tarjeta que planeas usar, si ya existen cargos pendientes que podrían afectar la capacidad de pago del negocio, y si la necesidad de caja es puntual o corresponde a un problema más estructural.',
      'Esta alternativa está pensada para desfases puntuales, no para financiar pérdidas permanentes del negocio. Si el problema es recurrente, probablemente convenga revisar otras alternativas antes de operar.',
    ],
  },
  {
    heading: 'Quién suele tener sentido para cotizar',
    paragraphs: [
      'Suele tener sentido para dueños de negocios, empresas pequeñas o emprendimientos que ya cuentan con cupo internacional disponible en una tarjeta de crédito y necesitan resolver una necesidad puntual de caja, como pagar un proveedor, reponer inventario o cubrir un desfase de corto plazo.',
      'No está pensado para reemplazar un crédito PyME formal, factoring o una línea bancaria empresa cuando esos productos calzan mejor con el monto o el plazo que necesita el negocio.',
    ],
  },
  {
    heading: 'Qué pasa con la tarjeta del negocio después',
    paragraphs: [
      'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en la tarjeta de crédito usada, según las condiciones del banco o emisor. El pago posterior, la facturación, el tipo de cambio y los intereses dependen de esas condiciones, no de EnPesos.',
      'Antes de aceptar una cotización, conviene revisar si el negocio tiene capacidad de pago para ese cargo posterior, además del monto que recibirías hoy en pesos.',
    ],
  },
];

const faqs = [
  {
    question: '¿Esto es para PyMEs o para cualquier negocio?',
    answer: 'Está pensado para dueños de negocios, empresas pequeñas, emprendimientos o PyMEs que tienen cupo internacional disponible y quieren evaluar una necesidad puntual de liquidez. Usamos “negocio” como lenguaje principal porque suele ser la forma más natural en que el cliente describe su situación.',
  },
  {
    question: '¿EnPesos entrega crédito para empresas?',
    answer: 'No. EnPesos no entrega crédito PyME, préstamo, factoring ni línea bancaria. Entregamos atención asistida para cotizar una operación usando cupo internacional disponible de una tarjeta de crédito.',
  },
  {
    question: '¿Qué tipo de necesidad de caja puede evaluar un negocio?',
    answer: 'Puede ser un pago puntual a proveedor, reposición de inventario, desfase entre ventas y cobros o gasto operativo de corto plazo. No debería usarse para tapar una falta estructural de caja sin plan de pago.',
  },
  {
    question: '¿Cotizar obliga a operar?',
    answer: 'No. Puedes pedir una cotización, revisar monto estimado, costos, condiciones y decidir si te conviene. Cotizar no significa que tengas que avanzar.',
  },
  {
    question: '¿Piden claves bancarias o acceso a cuentas?',
    answer: 'No. Nunca pedimos claves bancarias, token de acceso, contraseñas, acceso remoto a dispositivos ni control de tus cuentas.',
  },
  {
    question: '¿Puede servir para pagar proveedores?',
    answer: 'Puede servir para evaluar una necesidad puntual de caja si tienes cupo internacional disponible y entiendes los costos. La decisión debe tomarse después de revisar la cotización y tu capacidad de pago posterior.',
  },
  {
    question: '¿Puedo usar una tarjeta personal para una necesidad del negocio?',
    answer: 'Muchos dueños de negocios pequeños mezclan flujo personal y comercial. Antes de decidir, es importante entender costos, fechas de facturación, pago posterior de la tarjeta y efectos contables o tributarios si corresponde.',
  },
  {
    question: '¿Cuánto puedo recibir en pesos?',
    answer: 'Depende del monto de cupo internacional disponible, banco, tarjeta, tipo de cambio, costos de procesamiento, margen del servicio y condiciones vigentes. Por eso se entrega una cotización previa.',
  },
  {
    question: '¿Cuánto demora?',
    answer: 'Depende del banco, tarjeta, monto y validaciones. Evitamos prometer un plazo único porque lo responsable es revisar cada caso antes de confirmar.',
  },
  {
    question: '¿Conviene más que un crédito o factoring?',
    answer: 'No siempre. Depende del monto, urgencia, costo, plazo, facturas disponibles y capacidad de pago. Esta página no reemplaza asesoría financiera; busca ayudarte a entender cuándo cotizar puede tener sentido.',
  },
  {
    question: '¿Sirve para empresas grandes?',
    answer: 'No es el foco principal. La página está pensada para negocios, empresas pequeñas, emprendimientos y PyMEs con necesidades puntuales de caja.',
  },
  {
    question: '¿Atienden regiones?',
    answer: 'Sí. La atención es por WhatsApp, por lo que puedes cotizar de forma remota desde distintas ciudades de Chile.',
  },
];

export default function LiquidezNegociosCupoInternacional() {
  useEffect(() => {
    document.title = 'Liquidez para negocios con cupo internacional | EnPesos.cl';

    const metaDescription = 'Cotiza una alternativa de liquidez para tu negocio, empresa pequeña o emprendimiento usando cupo internacional disponible. Atención por WhatsApp, costos claros y sin claves bancarias.';
    const canonicalUrl = 'https://www.enpesos.cl/liquidez-para-negocios-cupo-internacional';
    const siteUrl = 'https://www.enpesos.cl';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Liquidez para negocios con cupo internacional | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: 'Atención asistida por WhatsApp para negocios, empresas pequeñas y emprendimientos que quieren cotizar usando cupo internacional disponible.' });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'EnPesos.cl' });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'EnPesos.cl',
        url: siteUrl,
        sameAs: [
          'https://www.instagram.com/enpesoscl/',
          'https://www.facebook.com/enpesoscl',
          'https://www.tiktok.com/@enpesoscl',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: '+56974483779',
          availableLanguage: 'Spanish',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Liquidez para negocios con cupo internacional',
        description: metaDescription,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'EnPesos.cl',
          url: siteUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Cotización de liquidez para negocios con cupo internacional disponible',
        provider: {
          '@type': 'Organization',
          name: 'EnPesos.cl',
          url: siteUrl,
        },
        areaServed: 'Chile',
        serviceType: 'Atención asistida por WhatsApp para cotizar cupo internacional disponible',
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Dueños de negocios, empresas pequeñas, emprendimientos y PyMEs',
        },
        description: 'Servicio de atención asistida para dueños de negocios que quieren cotizar una alternativa de liquidez puntual usando cupo internacional disponible de tarjeta de crédito.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Liquidez para negocios',
            item: canonicalUrl,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ];

    let script = document.head.querySelector('#liquidez-negocios-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'liquidez-negocios-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section id="inicio" className="hero-gradient py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary mb-5">
                  <Building2 className="w-4 h-4" />
                  Para negocios, empresas pequeñas y emprendimientos
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Liquidez para tu negocio usando cupo internacional disponible
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Si tienes un negocio, empresa pequeña o emprendimiento y necesitas cubrir una necesidad puntual de caja, EnPesos.cl te ayuda a cotizar una alternativa usando cupo internacional disponible de tu tarjeta de crédito. Antes de avanzar, revisas monto estimado, costos y condiciones por WhatsApp.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-2xl">
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">Pensado para caja puntual, proveedores o desfases de flujo.</p>
                  </div>
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">Cotización clara antes de decidir si avanzas.</p>
                  </div>
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">No pedimos claves bancarias ni acceso a cuentas.</p>
                  </div>
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">No es crédito PyME, factoring ni préstamo bancario.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seo_negocios_hero', WHATSAPP_MESSAGES.hero)}
                  >
                    Cotizar para mi negocio
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <a
                    href="#cuando-sirve"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver cuándo sirve
                  </a>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <WalletCards className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                  Primero caja clara. Después decisión.
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  Esta página no habla de “financiamiento milagro”. Habla de una cotización puntual para dueños de negocios que necesitan saber si usar cupo internacional disponible tiene sentido para su caja.
                </p>

                <div className="rounded-[2rem] border border-border bg-secondary p-3 sm:p-4">
                  <div className="rounded-[1.5rem] bg-background overflow-hidden border border-border">
                    <div className="bg-primary px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-foreground/95 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-primary-foreground">EnPesos por WhatsApp</p>
                        <p className="text-xs text-primary-foreground/80">Cotización para negocio</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]">
                      <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">Tengo un negocio y necesito pagar un proveedor. ¿Puedo cotizar con cupo internacional?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">Sí, podemos revisar tu caso. Primero vemos monto, costos y condiciones. Cotizar no te obliga a operar.</p>
                      </div>
                      <div className="max-w-[84%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">¿Necesitan claves o acceso a mi banco?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">No. Nunca pedimos claves bancarias, token ni acceso a cuentas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="cuando-sirve" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Caja de corto plazo</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cuándo puede tener sentido cotizar para tu negocio
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Esta alternativa no reemplaza un plan financiero. Puede tener sentido cuando el problema es puntual, el monto es acotado y tienes claridad de cómo pagarás después el cargo de la tarjeta.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {cashNeeds.map((need) => (
                <div key={need} className="rounded-3xl border border-border bg-card p-6 flex gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <p className="font-semibold text-foreground leading-relaxed">{need}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
              <div className="flex gap-3">
                <AlertTriangle className="w-7 h-7 text-amber-700 shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-extrabold text-amber-950 mb-2">No uses liquidez puntual para tapar un problema estructural</h3>
                  <p className="text-amber-950/85 leading-relaxed">
                    Si tu negocio tiene pérdidas permanentes, deuda acumulada o no sabes cómo pagarás la tarjeta después, lo correcto es revisar otras alternativas antes de operar. Esta página está pensada para desfases puntuales de caja, no para esconder un problema financiero mayor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Lenguaje real del cliente</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Para negocios, empresas pequeñas, emprendimientos y PyMEs
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                Usamos “negocio” como concepto principal porque muchos dueños no se presentan como PyME: dicen “tengo un negocio”, “tengo una empresa”, “tengo una distribuidora” o “tengo un local”. La página cubre todos esos casos sin forzar lenguaje bancario.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {businessTypes.map((type) => (
                <div key={type.title} className="rounded-3xl border border-border bg-background p-6 sm:p-7">
                  <Building2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-extrabold text-foreground mb-3">{type.title}</h3>
                  <p className="text-secondary-foreground leading-relaxed">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Proceso</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cómo cotizar liquidez para tu negocio con cupo internacional
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                El proceso debe ayudarte a decidir, no presionarte. Primero entiendes costos y condiciones; después decides si avanzar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold mb-5">
                    {index + 1}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3">{step.title}</h3>
                  <p className="text-secondary-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="seguridad" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-8 h-8 text-accent" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Seguridad: qué nunca debes entregar</h2>
                </div>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  En una operación financiera, la señal más importante es saber qué información no corresponde pedir. Si alguien te pide claves, token o acceso remoto, no lo entregues.
                </p>
                <div className="space-y-3">
                  {informationNeverAsked.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-red-50 border border-red-100 p-4">
                      <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-red-950">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-primary" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Información razonable para cotizar</h2>
                </div>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  Para estimar un caso se puede pedir información básica del monto, banco y tarjeta, además de datos de coordinación. La cotización debe ser clara antes de cualquier decisión.
                </p>
                <div className="space-y-3">
                  {informationNeeded.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl bg-primary-light border border-primary/10 p-4">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                onClick={() => openWhatsApp('seo_negocios_seguridad', WHATSAPP_MESSAGES.seguridad)}
              >
                Cotizar sin entregar claves
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Alternativas</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  No compite contra todo tipo de financiamiento
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                  Para una empresa, no toda necesidad de caja se resuelve igual. EnPesos puede ser una alternativa puntual si tienes cupo internacional disponible, pero no reemplaza productos como crédito PyME, factoring o una línea bancaria cuando esos calzan mejor.
                </p>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl px-7 text-base font-bold"
                  onClick={() => openWhatsApp('seo_negocios_caja', WHATSAPP_MESSAGES.caja)}
                >
                  Revisar mi necesidad de caja
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="grid grid-cols-3 bg-secondary text-sm font-extrabold text-foreground">
                  <div className="p-4">Alternativa</div>
                  <div className="p-4">Qué es</div>
                  <div className="p-4">Consideración</div>
                </div>
                {comparisonRows.map((row) => (
                  <div key={row.alternative} className="grid grid-cols-3 border-t border-border text-sm">
                    <div className="p-4 font-extrabold text-foreground">{row.alternative}</div>
                    <div className="p-4 text-secondary-foreground leading-relaxed">{row.use}</div>
                    <div className="p-4 text-secondary-foreground leading-relaxed">{row.consideration}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Filtro honesto</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Esto puede no ser para tu negocio si...
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Una buena página de conversión también debe decir cuándo no conviene. Eso filtra malos leads y evita promesas que dañan la confianza.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {notForYou.map((item) => (
                <div key={item} className="flex gap-3 rounded-3xl border border-border bg-background p-5">
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <p className="font-semibold text-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">A fondo</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Lo que conviene entender antes de cotizar para tu negocio
              </h2>
            </div>
            <div className="grid gap-5">
              {deepDiveSections.map((item) => (
                <article key={item.heading} className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                  <h3 className="text-xl font-extrabold text-foreground mb-3">{item.heading}</h3>
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-secondary-foreground leading-relaxed mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-5 mb-12">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                    <Icon className="w-9 h-9 text-primary mb-4" />
                    <h3 className="text-xl font-extrabold text-foreground mb-3">{item.title}</h3>
                    <p className="text-secondary-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 card-shadow">
              <div className="flex items-start gap-4 mb-6">
                <HelpCircle className="w-8 h-8 text-primary shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-2">Preguntas frecuentes</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                    Dudas comunes antes de cotizar para un negocio
                  </h2>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-border bg-background p-5">
                    <h3 className="font-extrabold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-secondary-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Clock3 className="w-12 h-12 mx-auto mb-5 opacity-90" />
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5">
              Cotiza antes de comprometer caja de tu negocio
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/85 leading-relaxed mb-8">
              Escríbenos por WhatsApp, revisamos tu caso y te entregamos una cotización clara. No estás obligado a operar y nunca debes entregar claves bancarias.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-13 rounded-xl px-8 text-base font-extrabold"
              onClick={() => openWhatsApp('seo_negocios_final', WHATSAPP_MESSAGES.final)}
            >
              Revisar mi caso por WhatsApp
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
