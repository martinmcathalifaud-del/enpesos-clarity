import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  CreditCard,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const CANONICAL_URL = 'https://www.enpesos.cl/cupo-en-dolares-a-pesos-chilenos';

const steps = [
  {
    title: 'Dices cuánto cupo quieres cotizar',
    description: 'Nos escribes por WhatsApp con el monto aproximado en dólares que quieres evaluar. Cotizar no te obliga a avanzar.',
  },
  {
    title: 'Revisamos el caso contigo',
    description: 'Te preguntamos lo necesario para estimar la operación, sin pedir claves bancarias, token, coordenadas ni acceso remoto.',
  },
  {
    title: 'Recibes una cotización clara',
    description: 'Antes de decidir, conoces el monto estimado que recibirías en pesos, los costos y las condiciones generales del proceso.',
  },
  {
    title: 'Decides si avanzar o no',
    description: 'Si el monto no te conviene o prefieres no continuar, no hay obligación. La decisión siempre queda en tus manos.',
  },
];

const benefits = [
  'No es préstamo, crédito ni avance bancario.',
  'Usa cupo internacional disponible de tu tarjeta de crédito.',
  'La atención es humana y por WhatsApp.',
  'Recibes cotización antes de confirmar.',
  'No pedimos claves bancarias ni acceso a tus cuentas.',
  'El monto neto se explica antes de avanzar.',
];

const faqs = [
  {
    question: '¿Qué significa cambiar cupo en dólares a pesos?',
    answer:
      'Significa evaluar una operación asistida usando cupo internacional disponible de una tarjeta de crédito para recibir pesos chilenos. EnPesos cotiza el caso antes de que decidas avanzar.',
  },
  {
    question: '¿Es un préstamo o avance?',
    answer:
      'No. EnPesos no entrega préstamos, créditos ni avances bancarios. Trabaja sobre cupo internacional ya disponible en una tarjeta de crédito del titular.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer:
      'No. Cotizar sirve para saber cuánto podrías recibir, qué costos aplican y si te conviene. Si no quieres avanzar, no tienes obligación de continuar.',
  },
  {
    question: '¿Cuánto recibiría en pesos?',
    answer:
      'Depende del monto en dólares, el tipo de tarjeta, el dólar de referencia, costos de procesamiento y condiciones del caso. Por eso lo responsable es cotizar antes de confirmar.',
  },
  {
    question: '¿EnPesos pide claves bancarias?',
    answer:
      'No. No pedimos clave del banco, token, coordenadas, acceso remoto ni permisos para entrar a tus cuentas.',
  },
  {
    question: '¿Es seguro cambiar cupo en dólares a pesos?',
    answer:
      'Sí, es seguro cuando el proceso se hace por canales oficiales, con cotización previa, titularidad validada, costos claros y sin compartir claves bancarias ni acceso a tus cuentas.',
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

export default function CupoDolaresAPesos() {
  const [dollarAmount, setDollarAmount] = useState(1000);

  useEffect(() => {
    document.title = 'Cupo en dólares a pesos chilenos | Cotiza por WhatsApp | EnPesos.cl';

    const metaDescription =
      'Convierte cupo en dólares o cupo internacional disponible a pesos chilenos con cotización previa, atención humana por WhatsApp y sin claves bancarias.';

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: 'Cupo en dólares a pesos chilenos | EnPesos.cl',
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
          name: 'Cupo en dólares a pesos chilenos',
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

    let script = document.head.querySelector('#cupo-dolares-a-pesos-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'cupo-dolares-a-pesos-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.head.querySelector('#cupo-dolares-a-pesos-schema')?.remove();
    };
  }, []);

  const amount = Number.isFinite(dollarAmount) && dollarAmount > 0 ? dollarAmount : 1000;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="hero-gradient px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary">
                <WalletCards className="h-4 w-4" />
                Cupo internacional disponible
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Cambia tu cupo en dólares a pesos chilenos con cotización previa.
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                EnPesos te ayuda a evaluar tu cupo internacional disponible para recibir pesos chilenos. No es préstamo, no es crédito y no requiere entregar claves bancarias.
              </p>

              <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('seo_cupo_hero', 'Hola, quiero cotizar mi cupo en dólares con EnPesos.')}
                >
                  Cotizar por WhatsApp
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <a
                  href="/es-seguro-cambiar-cupo-en-dolares-a-pesos"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Ver seguridad del proceso
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {benefits.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm font-semibold text-secondary-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-muted-foreground">Cotización inicial</p>
                  <h2 className="text-2xl font-black text-foreground">¿Cuánto cupo quieres evaluar?</h2>
                </div>
              </div>

              <label className="mb-2 block text-sm font-bold text-foreground" htmlFor="dollarAmount">
                Monto aproximado en dólares
              </label>
              <div className="mb-4 flex items-center rounded-2xl border border-border bg-secondary px-4 py-3">
                <span className="mr-2 text-lg font-black text-primary">USD</span>
                <input
                  id="dollarAmount"
                  type="number"
                  min="100"
                  step="100"
                  value={dollarAmount}
                  onChange={(event) => setDollarAmount(Number(event.target.value))}
                  className="w-full bg-transparent text-2xl font-black text-foreground outline-none"
                  aria-label="Monto en dólares a cotizar"
                />
              </div>

              <p className="mb-5 text-sm leading-relaxed text-secondary-foreground">
                La web no muestra un monto neto automático porque puede variar según monto, tarjeta, dólar de referencia, costos y condiciones del caso. Te conviene recibir una cotización real antes de decidir.
              </p>

              <Button
                className="h-12 w-full rounded-xl text-base font-bold button-shadow"
                onClick={() =>
                  openWhatsApp(
                    'seo_cupo_calculator',
                    `Hola, quiero cotizar USD ${amount} de mi cupo en dólares con EnPesos.`,
                  )
                }
              >
                Cotizar USD {amount.toLocaleString('es-CL')} por WhatsApp
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Cómo funciona</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                El punto no es solo “cambiar cupo”: es saber cuánto recibirías antes de avanzar.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-primary text-lg font-black text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="mb-3 text-xl font-black text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Seguridad</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Sí, es seguro cambiar cupo en dólares a pesos si el proceso está bien hecho.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                Para que sea seguro, debe haber cotización previa, titularidad clara, costos explicados y cero claves bancarias. Si alguien te pide acceso a tu banco, token, coordenadas o control remoto, no avances.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <CheckCircle2 className="mb-4 h-6 w-6 text-primary" />
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
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Lo que conviene aclarar antes de cotizar.</h2>
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

        <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-primary p-8 text-center text-primary-foreground lg:p-12">
            <CreditCard className="mx-auto mb-5 h-10 w-10" />
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">¿Tienes cupo internacional y necesitas pesos?</h2>
            <p className="mx-auto mb-7 max-w-2xl text-primary-foreground/85">
              Escríbenos por WhatsApp, cotizamos tu caso y te explicamos el monto estimado antes de que tomes una decisión.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-black"
              onClick={() => openWhatsApp('seo_cupo_final', 'Hola, quiero cotizar mi cupo en dólares con EnPesos.')}
            >
              Cotizar ahora
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
