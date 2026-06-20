import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Landmark,
  MessageCircle,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

type PageKey =
  | 'banco-estado'
  | 'santander'
  | 'banco-de-chile'
  | 'bci'
  | 'scotiabank'
  | 'itau'
  | 'cmr-falabella'
  | 'tarjeta-visa'
  | 'tarjeta-mastercard';

type PageConfig = {
  key: PageKey;
  name: string;
  shortName: string;
  slug: string;
  category: 'Banco' | 'Emisor retail' | 'Marca de tarjeta';
  intro: string;
  consideration: string;
  whatsappMessage: string;
};

const pageConfigs: Record<PageKey, PageConfig> = {
  'banco-estado': {
    key: 'banco-estado',
    name: 'BancoEstado',
    shortName: 'BancoEstado',
    slug: 'cupo-en-dolares-banco-estado',
    category: 'Banco',
    intro: 'Si tienes una tarjeta de crédito BancoEstado con cupo internacional disponible, puedes solicitar una cotización asistida por WhatsApp para evaluar cuánto podrías recibir en pesos chilenos antes de decidir.',
    consideration: 'La revisión depende del cupo internacional disponible, configuración de la tarjeta, monto a evaluar, marca de tarjeta y condiciones vigentes del caso.',
    whatsappMessage: 'Hola, tengo una tarjeta BancoEstado y quiero cotizar mi cupo internacional disponible a pesos chilenos.',
  },
  santander: {
    key: 'santander',
    name: 'Santander',
    shortName: 'Santander',
    slug: 'cupo-en-dolares-santander',
    category: 'Banco',
    intro: 'Si tu tarjeta de crédito es Santander y tiene cupo internacional disponible, puedes cotizar por WhatsApp una estimación en pesos chilenos con información clara antes de avanzar.',
    consideration: 'El resultado depende del banco emisor, cupo disponible, marca de tarjeta, monto solicitado, validaciones y condiciones del momento.',
    whatsappMessage: 'Hola, tengo una tarjeta Santander y quiero cotizar mi cupo en dólares a pesos chilenos.',
  },
  'banco-de-chile': {
    key: 'banco-de-chile',
    name: 'Banco de Chile',
    shortName: 'Banco de Chile',
    slug: 'cupo-en-dolares-banco-de-chile',
    category: 'Banco',
    intro: 'Si tienes tarjeta de crédito Banco de Chile con cupo internacional disponible, EnPesos.cl puede ayudarte a solicitar una cotización previa por WhatsApp para revisar el monto estimado en pesos chilenos.',
    consideration: 'La cotización se revisa caso a caso según cupo, monto, marca de tarjeta, límites, validaciones y condiciones informadas antes de decidir.',
    whatsappMessage: 'Hola, tengo una tarjeta Banco de Chile y quiero cotizar mi cupo internacional disponible.',
  },
  bci: {
    key: 'bci',
    name: 'BCI',
    shortName: 'BCI',
    slug: 'cupo-en-dolares-bci',
    category: 'Banco',
    intro: 'Si tienes una tarjeta BCI con cupo internacional disponible, puedes escribir por WhatsApp para cotizar una operación asistida y revisar cuánto podrías recibir en pesos chilenos.',
    consideration: 'La evaluación depende del cupo disponible, tipo de tarjeta, marca, monto que quieres revisar y condiciones específicas del caso.',
    whatsappMessage: 'Hola, tengo una tarjeta BCI y quiero cotizar mi cupo en dólares a pesos chilenos.',
  },
  scotiabank: {
    key: 'scotiabank',
    name: 'Scotiabank',
    shortName: 'Scotiabank',
    slug: 'cupo-en-dolares-scotiabank',
    category: 'Banco',
    intro: 'Si tu tarjeta Scotiabank tiene cupo internacional disponible, puedes solicitar una cotización por WhatsApp para evaluar el monto neto estimado en pesos chilenos antes de tomar una decisión.',
    consideration: 'La compatibilidad se revisa de forma prudente según banco, tarjeta, cupo internacional disponible, monto y condiciones vigentes.',
    whatsappMessage: 'Hola, tengo una tarjeta Scotiabank y quiero cotizar mi cupo internacional disponible.',
  },
  itau: {
    key: 'itau',
    name: 'Itaú',
    shortName: 'Itaú',
    slug: 'cupo-en-dolares-itau',
    category: 'Banco',
    intro: 'Si tienes una tarjeta Itaú con cupo internacional disponible, puedes cotizar por WhatsApp cuánto podrías recibir en pesos chilenos, revisando primero costos y condiciones.',
    consideration: 'El caso depende de la tarjeta, cupo internacional, marca, monto, validaciones y condiciones al momento de cotizar.',
    whatsappMessage: 'Hola, tengo una tarjeta Itaú y quiero cotizar mi cupo en dólares a pesos chilenos.',
  },
  'cmr-falabella': {
    key: 'cmr-falabella',
    name: 'CMR Falabella',
    shortName: 'CMR',
    slug: 'cupo-en-dolares-cmr-falabella',
    category: 'Emisor retail',
    intro: 'Si tienes una tarjeta CMR Falabella con cupo internacional disponible, puedes pedir una cotización asistida por WhatsApp para revisar el monto estimado en pesos chilenos antes de decidir.',
    consideration: 'La revisión depende del cupo internacional disponible, marca de tarjeta, monto, límites, validaciones y condiciones del caso.',
    whatsappMessage: 'Hola, tengo una tarjeta CMR Falabella y quiero cotizar mi cupo internacional disponible.',
  },
  'tarjeta-visa': {
    key: 'tarjeta-visa',
    name: 'tarjeta Visa',
    shortName: 'Visa',
    slug: 'cupo-en-dolares-tarjeta-visa',
    category: 'Marca de tarjeta',
    intro: 'Si tu tarjeta de crédito es Visa y tiene cupo internacional disponible, puedes cotizar por WhatsApp una estimación en pesos chilenos según el banco o emisor de la tarjeta.',
    consideration: 'Visa es una marca de tarjeta. La revisión también depende del banco o emisor, cupo disponible, monto, límites y condiciones aplicables.',
    whatsappMessage: 'Hola, tengo una tarjeta Visa y quiero cotizar mi cupo internacional disponible a pesos chilenos.',
  },
  'tarjeta-mastercard': {
    key: 'tarjeta-mastercard',
    name: 'tarjeta Mastercard',
    shortName: 'Mastercard',
    slug: 'cupo-en-dolares-tarjeta-mastercard',
    category: 'Marca de tarjeta',
    intro: 'Si tu tarjeta de crédito es Mastercard y tiene cupo internacional disponible, puedes solicitar por WhatsApp una cotización previa para evaluar pesos chilenos antes de avanzar.',
    consideration: 'Mastercard es una marca de tarjeta. La compatibilidad se revisa según banco o emisor, cupo internacional disponible, monto y condiciones del caso.',
    whatsappMessage: 'Hola, tengo una tarjeta Mastercard y quiero cotizar mi cupo internacional disponible.',
  },
};

const pageList = Object.values(pageConfigs);

const hubFaqs = [
  {
    question: '¿Qué bancos o tarjetas se pueden cotizar?',
    answer: 'EnPesos.cl revisa caso a caso tarjetas con cupo internacional disponible. El banco, emisor, marca de tarjeta, monto, límites y condiciones del momento influyen en la cotización.',
  },
  {
    question: '¿EnPesos.cl representa a bancos, CMR, Visa o Mastercard?',
    answer: 'No. EnPesos.cl no es banco, no representa a bancos ni emisores, y no tiene relación oficial con Visa, Mastercard ni CMR Falabella. Solo entrega cotización asistida por WhatsApp.',
  },
  {
    question: '¿Cotizar garantiza que mi tarjeta sea compatible?',
    answer: 'No. La cotización permite revisar información básica del caso, pero no asegura compatibilidad ni aprobación. La decisión de avanzar se toma solo después de ver condiciones.',
  },
  {
    question: '¿Piden claves bancarias para revisar banco o tarjeta?',
    answer: 'No. EnPesos.cl no pide claves bancarias, token, contraseñas ni acceso remoto. Si alguien solicita esa información, no la entregues.',
  },
];

const processSteps = [
  'Indicas banco o tarjeta.',
  'Se revisa información básica del caso.',
  'Recibes cotización previa.',
  'Tú decides si avanzar.',
];

const safetyItems = [
  'No entregues claves bancarias, contraseñas, token ni códigos dinámicos.',
  'No aceptes acceso remoto a tu celular, computador o banca en línea.',
  'Pide siempre una cotización previa con monto estimado, costos y condiciones.',
  'Confirma cómo se pagará luego el cargo asociado a tu tarjeta.',
  'Desconfía de cualquier oferta que prometa compatibilidad o aprobación sin revisar tu caso.',
];

function getSpecificFaqs(page: PageConfig) {
  return [
    {
      question: `¿Puedo cotizar cupo en dólares con ${page.shortName}?`,
      answer: `Puedes solicitar una revisión por WhatsApp si tienes cupo internacional disponible. La cotización depende de ${page.shortName}, el banco o emisor cuando corresponda, la marca de tarjeta, el monto y las condiciones del caso.`,
    },
    {
      question: `¿EnPesos.cl trabaja oficialmente con ${page.shortName}?`,
      answer: `No. EnPesos.cl no representa a ${page.shortName}, no es banco ni emisor de tarjetas, y solo ofrece una cotización asistida por WhatsApp para evaluar cupo internacional disponible.`,
    },
    {
      question: '¿Cotizar me obliga a avanzar?',
      answer: 'No. Primero recibes una cotización previa y puedes revisar monto estimado, costos y condiciones. Solo decides avanzar si la información te hace sentido.',
    },
    {
      question: '¿Qué información se revisa para cotizar?',
      answer: 'Normalmente se revisa banco o tarjeta, monto aproximado, cupo internacional disponible, marca de tarjeta y datos básicos de contacto. No se solicitan claves bancarias ni acceso a cuentas.',
    },
    {
      question: '¿El monto en pesos es igual para todos los bancos o tarjetas?',
      answer: 'No. El monto puede variar según banco, emisor, marca de tarjeta, monto, costos, tipo de cambio, límites y condiciones del momento.',
    },
  ];
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

interface CupoDolaresBancoTarjetaProps {
  pageKey?: PageKey;
}

export default function CupoDolaresBancoTarjeta({ pageKey }: CupoDolaresBancoTarjetaProps) {
  const page = pageKey ? pageConfigs[pageKey] : null;
  const siteUrl = 'https://www.enpesos.cl';
  const canonicalUrl = page ? `${siteUrl}/${page.slug}` : `${siteUrl}/bancos-y-tarjetas-cupo-en-dolares`;
  const title = page
    ? `Cupo en dólares ${page.shortName} | Cotiza por WhatsApp | EnPesos.cl`
    : 'Bancos y tarjetas con cupo en dólares | EnPesos.cl';
  const description = page
    ? `Cotiza cupo en dólares ${page.shortName} a pesos chilenos por WhatsApp. Revisión caso a caso, sin claves bancarias y sin relación oficial con bancos o marcas de tarjeta.`
    : 'Revisa bancos y tarjetas para cotizar cupo en dólares a pesos chilenos por WhatsApp. BancoEstado, Santander, Banco de Chile, BCI, CMR, Visa, Mastercard y más.';
  const faqItems = page ? getSpecificFaqs(page) : hubFaqs;

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'EnPesos.cl' });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page ? `Cupo en dólares ${page.shortName}` : 'Bancos y tarjetas con cupo en dólares',
        description,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'EnPesos.cl',
          url: siteUrl,
        },
        about: 'Cotización asistida de cupo internacional disponible a pesos chilenos',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ];

    let script = document.getElementById('ld-json-bancos-tarjetas') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-json-bancos-tarjetas';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.getElementById('ld-json-bancos-tarjetas')?.remove();
    };
  }, [canonicalUrl, description, faqItems, page, siteUrl, title]);

  if (!page) {
    return <HubView faqItems={faqItems} />;
  }

  return <SpecificView page={page} faqItems={faqItems} />;
}

function HubView({ faqItems }: { faqItems: typeof hubFaqs }) {
  const whatsappMessage = 'Hola, quiero cotizar mi cupo internacional disponible e indicar mi banco o tarjeta para revisar el caso.';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="hero-gradient py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary mb-5">
                  <CreditCard className="w-4 h-4" />
                  Bancos y tarjetas
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Cupo en dólares según banco o tarjeta
                </h1>
                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-3xl mb-8">
                  Revisa qué considerar si tienes BancoEstado, Santander, Banco de Chile, BCI, Scotiabank, Itaú, CMR Falabella, Visa, Mastercard u otra tarjeta con cupo internacional disponible.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seo_bancos_tarjetas_hub_hero', whatsappMessage)}
                  >
                    Cotizar por WhatsApp
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a
                    href="#listado"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver bancos y tarjetas
                  </a>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <ShieldCheck className="w-10 h-10 text-primary mb-5" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  Revisión caso a caso, sin relación oficial con marcas
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  El banco, emisor o marca de tarjeta ayuda a entender el caso, pero no implica convenio, representación ni aprobación automática. La cotización depende de cupo disponible, monto, límites y condiciones vigentes.
                </p>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-secondary-foreground">
                  EnPesos.cl no es banco, no representa a bancos ni emisores, y no tiene relación oficial con Visa, Mastercard ni CMR Falabella.
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="listado" className="py-14 sm:py-18 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Listado</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Páginas por banco, emisor o marca de tarjeta
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Elige tu banco o tarjeta para ver qué información revisar antes de cotizar cupo en dólares a pesos chilenos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pageList.map((item) => (
                <a
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group rounded-3xl border border-border bg-card p-6 hover:-translate-y-1 hover:card-shadow transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                    {item.category === 'Banco' ? <Landmark className="w-6 h-6 text-primary" /> : <CreditCard className="w-6 h-6 text-primary" />}
                  </div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary mb-3">{item.category}</p>
                  <h3 className="text-xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors">
                    Cupo en dólares {item.shortName}
                  </h3>
                  <p className="text-sm text-secondary-foreground leading-relaxed mb-5">{item.consideration}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                    Ver guía
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Antes de cotizar</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Qué puede cambiar según banco o tarjeta
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  La cotización no depende solo del nombre de la tarjeta. También influyen el cupo internacional disponible, el monto, límites, tipo de tarjeta, marca, banco o emisor y condiciones del momento.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {['Banco o emisor', 'Marca de tarjeta', 'Cupo internacional disponible', 'Monto y condiciones del caso'].map((item) => (
                  <div key={item} className="rounded-3xl border border-border bg-background p-5">
                    <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                    <h3 className="font-extrabold text-foreground">{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FaqSection title="Preguntas frecuentes sobre bancos y tarjetas" faqItems={faqItems} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function SpecificView({ page, faqItems }: { page: PageConfig; faqItems: ReturnType<typeof getSpecificFaqs> }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="hero-gradient py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 items-center">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary mb-5">
                  {page.category === 'Banco' ? <Landmark className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                  {page.category}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Cupo en dólares {page.shortName}: cotiza a pesos chilenos por WhatsApp
                </h1>
                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-3xl mb-7">
                  {page.intro}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp(`seo_banco_tarjeta_${page.key}_hero`, page.whatsappMessage)}
                  >
                    Cotizar por WhatsApp
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a
                    href="#seguridad"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Revisar seguridad
                  </a>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <WalletCards className="w-10 h-10 text-primary mb-5" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  La cotización depende del caso, no solo de {page.shortName}
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  {page.consideration} Por eso primero se revisa información básica y luego se informa una cotización previa.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>No necesitas entregar claves bancarias.</span>
                  </li>
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Cotizar no te obliga a avanzar.</span>
                  </li>
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>No se promete compatibilidad antes de revisar.</span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Proceso</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cómo cotizar cupo en dólares {page.shortName}
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                El proceso busca que revises una estimación antes de decidir. No es un préstamo, no aumenta tu línea y no reemplaza las condiciones de tu banco o emisor.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, index) => (
                <div key={step} className="rounded-3xl border border-border bg-card p-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold mb-5">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-3">{step}</h3>
                  <p className="text-secondary-foreground leading-relaxed">
                    {index === 0 && `Nos cuentas si tu caso corresponde a ${page.shortName}, el monto aproximado y si tienes cupo internacional disponible.`}
                    {index === 1 && 'Se revisan datos necesarios para orientar la cotización, sin pedir claves, token ni acceso a tus cuentas.'}
                    {index === 2 && 'Antes de avanzar ves el monto estimado en pesos chilenos, costos y condiciones relevantes.'}
                    {index === 3 && 'Puedes comparar, preguntar y decidir con más información. Cotizar no te obliga a operar.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="seguridad" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Seguridad</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Qué revisar antes de usar tu cupo internacional
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  Si tienes {page.name}, lo prudente es confirmar primero costos, monto estimado, condiciones de la tarjeta y forma de pago posterior. Evita cualquier solicitud de información sensible.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <ul className="space-y-4">
                  {safetyItems.map((item) => (
                    <li key={item} className="flex gap-3 text-secondary-foreground">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/es-seguro-cambiar-cupo-en-dolares-a-pesos"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline underline-offset-4"
                >
                  Ver guía completa de seguridad
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <AlertTriangle className="w-10 h-10 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 mb-3">Disclaimer importante</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    EnPesos.cl no representa a {page.shortName}
                  </h2>
                  <p className="text-secondary-foreground leading-relaxed">
                    EnPesos.cl no es banco, no es emisor de tarjetas, no representa a bancos, Visa, Mastercard ni CMR Falabella, y no tiene relación oficial con {page.shortName}. Esta página solo entrega información para solicitar una cotización asistida por WhatsApp usando cupo internacional disponible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Más bancos y tarjetas</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                También puedes revisar otros casos
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {pageList.map((item) => (
                <a
                  key={item.slug}
                  href={`/${item.slug}`}
                  className={`rounded-full border px-5 py-3 text-sm font-bold transition-colors ${
                    item.key === page.key
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {item.shortName}
                </a>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a href="/bancos-y-tarjetas-cupo-en-dolares" className="inline-flex items-center gap-2 font-bold text-primary hover:underline underline-offset-4">
                Ver hub de bancos y tarjetas
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        <FaqSection title={`Preguntas frecuentes sobre cupo en dólares ${page.shortName}`} faqItems={faqItems} />

        <section className="py-14 sm:py-18 bg-primary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
            <Building2 className="w-10 h-10 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Cotiza tu cupo en dólares {page.shortName}
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-7 text-primary-foreground/90">
              Escríbenos por WhatsApp, indica tu banco o tarjeta y revisamos una cotización previa. Tú decides si avanzar después de conocer la información.
            </p>
            <Button
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-bold"
              onClick={() => openWhatsApp(`seo_banco_tarjeta_${page.key}_final`, page.whatsappMessage)}
            >
              Revisar mi caso por WhatsApp
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function FaqSection({ title, faqItems }: { title: string; faqItems: { question: string; answer: string }[] }) {
  return (
    <section className="py-14 sm:py-18 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">{title}</h2>
        </div>
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-border bg-card p-5 open:card-shadow">
              <summary className="cursor-pointer list-none text-lg font-extrabold text-foreground flex items-start justify-between gap-4">
                {faq.question}
                <span className="text-primary group-open:rotate-90 transition-transform">›</span>
              </summary>
              <p className="text-secondary-foreground leading-relaxed mt-3">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
