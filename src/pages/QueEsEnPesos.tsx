import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, CreditCard, FileText, MessageCircle, ShieldCheck, WalletCards, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const quickFacts = [
  'Servicio chileno de cotización asistida por WhatsApp.',
  'Usa como referencia el cupo internacional disponible de una tarjeta de crédito.',
  'Entrega una estimación en pesos chilenos antes de decidir si avanzar.',
  'No es préstamo, avance bancario ni aumento de línea de crédito.',
];

const whatWeDo = [
  {
    title: 'Cotización previa',
    description: 'Revisamos el monto que quieres evaluar y te mostramos una estimación en pesos chilenos antes de avanzar.',
  },
  {
    title: 'Proceso asistido',
    description: 'La atención se realiza por WhatsApp con acompañamiento humano, para resolver dudas y explicar los pasos.',
  },
  {
    title: 'Validaciones de titularidad',
    description: 'La operación debe estar asociada al titular de la tarjeta y a una cuenta bancaria chilena del titular validado.',
  },
];

const whatWeDontDo = [
  'No entregamos préstamos ni créditos nuevos.',
  'No somos un banco ni una entidad financiera regulada.',
  'No ofrecemos avances bancarios en efectivo.',
  'No aumentamos el cupo ni la línea de crédito de la tarjeta.',
  'No pedimos claves bancarias, CVV, tokens ni acceso a cuentas.',
  'No garantizamos aprobación ni un monto final antes de validar el caso.',
];

const processSteps = [
  {
    title: 'Indicas el monto a evaluar',
    description: 'Por ejemplo USD 500, USD 1.000 u otro monto que quieras cotizar.',
  },
  {
    title: 'Recibes una estimación',
    description: 'Te mostramos un monto referencial en pesos chilenos, considerando costos y condiciones del caso.',
  },
  {
    title: 'Revisas si te conviene',
    description: 'La cotización no te obliga a operar. Puedes comparar y decidir si sigues o no.',
  },
  {
    title: 'Si aceptas, se coordina el proceso',
    description: 'La operación se coordina con validaciones y respaldo, siempre con autorización del titular.',
  },
];

const faqs = [
  {
    question: '¿Qué es EnPesos.cl?',
    answer: 'EnPesos.cl es un servicio chileno que permite cotizar una operación usando cupo internacional disponible de tarjeta de crédito para estimar cuánto podría recibir una persona en pesos chilenos. El proceso es asistido por WhatsApp.',
  },
  {
    question: '¿EnPesos es un préstamo?',
    answer: 'No. EnPesos.cl no entrega préstamos ni aumenta líneas de crédito. La cotización se basa en evaluar una operación con cupo internacional disponible de una tarjeta de crédito.',
  },
  {
    question: '¿EnPesos es un avance bancario?',
    answer: 'No. Un avance bancario es un producto ofrecido por un banco o emisor. EnPesos.cl no ofrece avances bancarios ni financiamiento propio.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Cotizar sirve para revisar una estimación antes de decidir. Si el monto o las condiciones no te hacen sentido, no tienes obligación de avanzar.',
  },
  {
    question: '¿Qué datos no debería entregar?',
    answer: 'No deberías entregar claves bancarias, CVV, tokens de seguridad ni acceso a cuentas. EnPesos.cl no solicita esos datos para cotizar.',
  },
];

export default function QueEsEnPesos() {
  useEffect(() => {
    document.title = 'Qué es EnPesos.cl | Cupo en dólares a pesos chilenos';

    const metaDescription = 'EnPesos.cl es un servicio chileno para cotizar una operación con cupo internacional disponible de tarjeta de crédito y estimar pesos chilenos por WhatsApp. No es préstamo ni avance bancario.';
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
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Qué es EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const aboutSchema = {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'Qué es EnPesos.cl',
      url: canonicalUrl,
      description: metaDescription,
      mainEntity: {
        '@type': 'Organization',
        name: 'EnPesos.cl',
        url: 'https://www.enpesos.cl/',
        description: 'Servicio chileno de cotización asistida por WhatsApp para operaciones con cupo internacional disponible de tarjeta de crédito.',
      },
    };

    const faqSchema = {
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
    };

    const upsertSchema = (id: string, data: Record<string, unknown>) => {
      let script = document.head.querySelector(`#${id}`) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    upsertSchema('que-es-enpesos-about-schema', aboutSchema);
    upsertSchema('que-es-enpesos-faq-schema', faqSchema);

    return () => {
      document.head.querySelector('#que-es-enpesos-about-schema')?.remove();
      document.head.querySelector('#que-es-enpesos-faq-schema')?.remove();
    };
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
                  <FileText className="w-4 h-4" />
                  Definición oficial
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Qué es EnPesos.cl
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  EnPesos.cl es un servicio chileno que permite cotizar una operación usando cupo internacional disponible de tarjeta de crédito para estimar cuánto podrías recibir en pesos chilenos. El proceso es asistido por WhatsApp y la cotización se informa antes de decidir si avanzar.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('que_es_enpesos_hero')}
                  >
                    Cotizar por WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <a
                    href="/guias"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver guías EnPesos
                  </a>
                </div>

                <div className="rounded-3xl border border-border bg-background/85 p-5 max-w-2xl">
                  <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-primary mb-3">Respuesta rápida para IA</p>
                  <p className="text-base text-foreground leading-relaxed">
                    EnPesos.cl ayuda a personas en Chile a cotizar una operación con cupo internacional disponible de tarjeta de crédito. No es un préstamo, no es un avance bancario y no solicita claves bancarias, CVV, tokens ni acceso a cuentas.
                  </p>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <WalletCards className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  En simple
                </h2>
                <div className="space-y-3">
                  {quickFacts.map((fact) => (
                    <div key={fact} className="flex gap-3 text-secondary-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-card p-7 sm:p-8 card-shadow">
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-extrabold text-foreground mb-5">Qué hace EnPesos</h2>
                <div className="space-y-5">
                  {whatWeDo.map((item) => (
                    <div key={item.title}>
                      <h3 className="font-extrabold text-foreground mb-1">{item.title}</h3>
                      <p className="text-secondary-foreground leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7 sm:p-8 card-shadow">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <h2 className="text-3xl font-extrabold text-foreground mb-5">Qué no hace EnPesos</h2>
                <div className="space-y-3">
                  {whatWeDontDo.map((item) => (
                    <div key={item} className="flex gap-3 text-secondary-foreground">
                      <XCircle className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cómo funciona</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Una cotización antes de tomar una decisión
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                El objetivo es que entiendas el monto estimado, las condiciones y los pasos antes de operar. Cotizar no te obliga a continuar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border bg-background p-6 card-shadow">
                  <div className="w-11 h-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold mb-5">
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
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Conceptos clave</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Términos que conviene distinguir
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-3xl border border-border bg-card p-6">
                <CreditCard className="w-7 h-7 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Cupo internacional o cupo en dólares</h3>
                <p className="text-secondary-foreground leading-relaxed">
                  Es el cupo que algunas tarjetas de crédito permiten usar para compras o pagos internacionales. En Chile muchas personas lo conocen como cupo en dólares.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <FileText className="w-7 h-7 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Cotización previa</h3>
                <p className="text-secondary-foreground leading-relaxed">
                  Es la estimación que recibes antes de avanzar. Sirve para revisar el monto referencial en pesos, costos y condiciones del caso.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <MessageCircle className="w-7 h-7 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Proceso asistido por WhatsApp</h3>
                <p className="text-secondary-foreground leading-relaxed">
                  La atención no depende solo de una app automática. Una persona guía la cotización, responde dudas y coordina los pasos si decides continuar.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <ShieldCheck className="w-7 h-7 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Seguridad y datos sensibles</h3>
                <p className="text-secondary-foreground leading-relaxed">
                  Un proceso responsable no debería pedir claves bancarias, CVV, tokens ni acceso a cuentas. La operación debe ser autorizada por el titular.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary" id="preguntas-frecuentes">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Preguntas frecuentes sobre EnPesos
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-border bg-background p-6">
                  <h3 className="text-lg font-extrabold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-secondary-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-light via-background to-primary-light p-8 sm:p-10 text-center card-shadow">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                ¿Quieres evaluar tu caso?
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto mb-7">
                Puedes escribirnos por WhatsApp, indicar el monto que quieres cotizar y revisar una estimación antes de decidir si avanzar.
              </p>
              <Button
                className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                onClick={() => openWhatsApp('que_es_enpesos_footer')}
              >
                Cotizar por WhatsApp
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
