import { useEffect } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Eye, FileCheck, LockKeyhole, MessageCircle, ShieldCheck, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const safeSignals = [
  {
    title: 'No deberían pedirte claves bancarias',
    description: 'Nunca entregues clave del banco, clave de internet, token, coordenadas, acceso remoto ni permisos para entrar a tus cuentas.',
  },
  {
    title: 'Debes conocer el monto neto antes de operar',
    description: 'No basta con que te hablen de una comisión. Lo importante es cuánto recibirías finalmente en pesos chilenos.',
  },
  {
    title: 'La operación debe hacerse con el titular',
    description: 'La cotización debe estar asociada a una persona que pueda acreditar titularidad y autorización sobre la tarjeta y la cuenta bancaria.',
  },
  {
    title: 'Debe existir trazabilidad',
    description: 'La conversación, cotización, condiciones y comprobantes deben quedar claros antes y después de la operación.',
  },
  {
    title: 'No deberían presionarte',
    description: 'Si alguien te apura con urgencia excesiva o evita responder preguntas, es mejor detenerse y revisar con calma.',
  },
  {
    title: 'Tienes que entender los costos',
    description: 'Dólar del día, procesamiento, comisión del servicio y condiciones del caso deben estar considerados en el neto informado.',
  },
];

const enpesosProcess = [
  'Atención humana por WhatsApp antes de avanzar.',
  'Cotización previa con el monto estimado que recibirías en pesos.',
  'No pedimos claves bancarias ni acceso a tus cuentas.',
  'Explicamos que el neto puede variar según dólar, monto, costos y condiciones del caso.',
  'Si el monto no te conviene, no tienes obligación de continuar.',
  'Validamos que la operación tenga sentido para el titular de la tarjeta y cuenta bancaria.',
];

const warningSigns = [
  'Te prometen un monto fijo sin cotizar tu caso.',
  'Te piden claves bancarias, token, coordenadas o acceso remoto.',
  'Te piden enviar fotos completas de tu tarjeta por ambos lados.',
  'No te explican costos ni cuánto recibirías neto.',
  'Solo hablan de comisión, pero no del monto final depositado.',
  'No tienen sitio web, correo o datos comerciales claros.',
  'Te presionan para operar rápido sin dejarte revisar.',
  'La oferta suena demasiado buena para ser real.',
];

const comparisonRows = [
  ['Te informa el monto neto antes de decidir', 'Solo habla de comisión o promete un monto sin respaldo'],
  ['No pide claves bancarias ni acceso a cuentas', 'Pide claves, token, coordenadas o acceso remoto'],
  ['Explica costos de procesamiento y comisión', 'Oculta costos o los informa después'],
  ['Trabaja con titularidad y respaldo', 'Opera sin validar titularidad ni autorización'],
  ['Te deja decidir sin presión', 'Te apura o evita responder preguntas'],
];

const faqs = [
  {
    question: '¿Es seguro cambiar cupo en dólares a pesos?',
    answer: 'Puede ser seguro si el proceso se hace con el titular, con cotización previa, sin pedir claves bancarias, sin acceso a cuentas y con trazabilidad. No conviene avanzar si no entiendes el monto neto, los costos o quién está detrás del servicio.',
  },
  {
    question: '¿EnPesos pide claves bancarias?',
    answer: 'No. EnPesos no pide claves bancarias, token de acceso, coordenadas ni acceso a tus cuentas. Si alguien te pide esos datos, es una señal de alerta.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. La cotización sirve para saber cuánto recibirías aproximadamente en pesos chilenos. Si el monto no te conviene o prefieres no avanzar, no tienes obligación de continuar.',
  },
  {
    question: '¿Qué datos se revisan para cotizar?',
    answer: 'Normalmente se revisa el monto que quieres cotizar, que tengas cupo internacional disponible y condiciones generales del caso. No deberías entregar claves bancarias ni acceso a tus cuentas para recibir una cotización.',
  },
  {
    question: '¿Es un préstamo o avance en efectivo?',
    answer: 'No. EnPesos no entrega préstamos, créditos ni avances bancarios. La operación se evalúa usando cupo internacional ya disponible en una tarjeta de crédito.',
  },
  {
    question: '¿Es legal cambiar cupo en dólares?',
    answer: 'La operación debe realizarse con autorización del titular, trazabilidad y sin uso indebido de datos bancarios. EnPesos no actúa como banco ni entrega financiamiento. Si tienes dudas legales o tributarias específicas, conviene revisarlas con un asesor.',
  },
];

export default function SeguroCambiarCupoDolares() {
  useEffect(() => {
    document.title = '¿Es seguro cambiar cupo en dólares a pesos? | EnPesos.cl';

    const metaDescription = 'Aprende qué revisar antes de cambiar cupo en dólares a pesos chilenos: claves bancarias, cotización previa, monto neto, señales de alerta y proceso seguro.';
    const canonicalUrl = 'https://www.enpesos.cl/es-seguro-cambiar-cupo-en-dolares-a-pesos';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: '¿Es seguro cambiar cupo en dólares a pesos?' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
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

    let script = document.head.querySelector('#seguro-cupo-dolares-faq-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'seguro-cupo-dolares-faq-schema';
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
            <div className="grid lg:grid-cols-[1fr_0.95fr] gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary mb-5">
                  <ShieldCheck className="w-4 h-4" />
                  Seguridad antes de cotizar
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  ¿Es seguro cambiar cupo en dólares a pesos?
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Si tienes cupo internacional disponible y estás evaluando convertirlo a pesos chilenos, es normal tener dudas. Antes de avanzar, deberías entender qué datos te van a pedir, cómo se informa el monto neto y qué señales de alerta revisar.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seguridad_cupo_hero')}
                  >
                    Resolver dudas por WhatsApp
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a
                    href="#senales-seguras"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver señales seguras
                  </a>
                </div>

                <div className="rounded-3xl border border-border bg-background/80 p-5 max-w-2xl">
                  <p className="text-sm font-bold text-primary mb-2">Respuesta corta</p>
                  <p className="text-secondary-foreground leading-relaxed">
                    Puede ser seguro si se realiza con el titular, con cotización previa, sin pedir claves bancarias, sin acceso a cuentas y dejando claro el monto neto que recibirías antes de decidir.
                  </p>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm font-bold text-primary mb-1">Checklist rápido</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Antes de operar</h2>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                    <LockKeyhole className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    '¿Te informaron cuánto recibirías neto?',
                    '¿Te explicaron los costos del proceso?',
                    '¿No te pidieron claves bancarias?',
                    '¿Puedes decidir sin presión?',
                  ].map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <p className="text-sm sm:text-base text-foreground font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-2xl bg-secondary p-4">
                  <p className="text-sm font-bold text-foreground mb-1">Regla simple</p>
                  <p className="text-sm text-muted-foreground">
                    Si no entiendes el monto neto, los costos o quién está detrás del servicio, no avances todavía.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="senales-seguras" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Proceso responsable</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Señales de que el proceso está bien planteado
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                La seguridad no depende de una frase como “confía en nosotros”. Depende de que el proceso tenga límites claros, cotización previa, titularidad y trazabilidad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {safeSignals.map((signal) => (
                <div key={signal.title} className="rounded-3xl border border-border bg-card p-6">
                  <CheckCircle2 className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-xl font-extrabold text-foreground mb-2">{signal.title}</h3>
                  <p className="text-secondary-foreground leading-relaxed">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cómo lo hacemos</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Cómo cuidamos el proceso en EnPesos
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                  Nuestro foco es que entiendas la operación antes de tomar una decisión. Si el monto neto no te hace sentido o prefieres no avanzar, no pasa nada.
                </p>
                <Button
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('seguridad_cupo_proceso')}
                >
                  Hacer una consulta
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="space-y-4">
                  {enpesosProcess.map((item) => (
                    <div key={item} className="flex gap-3">
                      <FileCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-foreground font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Señales de alerta</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cuándo deberías detenerte antes de cambiar tu cupo en dólares
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Si aparece alguna de estas señales, es mejor no avanzar hasta tener claridad. Una operación responsable debería poder explicarse de forma simple.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {warningSigns.map((item) => (
                <div key={item} className="rounded-2xl border border-destructive/20 bg-card p-5 flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-foreground font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Comparación</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Proceso responsable vs. proceso riesgoso
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                La diferencia no está solo en la comisión. Está en la claridad del neto, el manejo de datos y la presión comercial.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-background card-shadow">
              <div className="grid md:grid-cols-2 bg-primary text-primary-foreground font-extrabold text-lg">
                <div className="p-5 border-b md:border-b-0 md:border-r border-primary-foreground/20">Proceso responsable</div>
                <div className="p-5">Proceso riesgoso</div>
              </div>
              {comparisonRows.map(([good, bad]) => (
                <div key={good} className="grid md:grid-cols-2 border-t border-border">
                  <div className="p-5 flex gap-3 border-b md:border-b-0 md:border-r border-border">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <p className="text-foreground font-medium leading-relaxed">{good}</p>
                  </div>
                  <div className="p-5 flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <p className="text-foreground font-medium leading-relaxed">{bad}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
              <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Qué información se puede revisar para cotizar
                  </h2>
                  <p className="text-lg text-secondary-foreground leading-relaxed mb-4">
                    Para cotizar, normalmente basta con entender el monto que quieres evaluar, el banco o tipo de tarjeta y confirmar que tienes cupo internacional disponible. No deberías entregar claves bancarias ni acceso a tus cuentas para recibir una cotización.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    La cotización debe servirte para comparar con otras alternativas y decidir con calma. Si algo no te queda claro, pregunta antes de avanzar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Dudas comunes antes de cambiar cupo en dólares
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-border bg-background p-5 open:card-shadow">
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
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-light via-background to-primary-light p-7 sm:p-10 card-shadow">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Primero entiende. Después decide.
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed mb-7">
                  Si quieres cotizar, te mostramos el monto neto estimado en pesos antes de avanzar. Si no te conviene o prefieres pensarlo, no tienes obligación.
                </p>
                <Button
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('seguridad_cupo_footer')}
                >
                  Consultar por WhatsApp
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <a href="/cuanto-recibo-por-mi-cupo-en-dolares" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Guía relacionada</p>
                <h3 className="text-lg font-extrabold text-foreground">Cuánto recibo por mi cupo en dólares</h3>
              </a>
              <a href="/vender-cupo-en-dolares-chile" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Guía relacionada</p>
                <h3 className="text-lg font-extrabold text-foreground">Vender cupo en dólares: cómo funciona</h3>
              </a>
              <a href="/cupo-en-dolares-a-pesos-chilenos" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Guía relacionada</p>
                <h3 className="text-lg font-extrabold text-foreground">Cupo en dólares a pesos chilenos</h3>
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
