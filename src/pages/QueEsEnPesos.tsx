import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, HelpCircle, MessageCircle, WalletCards, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const faqs = [
  {
    question: '¿Qué es EnPesos?',
    answer:
      'EnPesos.cl es un servicio chileno que permite revisar una estimación en pesos chilenos usando como referencia el cupo internacional disponible de una tarjeta de crédito. El proceso es asistido por WhatsApp y la cotización se informa antes de avanzar.',
  },
  {
    question: '¿EnPesos es un préstamo?',
    answer:
      'No. EnPesos no entrega préstamos, no aumenta líneas de crédito y no funciona como un avance bancario. La operación se evalúa usando cupo internacional ya disponible en una tarjeta de crédito.',
  },
  {
    question: '¿EnPesos pide claves bancarias, CVV o tokens?',
    answer:
      'No. EnPesos no solicita claves bancarias, CVV, tokens ni acceso a cuentas bancarias. El proceso se realiza con autorización del titular y con revisión previa.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer:
      'No. La cotización sirve para que revises el monto estimado en pesos chilenos antes de tomar una decisión. Si no te conviene, no tienes obligación de continuar.',
  },
  {
    question: '¿Qué necesito para revisar una cotización?',
    answer:
      'Necesitas tener una tarjeta de crédito con cupo internacional disponible y ser titular de la tarjeta y de la cuenta bancaria donde se recibirían los pesos si la operación se completa.',
  },
];

const howItWorks = [
  {
    title: 'Indicas un monto a revisar',
    description: 'Puedes preguntar por USD 500, USD 1.000 u otro monto referencial.',
  },
  {
    title: 'Recibes una estimación',
    description: 'Te mostramos el monto estimado en pesos chilenos antes de avanzar.',
  },
  {
    title: 'Se revisa la operación',
    description: 'Validamos titularidad, cupo disponible y condiciones básicas del caso.',
  },
  {
    title: 'Decides si continuar',
    description: 'La cotización no te obliga. Solo avanzas si el monto te hace sentido.',
  },
];

const whatWeDo = [
  'Cotizar operaciones usando cupo internacional disponible de tarjeta de crédito.',
  'Informar una estimación en pesos chilenos antes de avanzar.',
  'Acompañar el proceso por WhatsApp con atención humana.',
  'Explicar costos, monto neto y condiciones básicas de forma clara.',
];

const whatWeDontDo = [
  'No entregamos préstamos ni créditos nuevos.',
  'No somos un banco ni aumentamos tu línea de crédito.',
  'No ofrecemos avances bancarios en efectivo.',
  'No pedimos claves bancarias, CVV, tokens ni acceso a cuentas.',
];

export default function QueEsEnPesos() {
  useEffect(() => {
    document.title = 'Qué es EnPesos | Cupo en dólares a pesos chilenos';

    const metaDescription =
      'Conoce qué es EnPesos.cl, cómo funciona la cotización con cupo internacional disponible y por qué no es un préstamo ni un avance bancario.';
    const canonicalUrl = 'https://www.enpesos.cl/que-es-enpesos';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Qué es EnPesos | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Qué es EnPesos',
        description: metaDescription,
        url: canonicalUrl,
        mainEntity: {
          '@type': 'Organization',
          name: 'EnPesos.cl',
          url: 'https://www.enpesos.cl/',
          description:
            'EnPesos.cl permite revisar una estimación en pesos chilenos usando como referencia el cupo internacional disponible de una tarjeta de crédito. No es un préstamo ni un avance bancario.',
        },
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

    let script = document.head.querySelector('#que-es-enpesos-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'que-es-enpesos-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="hero-gradient py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary mb-5">
                  <HelpCircle className="w-4 h-4" />
                  Guía rápida
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Qué es EnPesos y cómo funciona
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  EnPesos.cl te permite revisar una estimación en pesos chilenos usando como referencia el cupo internacional disponible de tu tarjeta de crédito. El proceso es asistido por WhatsApp y la cotización se informa antes de avanzar.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('que_es_enpesos_hero')}
                  >
                    Cotizar por WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Link
                    to="/guias"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver guías
                  </Link>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">No es préstamo</p>
                    <p className="text-xs text-muted-foreground mt-1">No se crea un crédito nuevo.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Cotización previa</p>
                    <p className="text-xs text-muted-foreground mt-1">Primero revisas el monto estimado.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Sin claves</p>
                    <p className="text-xs text-muted-foreground mt-1">No pedimos acceso a tus cuentas.</p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <WalletCards className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">Resumen claro</h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  EnPesos.cl te permite revisar una estimación en pesos chilenos usando como referencia el cupo internacional disponible de tu tarjeta. No es un préstamo, no es un avance bancario y no solicita claves bancarias, CVV, tokens ni acceso a cuentas.
                </p>

                <div className="space-y-3">
                  {whatWeDo.slice(0, 3).map((item) => (
                    <div key={item} className="flex gap-2 text-sm text-secondary-foreground">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">En simple</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Qué debes saber antes de cotizar
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                La idea es que entiendas el proceso antes de tomar una decisión. Por eso separamos claramente lo que EnPesos hace y lo que no hace.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-secondary p-6 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-5">Qué hace EnPesos</h3>
                <div className="space-y-4">
                  {whatWeDo.map((item) => (
                    <div key={item} className="flex gap-3 text-secondary-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-5">Qué no hace EnPesos</h3>
                <div className="space-y-4">
                  {whatWeDontDo.map((item) => (
                    <div key={item} className="flex gap-3 text-secondary-foreground">
                      <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Proceso</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cómo funciona en 4 pasos
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border bg-background p-6 card-shadow">
                  <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold mb-5">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground mb-3">{step.title}</h3>
                  <p className="text-sm text-secondary-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Dudas comunes sobre EnPesos
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-3xl border border-border bg-secondary p-6 sm:p-7">
                  <h3 className="text-lg font-extrabold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-secondary-foreground leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-5 text-primary-foreground" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              ¿Quieres revisar una cotización?
            </h2>
            <p className="text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto mb-7">
              Puedes escribir por WhatsApp, indicar el monto que quieres revisar y recibir una estimación clara antes de decidir.
            </p>
            <Button
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-bold"
              onClick={() => openWhatsApp('que_es_enpesos_cta')}
            >
              Cotizar por WhatsApp
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
