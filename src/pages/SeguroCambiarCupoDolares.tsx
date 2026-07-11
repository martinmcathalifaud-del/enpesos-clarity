import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  HelpCircle,
  Info,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const CANONICAL_URL = 'https://www.enpesos.cl/es-seguro-cambiar-cupo-en-dolares-a-pesos';

const howItWorks = [
  'Evaluamos tu caso antes de pedirte cualquier dato sensible',
  'Te damos una cotización clara antes de que decidas avanzar',
  'Verificamos tu identidad con métodos estándar de la industria',
  'Un asesor humano te acompaña en cada paso',
];

const trustPillars = [
  {
    icon: UserCheck,
    title: 'Titularidad',
    description:
      'El proceso debe calzar con el titular de la tarjeta y la cuenta bancaria. Eso reduce riesgo operativo y evita confusiones con terceros.',
  },
  {
    icon: FileCheck,
    title: 'Cotización clara',
    description:
      'Antes de avanzar tienes que entender cuánto recibirías, qué costos aplican y qué condiciones se están aceptando.',
  },
  {
    icon: LockKeyhole,
    title: 'Datos protegidos',
    description:
      'No se necesitan claves bancarias ni acceso a cuentas para cotizar. Esa línea roja debe mantenerse siempre.',
  },
];

const neverAsk = ['Claves bancarias', 'PIN de tu tarjeta', 'Código CVV por WhatsApp o mensaje', 'Acceso remoto a tu computador o celular'];

const fraudSigns = [
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
    question: '¿Es lo mismo que un avance en efectivo?',
    answer:
      'No lo comunicamos como un préstamo nuevo ni como avance. Estás usando parte de un cupo internacional que tu banco ya te aprobó. El proceso incluye cotización previa, así que sabes el monto y condiciones antes de decidir.',
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
                Seguridad y transparencia
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Es seguro cambiar tu cupo en dólares a pesos: así protegemos tu información
              </h1>

              <p className="mb-8 max-w-2xl text-xl font-bold leading-relaxed text-foreground">
                Sí, es seguro si usas un servicio confiable. Antes de avanzar, es importante que sepas exactamente qué datos pedimos, cuáles nunca pedimos, y cómo funciona el proceso de principio a fin.
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
                  Evaluar mi cupo
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <a
                  href="/cupo-en-dolares-a-pesos-chilenos"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Ver cómo funciona
                </a>
              </div>

              <a
                href="#datos"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-primary hover:underline"
              >
                Ver qué datos nunca te pedimos
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground">Cómo funciona el proceso</h2>
              <div className="space-y-3">
                {howItWorks.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm font-semibold leading-relaxed text-secondary-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Cómo funciona</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Tres cosas que siempre se cumplen.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {trustPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <pillar.icon className="mb-4 h-7 w-7 text-primary" />
                  <h3 className="mb-3 text-xl font-black text-foreground">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="datos" className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Referencia</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Datos que nunca te vamos a pedir.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {neverAsk.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  <p className="text-sm font-semibold leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-center">
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <ShieldCheck className="mb-5 h-9 w-9 text-primary" />
              <h2 className="mb-4 text-2xl font-black text-foreground">Canales oficiales</h2>
              <p className="mb-5 leading-relaxed text-secondary-foreground">
                Usa únicamente los canales enlazados desde enpesos.cl y nuestras redes oficiales.
              </p>
              <p className="rounded-2xl bg-secondary p-4 text-sm font-semibold text-secondary-foreground">
                Si algo no queda claro, detente y pregunta antes de avanzar.
              </p>
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <HelpCircle className="mb-5 h-9 w-9 text-primary" />
              <h2 className="mb-4 text-2xl font-black text-foreground">¿Es un préstamo nuevo?</h2>
              <p className="leading-relaxed text-secondary-foreground">
                No lo comunicamos como un préstamo nuevo. Estás evaluando usar parte del cupo internacional que ya tienes aprobado por tu banco, no pidiendo algo adicional. Antes de avanzar, recibes una cotización clara y decides con esa información a la vista.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <AlertTriangle className="h-7 w-7" />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Educación</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Cómo identificar intentos de fraude.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                Estas señales aplican a cualquier servicio que te ayude a cotizar o mover dinero, no solo a EnPesos. Conócelas para protegerte en cualquier contexto.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fraudSigns.map((item) => (
                <div key={item} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <AlertTriangle className="mb-4 h-6 w-6 text-amber-500" />
                  <p className="font-bold leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <HelpCircle className="h-7 w-7" />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Preguntas frecuentes</p>
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Seguridad, cupo en dólares y cotización.</h2>
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
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">¿Quieres evaluar tu cupo con información clara?</h2>
            <p className="mx-auto mb-7 max-w-2xl text-primary-foreground/85">
              Escríbenos y te contactamos con una cotización clara. Un asesor te acompaña por WhatsApp para resolver dudas y guiarte en el proceso.
            </p>

            <div className="mx-auto max-w-md text-left">
              <LeadCaptureForm origen="seguridad_cta_final" />
            </div>

            <a
              href="/cupo-en-dolares-a-pesos-chilenos"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl border border-primary-foreground/30 px-7 text-base font-black text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Ver cupo en dólares a pesos
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
