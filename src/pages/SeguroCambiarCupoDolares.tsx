import { useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  HelpCircle,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  UserCheck,
  XCircle,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const CANONICAL_URL = 'https://www.enpesos.cl/es-seguro-cambiar-cupo-en-dolares-a-pesos';

const safeSignals = [
  {
    title: 'Cotización antes de decidir',
    description: 'Primero debes conocer el monto estimado que recibirías en pesos, los costos y las condiciones generales. Cotizar no te obliga a operar.',
  },
  {
    title: 'Sin claves bancarias',
    description: 'No se piden claves del banco, token, coordenadas, acceso remoto ni permisos para entrar a tus cuentas.',
  },
  {
    title: 'Titularidad clara',
    description: 'La operación debe estar asociada al titular de la tarjeta y de la cuenta bancaria donde se recibirían los pesos.',
  },
  {
    title: 'Monto neto explicado',
    description: 'Lo relevante no es solo el costo: es entender cuánto recibirías finalmente en pesos y de qué depende ese monto.',
  },
  {
    title: 'Comunicación trazable',
    description: 'La cotización, aceptación, costos y condiciones deben quedar explicados por escrito antes de avanzar.',
  },
  {
    title: 'Sin presión comercial',
    description: 'Un proceso serio permite preguntar, comparar y decidir. La urgencia excesiva es una mala señal.',
  },
];

const neverShare = [
  'Clave bancaria, clave de internet o contraseña de tu banco.',
  'Token, coordenadas o códigos para iniciar sesión en tus cuentas.',
  'Acceso remoto a tu celular o computador.',
  'Fotos completas de tu tarjeta por ambos lados.',
  'Códigos de verificación que no entiendes para qué se usarán.',
  'Tarjeta o cuenta bancaria de una tercera persona sin validación del titular.',
];

const warningSigns = [
  'Te prometen un monto exacto sin revisar tu caso.',
  'Te piden claves, token, coordenadas o acceso remoto.',
  'No explican costos, plazos ni condiciones antes de avanzar.',
  'Solo hablan de comisión, pero no del monto final depositado.',
  'Te apuran con frases como “tiene que ser ahora”.',
  'Te piden operar con tarjeta o cuenta de otra persona.',
  'La oferta suena demasiado buena para ser real.',
  'No hay sitio web, WhatsApp oficial o información comercial clara.',
];

const faqs = [
  {
    question: '¿Es seguro cambiar cupo en dólares a pesos?',
    answer:
      'Sí, es seguro cuando se hace por canales oficiales, con cotización previa, titularidad validada, costos claros, trazabilidad y sin compartir claves bancarias ni acceso a tus cuentas.',
  },
  {
    question: '¿EnPesos pide claves bancarias?',
    answer:
      'No. EnPesos no pide clave bancaria, token, coordenadas ni acceso remoto. Si alguien te pide esos datos, no avances.',
  },
  {
    question: '¿Qué datos puedo entregar para cotizar?',
    answer:
      'Puedes indicar el monto que quieres evaluar, banco o tipo de tarjeta a nivel general, si tienes cupo internacional disponible y tus dudas sobre costos o condiciones. No necesitas entregar claves bancarias.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer:
      'No. Cotizar sirve para conocer el monto estimado, costos y condiciones. Si no te conviene, no tienes obligación de continuar.',
  },
  {
    question: '¿Es préstamo, crédito o avance?',
    answer:
      'No. EnPesos no entrega préstamos, créditos ni avances bancarios. La evaluación se realiza usando cupo internacional ya disponible en una tarjeta de crédito.',
  },
  {
    question: '¿Qué hago si algo me genera desconfianza?',
    answer:
      'Detente, pide que te expliquen todo por escrito y no entregues datos sensibles. Si una condición no queda clara, es mejor no avanzar hasta entenderla.',
  },
];

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
};

export default function SeguroCambiarCupoDolares() {
  useEffect(() => {
    document.title = '¿Es seguro cambiar cupo en dólares a pesos? | EnPesos.cl';

    const metaDescription =
      'Sí es seguro cambiar cupo en dólares a pesos si lo haces por canales oficiales, con cotización clara, validación de titularidad y sin compartir claves bancarias.';

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: '¿Es seguro cambiar cupo en dólares a pesos?',
    });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: CANONICAL_URL });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: CANONICAL_URL });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${CANONICAL_URL}#webpage`,
          url: CANONICAL_URL,
          name: '¿Es seguro cambiar cupo en dólares a pesos?',
          description: metaDescription,
          isPartOf: {
            '@type': 'WebSite',
            name: 'EnPesos.cl',
            url: 'https://www.enpesos.cl/',
          },
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
        <section className="hero-gradient px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary">
                <ShieldCheck className="h-4 w-4" />
                Guía de seguridad EnPesos
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                ¿Es seguro cambiar cupo en dólares a pesos?
              </h1>

              <p className="mb-5 max-w-2xl text-xl font-bold leading-relaxed text-foreground">
                Sí, es seguro cuando se hace por canales oficiales, con cotización previa, titularidad validada, costos claros y sin compartir claves bancarias.
              </p>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-secondary-foreground">
                La seguridad no depende de una promesa genérica. Depende de cómo se ejecuta el proceso: qué datos te piden, qué tan clara es la cotización y si entiendes el monto neto antes de decidir.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() =>
                    openWhatsApp(
                      'seo_seguridad_hero',
                      'Hola, quiero cotizar mi cupo en dólares de forma segura con EnPesos.',
                    )
                  }
                >
                  Cotizar por WhatsApp
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <a
                  href="#checklist"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Ver checklist
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <LockKeyhole className="h-7 w-7" />
              </div>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground">Regla simple</h2>
              <p className="mb-6 text-lg leading-relaxed text-secondary-foreground">
                Para cotizar tu cupo en dólares no deberías entregar claves bancarias, token, coordenadas, acceso remoto ni fotos completas de tu tarjeta.
              </p>
              <div className="space-y-3">
                {neverShare.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                    <p className="text-sm font-semibold leading-relaxed text-secondary-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="checklist" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Checklist</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Señales de que el proceso está bien armado.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {safeSignals.map((signal) => (
                <div key={signal.title} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <CheckCircle2 className="mb-4 h-7 w-7 text-primary" />
                  <h3 className="mb-3 text-xl font-black text-foreground">{signal.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary-foreground">{signal.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <AlertTriangle className="h-7 w-7" />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Alertas</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Cuándo no deberías avanzar.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                Si una operación exige datos sensibles, no explica condiciones o te presiona para decidir sin entender el monto neto, el riesgo ya no está en el cupo: está en el proceso.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {warningSigns.map((item) => (
                <div key={item} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <AlertTriangle className="mb-4 h-6 w-6 text-amber-500" />
                  <p className="font-bold leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <UserCheck className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Titularidad</h3>
              <p className="leading-relaxed text-secondary-foreground">
                El proceso debe calzar con el titular de la tarjeta y la cuenta bancaria. Eso reduce riesgo operativo y evita confusiones con terceros.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <FileCheck className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Cotización clara</h3>
              <p className="leading-relaxed text-secondary-foreground">
                Antes de avanzar tienes que entender cuánto recibirías, qué costos aplican y qué condiciones se están aceptando.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <LockKeyhole className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Datos protegidos</h3>
              <p className="leading-relaxed text-secondary-foreground">
                No se necesitan claves bancarias ni acceso a cuentas para cotizar. Esa línea roja debe mantenerse siempre.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <HelpCircle className="h-7 w-7" />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Preguntas frecuentes</p>
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Dudas normales antes de cotizar.</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-black text-foreground">
                    {faq.question}
                  </summary>
                  <p className="mt-4 leading-relaxed text-secondary-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-primary p-8 text-center text-primary-foreground lg:p-12">
            <ShieldCheck className="mx-auto mb-5 h-10 w-10" />
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">Cotiza con un proceso claro.</h2>
            <p className="mx-auto mb-7 max-w-2xl text-primary-foreground/85">
              Te explicamos el monto estimado, los costos y las condiciones antes de que decidas avanzar.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-black"
              onClick={() =>
                openWhatsApp(
                  'seo_seguridad_final',
                  'Hola, quiero cotizar mi cupo en dólares de forma segura con EnPesos.',
                )
              }
            >
              Hablar por WhatsApp
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
