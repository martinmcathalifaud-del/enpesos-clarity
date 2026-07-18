import { useEffect } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, CreditCard, FileText, MessageCircle, ShieldCheck, WalletCards, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const steps = [
  {
    title: 'Cotizas un monto en dólares',
    description: 'Nos indicas cuánto cupo internacional quieres evaluar, por ejemplo USD 500, USD 1.000 o USD 2.000.',
  },
  {
    title: 'Revisamos el caso antes de avanzar',
    description: 'La operación depende de tu tarjeta, banco, cupo disponible, validaciones y costos aplicables al momento de cotizar.',
  },
  {
    title: 'Recibes el neto estimado en pesos',
    description: 'Te informamos cuánto recibirías en tu cuenta bancaria, descontando comisión y costos del proceso.',
  },
  {
    title: 'Decides si te conviene',
    description: 'La cotización no te obliga a operar. Si el monto final no hace sentido para ti, lo correcto es no continuar.',
  },
];

const goodFit = [
  'Tienes tarjeta de crédito emitida en Chile.',
  'Tienes cupo internacional o cupo en dólares disponible.',
  'Necesitas liquidez puntual y quieres comparar alternativas.',
  'Quieres saber el monto neto antes de tomar una decisión.',
];

const badFit = [
  'No eres titular de la tarjeta o de la cuenta bancaria.',
  'Necesitas que alguien te apruebe un crédito nuevo.',
  'Quieres operar sin revisar costos o condiciones.',
  'Tu banco o tarjeta no permite completar la operación evaluada.',
];

const deepDiveSections = [
  {
    heading: "Por qué se usa la expresión 'vender cupo en dólares'",
    paragraphs: [
      "La expresión 'vender cupo en dólares' es una forma coloquial que muchas personas usan para buscar esta alternativa en internet, aunque técnicamente no se vende ninguna tarjeta ni línea de crédito. Lo que ocurre es que se cotiza una operación usando el cupo internacional disponible de tu tarjeta, para recibir un monto estimado en pesos chilenos.",
      'EnPesos no compra tu cupo ni tu tarjeta, y tampoco aumenta el cupo internacional que el banco o emisor ya te aprobó. Solo ayuda a cotizar una operación asistida caso a caso.',
    ],
  },
  {
    heading: 'Qué revisar antes de cotizar',
    paragraphs: [
      'Antes de pedir una cotización, conviene revisar cuánto cupo internacional aparece disponible en tu tarjeta, si eres el titular de la tarjeta y de la cuenta bancaria donde recibirías los pesos, y si tienes claridad sobre cómo pagarás después el cargo que puede generarse.',
      'También conviene comparar el monto neto estimado con otras alternativas, en vez de fijarte solo en el porcentaje de comisión que menciona cada servicio.',
    ],
  },
  {
    heading: 'Qué información se pide y qué no se pide',
    paragraphs: [
      'Para orientar una cotización normalmente se piden datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
      'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp.',
    ],
  },
  {
    heading: 'Qué pasa con tu tarjeta después de la operación',
    paragraphs: [
      'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, según las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total.',
      'EnPesos no define esas condiciones ni puede prometer un tiempo exacto de confirmación para cada caso. WhatsApp es el canal para resolver dudas y coordinar la cotización, no una promesa de tasa o aprobación.',
    ],
  },
];

const faqs = [
  {
    question: '¿Qué significa vender cupo en dólares?',
    answer: 'Es una forma informal de referirse a cotizar una operación usando el cupo internacional disponible de una tarjeta de crédito para recibir un monto en pesos chilenos. EnPesos no compra tu tarjeta ni aumenta tu cupo; solo te ayuda a evaluar una operación caso a caso.',
  },
  {
    question: '¿EnPesos compra mi cupo en dólares?',
    answer: 'No compramos tu tarjeta ni tu línea de crédito. Lo que hacemos es ayudarte a cotizar una operación con tu cupo internacional disponible, informando el monto neto estimado antes de avanzar.',
  },
  {
    question: '¿Cuánto me descuentan por vender cupo en dólares?',
    answer: 'El descuento depende del monto, costos del proceso, banco, tarjeta y condiciones vigentes al momento de cotizar. Por eso siempre debes mirar el neto que recibirías en pesos, no solo el porcentaje de comisión.',
  },
  {
    question: '¿Es un préstamo o avance en efectivo?',
    answer: 'No. EnPesos no ofrece préstamos, avances en efectivo ni financiamiento. La operación se evalúa sobre cupo internacional que ya tienes disponible en tu tarjeta de crédito.',
  },
  {
    question: '¿Puedo usar los pesos para lo que quiera?',
    answer: 'Si la operación se completa, recibes pesos chilenos en tu cuenta bancaria. Luego puedes usarlos según tus necesidades, igual que cualquier saldo disponible en tu cuenta.',
  },
  {
    question: '¿Piden claves bancarias o acceso a mi cuenta?',
    answer: 'No. No pedimos claves bancarias, token de acceso ni datos para entrar a tu banco. El proceso debe realizarse con autorización del titular y con respaldo de la operación.',
  },
];

export default function VenderCupoDolaresChile() {
  useEffect(() => {
    document.title = 'Vender cupo en dólares en Chile | Cómo funciona | EnPesos.cl';

    const metaDescription = 'Guía para entender qué significa vender cupo en dólares en Chile, cómo se cotiza una operación con cupo internacional, qué costos mirar y qué precauciones tomar antes de avanzar.';
    const canonicalUrl = 'https://www.enpesos.cl/vender-cupo-en-dolares-chile';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Vender cupo en dólares en Chile | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = {
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

    let script = document.head.querySelector('#vender-cupo-dolares-faq-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'vender-cupo-dolares-faq-schema';
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
                  <WalletCards className="w-4 h-4" />
                  Guía sobre cupo en dólares
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Vender cupo en dólares: cómo funciona en Chile
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Si buscaste “vender cupo en dólares”, probablemente quieres entender cómo transformar cupo internacional disponible en pesos chilenos. EnPesos.cl te ayuda a cotizar una operación antes de avanzar, mostrando el monto neto estimado y los costos incluidos.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seo_vender_cupo_hero')}
                  >
                    Cotizar mi cupo por WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <a
                    href="#como-funciona"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver pasos y costos
                  </a>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Cotización previa</p>
                    <p className="text-xs text-muted-foreground mt-1">Primero ves cuánto recibirías.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">No es crédito nuevo</p>
                    <p className="text-xs text-muted-foreground mt-1">Usa cupo ya disponible.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Sin claves</p>
                    <p className="text-xs text-muted-foreground mt-1">No pedimos acceso al banco.</p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <MessageCircle className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                  En simple: no se trata de vender tu tarjeta
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  La expresión “vender cupo en dólares” se usa porque muchas personas buscan así esta alternativa. En la práctica, lo que puedes hacer es cotizar una operación con tu cupo internacional disponible y recibir pesos chilenos en tu cuenta si aceptas las condiciones.
                </p>

                <div className="rounded-[2rem] border border-border bg-secondary p-3 sm:p-4">
                  <div className="rounded-[1.5rem] bg-background overflow-hidden border border-border">
                    <div className="bg-primary px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-foreground/95 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-primary-foreground">Cotización EnPesos</p>
                        <p className="text-xs text-primary-foreground/80">Antes de operar</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]">
                      <div className="max-w-[86%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">Tengo USD 1.000 de cupo. ¿Cuánto me llega en pesos?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">Lo revisamos y te damos el neto estimado, con comisión y costos incluidos.</p>
                      </div>
                      <div className="max-w-[84%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">¿Y si no me conviene?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">No avanzas. Cotizar no te obliga a operar.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Definición clara</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                ¿Qué significa realmente vender cupo en dólares?
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                En Chile, algunas personas llaman “vender cupo en dólares” a usar el cupo internacional disponible de una tarjeta de crédito para obtener pesos chilenos. La clave no es el nombre, sino entender el neto que recibirías, los costos, las condiciones y si la operación te conviene frente a otras alternativas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-border p-6 bg-card">
                <CreditCard className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Usas cupo existente</h3>
                <p className="text-secondary-foreground leading-relaxed">No es solicitar una nueva línea de crédito. La operación depende del cupo internacional que ya tengas disponible.</p>
              </div>
              <div className="rounded-3xl border border-border p-6 bg-card">
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Miras el neto final</h3>
                <p className="text-secondary-foreground leading-relaxed">Lo relevante no es solo el porcentaje de comisión. Lo importante es cuánto recibirías finalmente en pesos.</p>
              </div>
              <div className="rounded-3xl border border-border p-6 bg-card">
                <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Decides informado</h3>
                <p className="text-secondary-foreground leading-relaxed">Una buena cotización debe mostrar costos, requisitos y pasos antes de pedirte avanzar.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Proceso</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cómo funciona una cotización de cupo en dólares
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                La lógica correcta es simple: primero cotizas, después decides. No deberías avanzar sin saber cuánto recibirías y qué costos están incluidos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border bg-background p-6 sm:p-7">
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

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">Cuándo podría tener sentido cotizar</h2>
                <div className="space-y-4">
                  {goodFit.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <p className="text-secondary-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center mb-5">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">Cuándo no deberías avanzar</h2>
                <div className="space-y-4">
                  {badFit.map((item) => (
                    <div key={item} className="flex gap-3">
                      <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <p className="text-secondary-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-background p-7 sm:p-10 card-shadow">
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Costos</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    El dato importante es cuánto recibes, no solo la comisión
                  </h2>
                  <p className="text-lg text-secondary-foreground leading-relaxed">
                    Dos servicios pueden hablar de comisiones distintas y aun así entregar montos netos parecidos, porque también pueden existir costos de procesamiento, tipo de cambio, banco o validaciones. Por eso, antes de comparar, pide siempre el monto final que recibirías en pesos chilenos.
                  </p>
                </div>
                <div className="rounded-3xl bg-primary-light p-6 min-w-[240px]">
                  <FileText className="w-8 h-8 text-primary mb-4" />
                  <p className="text-sm font-bold text-primary mb-1">Pregunta clave</p>
                  <p className="text-2xl font-extrabold text-foreground">¿Cuánto me llega?</p>
                  <p className="text-sm text-secondary-foreground mt-2">Esa es la comparación correcta antes de operar.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">A fondo</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Lo que conviene entender antes de cotizar
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

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Dudas comunes antes de vender o cambiar cupo en dólares
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
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

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-secondary p-7 sm:p-10 text-center card-shadow">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Guía relacionada</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                También puedes revisar cómo convertir cupo en dólares a pesos chilenos
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto mb-7">
                Si quieres una explicación más directa sobre la conversión de cupo internacional a pesos, revisa la primera guía del clúster.
              </p>
              <a
                href="/cupo-en-dolares-a-pesos-chilenos"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground button-shadow hover:bg-primary/90 transition-colors"
              >
                Ver guía: cupo en dólares a pesos
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
