import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  CreditCard,
  HelpCircle,
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

const CANONICAL_URL = 'https://www.enpesos.cl/formas-de-financiamiento-para-personas-chile';

const options = [
  {
    title: 'Crédito de consumo',
    description: 'Es un crédito que entrega un banco u otra entidad, normalmente con evaluación, monto aprobado, cuotas, intereses y plazo definido.',
    compare: 'Costo total del crédito, cuota mensual, plazo, seguros, intereses y si tu presupuesto puede sostener el pago.',
  },
  {
    title: 'Avance en efectivo',
    description: 'Es un producto de la tarjeta o banco para obtener dinero usando la línea disponible, con comisiones, intereses y condiciones del emisor.',
    compare: 'Comisión, interés, fecha de facturación, costo total y qué pasa si pagas solo una parte del estado de cuenta.',
  },
  {
    title: 'Tarjeta de crédito en cuotas',
    description: 'Permite pagar compras o servicios con la tarjeta, según cupo nacional, cupo internacional y reglas del banco o emisor.',
    compare: 'Cantidad de cuotas, interés, carga mensual y si estás usando cupo que después tendrás que pagar.',
  },
  {
    title: 'Cupo internacional disponible',
    description: 'Si tu tarjeta tiene cupo en dólares disponible, puedes cotizar cuántos pesos chilenos podrías recibir usando ese cupo.',
    compare: 'Monto neto estimado, costo, condiciones, cargo/deuda posterior en la tarjeta y capacidad de pago.',
  },
];

const comparisonChecklist = [
  'Cuántos pesos chilenos necesitas realmente.',
  'Cuánto recibirías neto después de costos y condiciones.',
  'Cuánto pagarás después y en qué plazo.',
  'Qué condiciones dependen de tu banco o emisor.',
  'Si tienes capacidad de pago para la deuda o cargo posterior.',
  'Si entiendes el proceso antes de aceptar.',
];

const enpesosFit = [
  'Tienes tarjeta de crédito con cupo internacional disponible.',
  'Quieres cotizar cuántos pesos chilenos podrías recibir antes de decidir.',
  'Quieres comparar con un crédito de consumo o avance en efectivo.',
  'Quieres costo y condiciones claras antes de avanzar.',
  'No quieres entregar claves bancarias, token, CVV por WhatsApp ni acceso remoto.',
];

const internalLinks = [
  { label: 'Avance cupo en dólares online', href: '/avance-cupo-en-dolares-online', description: 'Diferencia entre avance bancario y cupo internacional.' },
  { label: 'Cuánto recibo por mi cupo', href: '/cuanto-recibo-por-mi-cupo-en-dolares', description: 'Factores que influyen en el monto neto.' },
  { label: 'Deuda en dólares de la tarjeta', href: '/como-pagar-deuda-en-dolares-tarjeta-credito', description: 'Qué revisar después con el banco o emisor.' },
  { label: 'Simulador de pago de tarjeta', href: '/simulador-pago-tarjeta-credito', description: 'Mira escenarios referenciales de pago posterior.' },
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos', description: 'Guía principal para cotizar cupo internacional.' },
  { label: 'Cómo funciona EnPesos', href: '/como-funciona', description: 'Proceso paso a paso antes de decidir.' },
  { label: 'Seguridad', href: '/seguridad', description: 'Datos que no pedimos y señales de cuidado.' },
];

const faqs = [
  {
    question: '¿Qué debo comparar antes de pedir un crédito o usar mi tarjeta?',
    answer: 'Compara costo total, plazo, cuota o pago mensual, condiciones del banco o emisor, capacidad de pago y qué deuda quedará después. No mires solo cuánto dinero recibes hoy.',
  },
  {
    question: '¿Usar cupo internacional es lo mismo que pedir un crédito de consumo?',
    answer: 'No. Un crédito de consumo es un producto financiero nuevo. EnPesos no entrega créditos ni préstamos; ayuda a cotizar cuántos pesos podrías recibir usando cupo internacional disponible de tu tarjeta.',
  },
  {
    question: '¿Usar cupo internacional siempre conviene más que un avance?',
    answer: 'No necesariamente. Puede ser una alternativa a evaluar, pero depende del monto, banco o emisor, costos, condiciones y capacidad de pago. Conviene comparar antes de decidir.',
  },
  {
    question: '¿Queda una deuda en la tarjeta?',
    answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. Debes revisar cómo se facturará y cómo lo pagarás después.',
  },
  {
    question: '¿Cotizar con EnPesos me obliga a avanzar?',
    answer: 'No. Cotizar sirve para revisar monto estimado, costo y condiciones antes de decidir. Si no te hace sentido, no tienes obligación de continuar.',
  },
];

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

export default function FormasFinanciamientoPersonas() {
  useEffect(() => {
    document.title = 'Formas de financiamiento para personas en Chile | EnPesos.cl';

    const description = 'Compara crédito de consumo, avance en efectivo, tarjeta de crédito y cupo internacional disponible antes de decidir. Revisa costo total, plazo, condiciones y deuda posterior.';

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Formas de financiamiento para personas en Chile' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: CANONICAL_URL });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: CANONICAL_URL });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'Formas de financiamiento para personas en Chile',
          description,
          url: CANONICAL_URL,
          publisher: {
            '@type': 'Organization',
            name: 'EnPesos.cl',
            url: 'https://www.enpesos.cl',
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

    let script = document.getElementById('ld-json-financiamiento-personas') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-json-financiamiento-personas';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.getElementById('ld-json-financiamiento-personas')?.remove();
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
                <WalletCards className="h-4 w-4" />
                Guía para comparar antes de decidir
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Formas de financiamiento para personas: crédito, avance, tarjeta y cupo en dólares
              </h1>

              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                Si necesitas pesos chilenos, conviene comparar antes de decidir. Un crédito de consumo, un avance en efectivo, usar la tarjeta o cotizar cupo internacional disponible tienen costos, plazos y consecuencias distintas.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('financiamiento_personas_hero', 'Hola, estoy comparando alternativas y quiero cotizar mi cupo internacional disponible.')}
                >
                  Solicitar cotización
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <a
                  href="#comparativa"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Ver comparativa
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <CreditCard className="mb-5 h-10 w-10 text-primary" />
              <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground">La pregunta no es solo cuánto recibes hoy</h2>
              <p className="mb-5 leading-relaxed text-secondary-foreground">
                También importa cuánto pagarás después, en qué plazo, bajo qué condiciones y si tu presupuesto puede asumir ese cargo o deuda.
              </p>
              <div className="space-y-3">
                {comparisonChecklist.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-secondary p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <p className="text-sm font-semibold text-secondary-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="comparativa" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Comparativa</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Qué significa cada alternativa y qué revisar
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                No hay una opción que siempre convenga más. La decisión depende del costo total, plazo, banco o emisor, capacidad de pago y condiciones del caso.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {options.map((option) => (
                <article key={option.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
                    <Landmark className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-black text-foreground">{option.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-secondary-foreground">{option.description}</p>
                  <p className="text-sm leading-relaxed"><span className="font-black text-foreground">Compara:</span> {option.compare}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary-light text-primary">
                <Calculator className="h-7 w-7" />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Dónde entra EnPesos</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Cupo internacional: puede ser una alternativa a evaluar
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                EnPesos no es banco, préstamo ni crédito. Si ya tienes cupo internacional disponible, te ayuda a cotizar cuántos pesos chilenos podrías recibir usando ese cupo, con costo y condiciones claras antes de decidir.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-secondary-foreground">
                Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.
              </p>
              <a
                href="/cupo-en-dolares-a-pesos-chilenos"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-primary hover:underline"
              >
                Ver guía de cupo en dólares a pesos
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {enpesosFit.map((item) => (
                <div key={item} className="rounded-3xl border border-border bg-background p-5 shadow-sm">
                  <CheckCircle2 className="mb-4 h-6 w-6 text-primary" />
                  <p className="font-bold leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Antes de decidir</p>
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Checklist simple para comparar opciones</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {comparisonChecklist.map((item) => (
                <div key={item} className="rounded-[2rem] border border-border bg-background p-6 shadow-sm">
                  <CheckCircle2 className="mb-4 h-6 w-6 text-primary" />
                  <p className="font-bold leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <FileText className="mx-auto mb-4 h-9 w-9 text-primary" />
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Guías para seguir comparando</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {internalLinks.map((link) => (
                <a key={link.href} href={link.href} className="rounded-3xl border border-border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-primary-light">
                  <p className="mb-2 font-black text-foreground">{link.label}</p>
                  <p className="text-sm leading-relaxed text-secondary-foreground">{link.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <AlertTriangle className="mb-5 h-8 w-8 text-amber-500" />
              <h3 className="mb-3 text-2xl font-black text-foreground">No mires solo la rapidez</h3>
              <p className="leading-relaxed text-secondary-foreground">Una alternativa rápida puede ser mala si no entiendes costo total, plazo o deuda posterior.</p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <ShieldCheck className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">No entregues claves</h3>
              <p className="leading-relaxed text-secondary-foreground">No entregues clave bancaria, token, CVV por WhatsApp, coordenadas, acceso remoto ni control de tus cuentas.</p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <WalletCards className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Cotiza antes de decidir</h3>
              <p className="leading-relaxed text-secondary-foreground">La decisión mejora cuando sabes cuánto recibirías, qué costos aplican y qué condiciones estás aceptando.</p>
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
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Financiamiento personal y cupo en dólares</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-black text-foreground">{faq.question}</summary>
                  <p className="mt-4 leading-relaxed text-secondary-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-primary p-8 text-center text-primary-foreground lg:p-12">
            <WalletCards className="mx-auto mb-5 h-10 w-10" />
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">¿Tienes cupo internacional y quieres comparar opciones?</h2>
            <p className="mx-auto mb-7 max-w-2xl text-primary-foreground/85">Cotiza primero, revisa costo y condiciones, y decide después con más información.</p>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-black"
              onClick={() => openWhatsApp('financiamiento_personas_final', 'Hola, quiero comparar alternativas y cotizar mi cupo internacional disponible.')}
            >
              Solicitar cotización
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
