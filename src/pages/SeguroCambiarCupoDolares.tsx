import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileCheck,
  HelpCircle,
  LockKeyhole,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  UserCheck,
  XCircle,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const safeSignals = [
  {
    title: 'Cotización antes de decidir',
    description: 'Primero deberías conocer el monto estimado que recibirías en pesos, los costos y las condiciones generales. Cotizar no debería obligarte a operar.',
  },
  {
    title: 'Sin claves bancarias ni acceso remoto',
    description: 'Nunca entregues clave del banco, token, coordenadas, clave de internet, acceso remoto ni permisos para entrar a tus cuentas.',
  },
  {
    title: 'Monto neto explicado, no solo comisión',
    description: 'Lo importante no es solo la comisión: es cuánto recibirías finalmente en pesos chilenos y qué factores pueden mover ese monto.',
  },
  {
    title: 'Operación con el titular',
    description: 'El proceso debe estar asociado al titular de la tarjeta y de la cuenta bancaria. Evita operaciones a nombre de terceros.',
  },
  {
    title: 'Conversación y comprobantes trazables',
    description: 'La cotización, aceptación, condiciones y comprobantes deben quedar claros. Si algo queda solo “de palabra”, pide que lo expliquen por escrito.',
  },
  {
    title: 'Sin presión para avanzar',
    description: 'Un proceso responsable permite preguntar, comparar y decidir con calma. La urgencia excesiva suele ser una mala señal.',
  },
];

const enpesosProcess = [
  'Atención humana por WhatsApp para resolver dudas antes de avanzar.',
  'Cotización previa con el monto estimado que recibirías en pesos chilenos.',
  'No pedimos claves bancarias, token, coordenadas ni acceso a tus cuentas.',
  'Explicamos que el neto puede variar según monto, dólar, costos y condiciones del caso.',
  'Si el monto no te conviene, no tienes obligación de continuar.',
  'Priorizamos titularidad, trazabilidad y claridad del proceso.',
];

const neverShare = [
  'Clave del banco o clave de internet.',
  'Token, coordenadas o códigos de seguridad para entrar a tu banco.',
  'Acceso remoto a tu computador o celular.',
  'Fotos completas de la tarjeta por ambos lados.',
  'Códigos de verificación que no entiendes para qué se usarán.',
];

const canReview = [
  'Monto que quieres cotizar.',
  'Banco o tipo de tarjeta, a nivel general.',
  'Confirmación de que tienes cupo internacional disponible.',
  'Cuenta bancaria chilena del titular validado para recibir transferencia.',
  'Dudas sobre costos, plazo, proceso y condiciones antes de decidir.',
];

const warningSigns = [
  'Te prometen un monto fijo sin revisar tu caso.',
  'Te dicen “confía” pero no explican cuánto recibirías neto.',
  'Te piden claves, token, coordenadas o acceso remoto.',
  'Te piden fotos completas de la tarjeta por ambos lados.',
  'No explican costos, plazos ni condiciones antes de avanzar.',
  'Solo hablan de comisión, pero no del monto final depositado.',
  'Te presionan con frases como “tienes que hacerlo ahora”.',
  'La oferta suena demasiado buena para ser real.',
  'Te piden operar con tarjeta o cuenta de otra persona.',
  'No hay sitio web, correo, WhatsApp o información comercial clara.',
];

const comparisonRows = [
  ['Te informa el monto neto antes de decidir', 'Solo habla de comisión o promete un monto sin respaldo'],
  ['No pide claves bancarias ni acceso a cuentas', 'Pide claves, token, coordenadas o acceso remoto'],
  ['Explica costos, plazos y condiciones', 'Oculta costos o los informa después'],
  ['Trabaja con titularidad y respaldo', 'Opera con terceros o sin validar autorización'],
  ['Te permite preguntar y comparar', 'Te apura o evita responder preguntas'],
  ['Deja trazabilidad de cotización y aceptación', 'Todo queda ambiguo o solo de palabra'],
];

const faqs = [
  {
    question: '¿Es seguro cambiar cupo en dólares a pesos?',
    answer: 'Puede ser seguro si el proceso se hace con el titular, con cotización previa, sin pedir claves bancarias, sin acceso a cuentas, con costos explicados y con trazabilidad. No conviene avanzar si no entiendes el monto neto, los costos o quién está detrás del servicio.',
  },
  {
    question: '¿EnPesos pide claves bancarias?',
    answer: 'No. EnPesos no pide claves bancarias, token de acceso, coordenadas ni acceso a tus cuentas. Si alguien te pide esos datos para convertir cupo en dólares, es una señal de alerta.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Cotizar sirve para evaluar cuánto podrías recibir en pesos chilenos y qué condiciones aplican. Si el monto no te conviene o prefieres no avanzar, no tienes obligación de continuar.',
  },
  {
    question: '¿Qué datos se pueden revisar para cotizar?',
    answer: 'Normalmente se revisa el monto que quieres evaluar, el banco o tipo de tarjeta a nivel general, que tengas cupo internacional disponible y una cuenta bancaria chilena del titular validado. No deberías entregar claves bancarias ni acceso a tus cuentas.',
  },
  {
    question: '¿Qué datos nunca debería entregar?',
    answer: 'No entregues clave bancaria, token, coordenadas, acceso remoto, códigos que no entiendes, ni fotos completas de tu tarjeta por ambos lados. Si un proceso requiere eso, es mejor detenerse.',
  },
  {
    question: '¿Es un préstamo, crédito o avance en efectivo?',
    answer: 'No. EnPesos no entrega préstamos, créditos ni avances bancarios. La cotización se evalúa usando cupo internacional ya disponible en una tarjeta de crédito.',
  },
  {
    question: '¿Cómo sé cuánto recibiría en pesos?',
    answer: 'El monto depende del cupo disponible, el dólar de referencia, costos de procesamiento, comisión del servicio y condiciones del caso. Por eso se informa una cotización antes de decidir.',
  },
  {
    question: '¿Me pueden garantizar un monto exacto desde la web?',
    answer: 'No conviene prometer un monto exacto sin revisar el caso. Lo responsable es cotizar primero y confirmar las condiciones antes de avanzar.',
  },
  {
    question: '¿Es legal cambiar cupo en dólares?',
    answer: 'La operación debe realizarse con autorización del titular, trazabilidad y sin uso indebido de datos bancarios. EnPesos no actúa como banco ni entrega financiamiento. Si tienes dudas legales o tributarias específicas, conviene revisarlas con un asesor.',
  },
  {
    question: '¿Qué hago si algo me genera desconfianza?',
    answer: 'Detente, pide explicación por escrito y no entregues datos sensibles. Si una condición no queda clara, es mejor no avanzar hasta entenderla.',
  },
];

export default function SeguroCambiarCupoDolares() {
  useEffect(() => {
    document.title = '¿Es seguro cambiar cupo en dólares a pesos? Señales y alertas | EnPesos.cl';

    const metaDescription = 'Guía para saber si es seguro cambiar cupo en dólares a pesos: claves que nunca debes entregar, señales de alerta, cotización previa y proceso responsable.';
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
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: '¿Es seguro cambiar cupo en dólares a pesos?',
          description: metaDescription,
          isPartOf: {
            '@type': 'WebSite',
            name: 'EnPesos.cl',
            url: 'https://www.enpesos.cl/',
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: 'https://www.enpesos.cl/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Guías',
              item: 'https://www.enpesos.cl/guias',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: '¿Es seguro cambiar cupo en dólares a pesos?',
              item: canonicalUrl,
            },
          ],
        },
        {
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
      ],
    };

    let script = document.head.querySelector('#seguro-cupo-dolares-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'seguro-cupo-dolares-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.head.querySelector('#seguro-cupo-dolares-schema')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section id="inicio" className="hero-gradient py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-14 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary mb-5">
                  <ShieldCheck className="w-4 h-4" />
                  Guía de seguridad para cupo en dólares
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  ¿Es seguro cambiar cupo en dólares a pesos?
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Puede ser seguro si el proceso es claro: cotización antes de decidir, sin claves bancarias, sin acceso remoto, con titularidad y con monto neto explicado. Esta guía te muestra qué revisar antes de avanzar.
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
                    href="#checklist"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver checklist de seguridad
                  </a>
                </div>

                <div className="rounded-3xl border border-border bg-background/85 p-5 max-w-2xl">
                  <p className="text-sm font-bold text-primary mb-2">Respuesta corta</p>
                  <p className="text-secondary-foreground leading-relaxed">
                    Sí puede ser seguro, pero no por promesas. Depende de cómo se manejen tus datos, si entiendes el monto neto, si operas como titular y si puedes decidir sin presión.
                  </p>
                </div>
              </div>

              <aside id="checklist" className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm font-bold text-primary mb-1">Checklist rápido</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Antes de cotizar</h2>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                    <LockKeyhole className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    '¿Te informaron cuánto recibirías neto?',
                    '¿Te explicaron costos y condiciones?',
                    '¿No te pidieron claves bancarias ni token?',
                    '¿La operación se hace con el titular?',
                    '¿Puedes decir que no después de cotizar?',
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
                    Si no entiendes el monto final, los costos o quién está detrás del proceso, no avances todavía.
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
                Señales de que un proceso está bien planteado
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                La seguridad no depende de una frase como “somos confiables”. Depende de límites concretos: qué datos se piden, cómo se informa el neto, quién opera y qué queda respaldado.
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
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary mb-1">Nunca entregues</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Datos sensibles que no deberían pedirte</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {neverShare.map((item) => (
                    <div key={item} className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                      <p className="text-foreground font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center">
                    <ClipboardCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary mb-1">Sí se puede revisar</p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Información razonable para cotizar</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {canReview.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
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
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cómo lo hacemos</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Cómo cuidamos el proceso en EnPesos
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                  Nuestro foco es que entiendas la operación antes de tomar una decisión. La cotización existe para que puedas comparar, preguntar y decidir con calma.
                </p>
                <Button
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('seguridad_cupo_proceso')}
                >
                  Hacer una consulta
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 card-shadow">
                <div className="grid sm:grid-cols-2 gap-4">
                  {enpesosProcess.map((item) => (
                    <div key={item} className="rounded-2xl border border-border bg-background p-4 flex gap-3">
                      <FileCheck className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <p className="text-foreground font-medium leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Señales de alerta</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cuándo deberías detenerte antes de cambiar tu cupo en dólares
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Si aparece alguna de estas señales, no avances hasta tener claridad. Un proceso responsable debería poder explicarse de forma simple.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {warningSigns.map((item) => (
                <div key={item} className="rounded-2xl border border-destructive/20 bg-background p-5 flex gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                  <p className="text-foreground font-medium leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Comparación</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Proceso responsable vs. proceso riesgoso
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                La diferencia no está solo en la comisión. Está en la claridad del neto, el manejo de datos, la titularidad y la presión comercial.
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
                  <div className="p-5 flex gap-3 bg-secondary/40">
                    <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                    <p className="text-foreground font-medium leading-relaxed">{bad}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-border bg-background p-6">
                <UserCheck className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-2xl font-extrabold text-foreground mb-3">Titularidad</h2>
                <p className="text-secondary-foreground leading-relaxed">
                  Evita operar con tarjetas o cuentas de terceros. La transferencia debería ir a una cuenta bancaria chilena del titular validado.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6">
                <SearchCheck className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-2xl font-extrabold text-foreground mb-3">Claridad del neto</h2>
                <p className="text-secondary-foreground leading-relaxed">
                  Antes de decidir, revisa cuánto recibirías en pesos y qué factores explican ese monto: dólar, costos, comisión y condiciones.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6">
                <HelpCircle className="w-8 h-8 text-primary mb-4" />
                <h2 className="text-2xl font-extrabold text-foreground mb-3">Derecho a preguntar</h2>
                <p className="text-secondary-foreground leading-relaxed">
                  Si algo no queda claro, pregunta antes. La presión para avanzar rápido es una señal de alerta, no una razón para operar.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Dudas comunes sobre seguridad al cambiar cupo en dólares
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

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-light via-background to-primary-light p-7 sm:p-10 card-shadow">
              <div className="text-center max-w-3xl mx-auto">
                <Eye className="w-10 h-10 text-primary mx-auto mb-4" />
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
              <a href="/cupo-en-dolares-a-pesos-chilenos" className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Guía principal</p>
                <h3 className="text-lg font-extrabold text-foreground">Cupo en dólares a pesos chilenos</h3>
              </a>
              <a href="/cuanto-recibo-por-mi-cupo-en-dolares" className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Costos</p>
                <h3 className="text-lg font-extrabold text-foreground">Cuánto recibo por mi cupo en dólares</h3>
              </a>
              <a href="/vender-cupo-en-dolares-chile" className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Funcionamiento</p>
                <h3 className="text-lg font-extrabold text-foreground">Vender cupo en dólares: cómo funciona</h3>
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
