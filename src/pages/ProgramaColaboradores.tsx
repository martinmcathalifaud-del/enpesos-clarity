import { useEffect } from 'react';
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  CreditCard,
  FileText,
  Handshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  XCircle,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const WHATSAPP_MESSAGES = {
  hero: 'Hola, quiero postular al programa de colaboradores de EnPesos.cl y recibir información.',
  material: 'Hola, quiero revisar el material y condiciones del programa de colaboradores EnPesos.cl.',
  final: 'Hola, quiero postular al programa de colaboradores de EnPesos.cl.',
};

const modelSteps = [
  {
    number: '01',
    title: 'Recibes un link o código personal',
    description: 'Activamos una forma simple de identificar qué contactos llegan por tu recomendación.',
  },
  {
    number: '02',
    title: 'Compartes un dato útil o derivas a alguien',
    description: 'Puedes publicarlo, responder un DM o derivar contactos puntuales que podrían necesitar liquidez.',
  },
  {
    number: '03',
    title: 'EnPesos evalúa y cotiza el caso',
    description: 'Nosotros explicamos costos, condiciones y pasos. Tú no atiendes clientes ni cierras operaciones.',
  },
  {
    number: '04',
    title: 'Recibes comisión si se concreta',
    description: 'La comisión se genera solo cuando la persona referida concreta una operación con EnPesos.',
  },
];

const goodReferral = [
  'Persona en Chile y mayor de edad.',
  'Tiene tarjeta de crédito propia.',
  'Cuenta con cupo internacional disponible.',
  'Quiere cotizar antes de tomar una decisión.',
  'Entiende que no es préstamo ni plata garantizada.',
];

const badReferral = [
  'Busca plata garantizada o inmediata.',
  'Necesita un préstamo o avance bancario.',
  'Quiere operar sin entender costos y condiciones.',
  'Pretende usar tarjetas de terceros o datos no propios.',
  'Busca resolver un problema estructural de deuda.',
];

const communicationDo = [
  'Liquidez usando cupo internacional disponible.',
  'Evaluación caso a caso y cotización previa.',
  'Acompañamiento humano antes de decidir.',
  'Dato útil para una necesidad puntual de pesos.',
];

const communicationDont = [
  'Préstamo o crédito.',
  'Plata fácil o garantizada.',
  'Aprobado para todos.',
  'Sirve para cualquier tarjeta.',
];

const materialItems = [
  {
    title: 'Link o código personal',
    description: 'Para identificar referidos y mantener trazabilidad.',
  },
  {
    title: 'Mensaje sugerido',
    description: 'Textos breves para historia, DM o WhatsApp.',
  },
  {
    title: 'Guía de comunicación',
    description: 'Qué decir, qué evitar y cómo derivar bien.',
  },
  {
    title: 'Seguimiento simple',
    description: 'Registro de contactos atendidos y operaciones concretadas.',
  },
];

const compatibleProfiles = [
  {
    title: 'Creadoras de contenido',
    description: 'Audiencias de datos, beneficios, compras, finanzas personales o emprendimiento.',
  },
  {
    title: 'Asesoras o ejecutivas',
    description: 'Personas que conversan con clientes que podrían necesitar liquidez puntual.',
  },
  {
    title: 'Comunidades PyME',
    description: 'Perfiles con llegada a emprendedores, independientes o negocios pequeños.',
  },
  {
    title: 'Referidores puntuales',
    description: 'Personas con contactos específicos, sin necesidad de publicar masivamente.',
  },
];

const faqs = [
  {
    question: '¿Tengo que explicar todo el servicio?',
    answer: 'No. Lo recomendado es compartir el dato o derivar al contacto. EnPesos se encarga de evaluar el caso, explicar costos y acompañar la decisión.',
  },
  {
    question: '¿Cuándo se paga comisión?',
    answer: 'Solo cuando una persona referida concreta una operación. Si la persona solo pregunta o cotiza, no se genera comisión.',
  },
  {
    question: '¿Puedo participar sin hacer una campaña grande?',
    answer: 'Sí. El programa puede funcionar con una historia puntual, un mensaje directo o derivaciones privadas. No requiere una campaña masiva.',
  },
  {
    question: '¿EnPesos es un préstamo?',
    answer: 'No. EnPesos no debe comunicarse como préstamo, avance bancario ni plata garantizada. La propuesta es evaluar una alternativa de liquidez usando cupo internacional disponible.',
  },
  {
    question: '¿Cómo se sabe que alguien llegó por mí?',
    answer: 'Usamos un link, código, mensaje identificable o registro acordado previamente. La trazabilidad es necesaria para asignar comisión.',
  },
];

function SectionTitle({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">{kicker}</p>
      <h2 className="text-3xl font-black leading-[0.98] tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-secondary-foreground sm:text-lg">{description}</p>}
    </div>
  );
}

function CheckList({ items, negative = false }: { items: string[]; negative?: boolean }) {
  const Icon = negative ? XCircle : CheckCircle2;
  return (
    <ul className="mt-5 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm font-semibold leading-relaxed text-secondary-foreground">
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${negative ? 'text-destructive' : 'text-accent'}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProgramaColaboradores() {
  useEffect(() => {
    document.title = 'Programa de colaboradores EnPesos.cl | Referidos con comisión';

    const metaDescription = 'Programa de colaboradores EnPesos.cl: refiere personas con cupo internacional disponible y recibe comisión por operaciones concretadas. Modelo transaccional, comunicación responsable y condiciones claras.';
    const canonicalUrl = 'https://www.enpesos.cl/programa-de-colaboradores';
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
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Programa de colaboradores EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: 'Refiere personas con cupo internacional disponible y recibe comisión por operaciones concretadas.' });
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
        name: 'Programa de colaboradores EnPesos.cl',
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
        name: 'Programa de colaboradores y referidos EnPesos.cl',
        provider: {
          '@type': 'Organization',
          name: 'EnPesos.cl',
          url: siteUrl,
        },
        areaServed: 'Chile',
        serviceType: 'Programa de referidos con comisión por operaciones concretadas',
      },
    ];

    const scriptId = 'programa-colaboradores-schema';
    document.getElementById(scriptId)?.remove();
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f8f5]">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-[#07110d] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(22,199,132,0.26),transparent_32%),radial-gradient(circle_at_82%_8%,rgba(214,180,111,0.20),transparent_28%)]" />
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:58px_58px]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-sm font-extrabold text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(110,231,183,.14)]" />
                Programa de colaboradores · Grupo inicial
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.07em] sm:text-6xl lg:text-7xl">
                Ayuda a personas a usar mejor un cupo que ya tienen disponible.
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/72 sm:text-xl">
                EnPesos.cl acompaña a personas con tarjeta de crédito y cupo internacional disponible que quieren evaluar una forma de obtener liquidez puntual en pesos chilenos. Tú derivas con un link o código personal; si la persona concreta una operación, recibes comisión.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="h-13 rounded-2xl bg-primary px-7 text-base font-black text-primary-foreground button-shadow hover:bg-primary/90"
                  onClick={() => openWhatsApp('colaboradores_hero', WHATSAPP_MESSAGES.hero)}
                >
                  Postular como colaborador/a
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <a
                  href="#modelo"
                  className="inline-flex h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/8 px-7 text-base font-black text-white transition-colors hover:bg-white/12"
                >
                  Ver cómo funciona
                </a>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/52">
                No se trata de prometer resultados ni vender “plata fácil”. Es un programa de referidos con comunicación responsable, condiciones claras y comisión por operaciones concretadas.
              </p>

              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                  <p className="text-2xl font-black tracking-tight">0</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-white/56">claves, token o contraseñas solicitadas</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                  <p className="text-2xl font-black tracking-tight">Caso a caso</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-white/56">evaluación y cotización previa antes de avanzar</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/8 p-5">
                  <p className="text-2xl font-black tracking-tight">Comisión</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-white/56">solo por operaciones concretadas</p>
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-[0_30px_90px_rgba(3,10,7,.28)] backdrop-blur">
              <div className="rounded-[1.55rem] bg-[#f7f4e9] p-6 text-foreground">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-primary">Modelo transaccional</p>
                    <h2 className="mt-2 text-3xl font-black leading-none tracking-[-0.05em]">Referir, derivar y recibir comisión.</h2>
                  </div>
                  <span className="rounded-full border border-[#e8dfc6] bg-white px-3 py-2 text-xs font-black text-[#614b18]">Sin costo</span>
                </div>

                <div className="mt-6 grid gap-3">
                  {modelSteps.slice(0, 3).map((step) => (
                    <div key={step.number} className="flex gap-4 rounded-3xl border border-[#eadfca] bg-white p-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[#0f172a] text-xs font-black text-white">{step.number}</span>
                      <div>
                        <h3 className="text-sm font-black text-foreground">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-secondary-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 rounded-3xl bg-[#0f172a] p-5 text-white sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="text-3xl font-black text-emerald-200">$</p>
                    <p className="text-sm leading-relaxed text-white/62">Comisión acordada previamente según perfil, campaña y volumen.</p>
                  </div>
                  <Button
                    className="rounded-2xl font-black"
                    onClick={() => openWhatsApp('colaboradores_card', WHATSAPP_MESSAGES.hero)}
                  >
                    Solicitar info
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="modelo" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              kicker="El modelo"
              title="Simple como un programa de referidos. Serio como una alianza comercial."
              description="El enfoque es transaccional: una persona llega por ti, EnPesos revisa el caso y, si la operación se concreta, recibes comisión. Sin prometer carrera comercial, sin vender un sistema de brokers y sin inflar expectativas."
            />

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {modelSteps.map((step) => (
                <div key={step.number} className="rounded-3xl border border-border bg-background p-6 card-shadow">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-sm font-black text-primary">{step.number}</div>
                  <h3 className="text-xl font-black leading-tight tracking-[-0.03em] text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] bg-[#0f172a] p-7 text-white shadow-xl lg:p-9">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Qué toma de Propital</p>
              <h2 className="text-3xl font-black leading-none tracking-[-0.05em]">Look & feel de sistema serio.</h2>
              <p className="mt-4 leading-relaxed text-white/70">
                Usamos una estética más premium, sensación de proceso, filtro de postulación, bloques de respaldo, jerarquía fuerte y CTA claro. No se ve como “pásame datos y te pago”, sino como una colaboración cuidada.
              </p>
              <CheckList items={['Postulación en vez de inscripción abierta.', 'Herramientas y material para comunicar bien.', 'Sensación de método, respaldo y acompañamiento.']} />
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm lg:p-9">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">Qué toma de Tricapitals</p>
              <h2 className="text-3xl font-black leading-none tracking-[-0.05em] text-foreground">Propuesta simple y transaccional.</h2>
              <p className="mt-4 leading-relaxed text-secondary-foreground">
                Incentivo claro, requisitos del referido, condiciones visibles y comisión por resultado. EnPesos no está ofreciendo una carrera de broker: está ofreciendo una forma de monetizar referidos concretados.
              </p>
              <CheckList items={['Referir personas específicas.', 'Ganar solo si la operación se concreta.', 'Requisitos simples para reducir referidos no calificados.']} />
            </div>
          </div>
        </section>

        <section id="referir" className="bg-[#f7f4e9] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              kicker="A quién referir"
              title="No todos los contactos son buenos referidos."
              description="La calidad importa más que el volumen. La página filtra desde el inicio para proteger a la colaboradora, al referido y a EnPesos."
            />

            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-[#eadfca] bg-white p-7 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary"><CheckCircle2 className="h-6 w-6" /></div>
                  <h3 className="text-2xl font-black tracking-[-0.04em]">Buen perfil para derivar</h3>
                </div>
                <CheckList items={goodReferral} />
              </div>

              <div className="rounded-[2rem] border border-[#eadfca] bg-white p-7 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-destructive"><XCircle className="h-6 w-6" /></div>
                  <h3 className="text-2xl font-black tracking-[-0.04em]">No conviene derivar si busca</h3>
                </div>
                <CheckList items={badReferral} negative />
              </div>
            </div>
          </div>
        </section>

        <section id="material" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <div className="mb-8 max-w-2xl">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Soporte para colaborar</p>
                <h2 className="text-3xl font-black leading-none tracking-[-0.05em] text-foreground sm:text-5xl">Te damos estructura para comunicar sin improvisar.</h2>
                <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                  El objetivo es proteger tu comunidad y evitar mensajes confusos. Por eso el programa entrega materiales y límites claros.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {materialItems.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                    <h3 className="text-base font-black text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-7 card-shadow">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary"><MessageCircle className="h-6 w-6" /></div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">Comunicación responsable</p>
              <h3 className="text-3xl font-black leading-none tracking-[-0.05em]">WhatsApp es canal, no la propuesta central.</h3>
              <p className="mt-4 leading-relaxed text-secondary-foreground">
                La propuesta no es “atendemos por WhatsApp”. La propuesta es ayudar a una persona a evaluar una alternativa de liquidez usando cupo internacional disponible, con cotización clara y acompañamiento humano.
              </p>

              <div className="mt-7 grid gap-5">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.14em] text-primary">Sí comunicar</h4>
                  <CheckList items={communicationDo} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-[0.14em] text-destructive">No comunicar</h4>
                  <CheckList items={communicationDont} negative />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="condiciones" className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              kicker="Condiciones claras"
              title="La comisión se gana cuando hay una operación real."
              description="Esto evita malentendidos y mantiene el programa ordenado desde el día uno."
            />

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
                <BadgeDollarSign className="mb-5 h-10 w-10 text-primary" />
                <h3 className="text-xl font-black tracking-[-0.03em]">Comisión acordada</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">La comisión se informa antes de activar el link o código. Puede variar según perfil, campaña o volumen.</p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
                <CreditCard className="mb-5 h-10 w-10 text-primary" />
                <h3 className="text-xl font-black tracking-[-0.03em]">Cotizar no genera comisión</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">La comisión solo se genera si la persona referida concreta una operación con EnPesos.</p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
                <FileText className="mb-5 h-10 w-10 text-primary" />
                <h3 className="text-xl font-black tracking-[-0.03em]">Trazabilidad necesaria</h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">El referido debe llegar por link, código, mensaje identificable o registro acordado previamente.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              kicker="Perfiles compatibles"
              title="Para creadoras, asesoras y personas con contactos reales."
              description="No necesitas ser broker financiero. Necesitas poder derivar contactos de forma responsable."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {compatibleProfiles.map((profile) => (
                <div key={profile.title} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <Users className="mb-4 h-8 w-8 text-primary" />
                  <h3 className="text-lg font-black tracking-[-0.03em]">{profile.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">{profile.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#07110d] p-8 text-white shadow-[0_30px_90px_rgba(3,10,7,.22)] sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-emerald-200">
                  <Sparkles className="h-4 w-4" /> Postulación
                </div>
                <h2 className="text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl">¿Quieres revisar si calza contigo?</h2>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/68">
                  Postula y te enviaremos las condiciones, el material base y un ejemplo de mensaje antes de activar tu link o código personal.
                </p>
              </div>
              <Button
                size="lg"
                className="h-13 rounded-2xl px-7 text-base font-black button-shadow"
                onClick={() => openWhatsApp('colaboradores_final', WHATSAPP_MESSAGES.final)}
              >
                Postular por WhatsApp
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-4xl">
            <SectionTitle kicker="Preguntas frecuentes" title="Dudas normales antes de recomendar." />
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <summary className="cursor-pointer list-none text-base font-black text-foreground marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-primary transition-transform group-open:rotate-90">›</span>
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-secondary-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
