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
    description: 'Puede servir para ordenar una necesidad mayor con cuotas fijas, evaluación bancaria y plazo definido.',
    bestFor: 'Gastos grandes o necesidades que puedes pagar en cuotas durante varios meses.',
    watch: 'Costo total del crédito, tasa, seguros, plazo y efecto en tu carga mensual.',
  },
  {
    title: 'Avance en efectivo',
    description: 'Permite usar la tarjeta de crédito para obtener dinero, normalmente con intereses y comisiones asociadas.',
    bestFor: 'Urgencias puntuales cuando entiendes bien el costo y la forma de pago posterior.',
    watch: 'Puede salir caro si se usa sin comparar costo total, cuotas e intereses.',
  },
  {
    title: 'Línea de crédito',
    description: 'Es una alternativa bancaria flexible para cubrir desfases de caja personal, pero debe usarse con control.',
    bestFor: 'Desfases muy cortos entre ingresos y pagos.',
    watch: 'Si se vuelve permanente, puede transformarse en deuda cara y difícil de cerrar.',
  },
  {
    title: 'Tarjeta de crédito en cuotas',
    description: 'Sirve para financiar compras o pagos directamente con la tarjeta, según cupo y condiciones del emisor.',
    bestFor: 'Compras específicas que puedes pagar en cuotas sin desordenar tu presupuesto.',
    watch: 'No confundas cupo disponible con plata disponible. Igual tendrás que pagarlo después.',
  },
  {
    title: 'Refinanciamiento o consolidación',
    description: 'Puede ayudar cuando tienes varias deudas y buscas ordenar pagos en una sola cuota.',
    bestFor: 'Personas que necesitan bajar carga mensual o simplificar varias deudas.',
    watch: 'Puede extender plazo y aumentar costo total si no revisas bien las condiciones.',
  },
  {
    title: 'Venta de activos o ingresos extraordinarios',
    description: 'Vender algo, adelantar un ingreso o liquidar un activo puede evitar pedir deuda nueva.',
    bestFor: 'Cuando necesitas liquidez y prefieres no aumentar tu endeudamiento.',
    watch: 'Puede implicar vender apurado o bajo precio si la urgencia es alta.',
  },
  {
    title: 'Apoyo familiar o red cercana',
    description: 'Puede ser más simple y barato, pero requiere claridad para evitar problemas personales.',
    bestFor: 'Emergencias chicas o necesidades de muy corto plazo.',
    watch: 'Deja claro monto, fecha de pago y condiciones para no tensionar relaciones.',
  },
  {
    title: 'Cupo en dólares o cupo internacional',
    description: 'Si ya tienes tarjeta de crédito con cupo internacional disponible, puedes cotizar una alternativa para recibir pesos chilenos.',
    bestFor: 'Personas con cupo internacional disponible que quieren evaluar pesos antes de pedir un crédito nuevo.',
    watch: 'Debe cotizarse antes de avanzar, sin entregar claves bancarias ni aceptar condiciones poco claras.',
  },
];

const quickNeeds = [
  'Pagar una urgencia puntual.',
  'Cubrir un desfase antes del próximo ingreso.',
  'Ordenar una deuda chica o mediana.',
  'Financiar una compra necesaria.',
  'Evitar pedir un crédito nuevo sin comparar alternativas.',
];

const enpesosFit = [
  'Tienes tarjeta de crédito con cupo internacional disponible.',
  'Necesitas pesos chilenos y quieres cotizar antes de decidir.',
  'No quieres pedir un préstamo nuevo sin mirar alternativas.',
  'Quieres atención humana por WhatsApp y condiciones claras.',
  'No quieres entregar claves bancarias, token ni acceso a tus cuentas.',
];

const faqs = [
  {
    question: '¿Cuál es la mejor forma de financiamiento para una persona?',
    answer: 'Depende de la urgencia, monto, capacidad de pago, plazo y costo total. Para algunas personas conviene crédito de consumo; para otras, ordenar deuda; y para quienes ya tienen cupo internacional disponible, puede hacer sentido cotizar cupo en dólares a pesos antes de pedir un crédito nuevo.',
  },
  {
    question: '¿Qué alternativa sirve para una necesidad de corto plazo?',
    answer: 'Para necesidades cortas suelen evaluarse línea de crédito, tarjeta, avance, apoyo familiar, venta de activos o una cotización usando cupo internacional disponible. Lo importante es comparar costo, rapidez y forma de pago posterior.',
  },
  {
    question: '¿Cupo en dólares es lo mismo que crédito de consumo?',
    answer: 'No. EnPesos no entrega créditos ni préstamos. La cotización se evalúa usando cupo internacional ya disponible en una tarjeta de crédito.',
  },
  {
    question: '¿Cotizar en EnPesos me obliga a operar?',
    answer: 'No. Cotizar sirve para conocer monto estimado, costos y condiciones antes de tomar una decisión. Si no te conviene, no tienes obligación de avanzar.',
  },
  {
    question: '¿Qué debo revisar antes de financiarme?',
    answer: 'Revisa cuánto necesitas, cuánto recibirías realmente, cuánto pagarás después, en qué plazo, qué pasa si te atrasas y si estás tomando deuda nueva o usando cupo ya disponible.',
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

    const description = 'Guía comercial para comparar formas de financiamiento para personas en Chile: crédito de consumo, avance, línea de crédito, tarjeta y cupo en dólares a pesos.';

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
                Guía para personas
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Formas de financiamiento para personas en Chile: crédito, avance, tarjeta y cupo en dólares.
              </h1>

              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                Si necesitas plata para una urgencia o una necesidad de corto plazo, no todas las alternativas son iguales. Compara opciones antes de decidir y revisa si tu cupo internacional disponible puede ser una alternativa para cotizar pesos.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('financiamiento_personas_hero', 'Hola, estoy revisando formas de financiamiento y quiero cotizar mi cupo internacional disponible.')}
                >
                  Cotizar cupo disponible
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <a
                  href="#comparativa"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Ver alternativas
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <CreditCard className="mb-5 h-10 w-10 text-primary" />
              <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground">Primero define la necesidad.</h2>
              <p className="mb-5 leading-relaxed text-secondary-foreground">
                No es lo mismo financiar una emergencia, ordenar deudas, cubrir un desfase o comprar algo. La mejor alternativa depende del monto, plazo, costo y capacidad de pago.
              </p>
              <div className="space-y-3">
                {quickNeeds.map((item) => (
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
                Alternativas de financiamiento personal y cuándo mirarlas.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                La idea no es elegir la opción más rápida, sino la que entiendes mejor: cuánto recibes, cuánto pagas después y qué riesgo asumes.
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
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p><span className="font-black text-foreground">Puede servir para:</span> {option.bestFor}</p>
                    <p><span className="font-black text-foreground">Ojo con:</span> {option.watch}</p>
                  </div>
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
                Cupo en dólares: una alternativa si ya tienes cupo internacional disponible.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                EnPesos no es un préstamo ni un crédito de consumo. Es una forma de cotizar una operación usando cupo internacional ya disponible, para saber cuánto podrías recibir en pesos antes de decidir.
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
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <AlertTriangle className="mb-5 h-8 w-8 text-amber-500" />
              <h3 className="mb-3 text-2xl font-black text-foreground">No mires solo la rapidez</h3>
              <p className="leading-relaxed text-secondary-foreground">
                Una alternativa rápida puede ser mala si no entiendes el costo total, las cuotas o lo que pasará después con tu tarjeta o banco.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <ShieldCheck className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Nunca entregues claves</h3>
              <p className="leading-relaxed text-secondary-foreground">
                Para cotizar cupo internacional no deberías entregar clave bancaria, token, coordenadas, acceso remoto ni control de tus cuentas.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <WalletCards className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Cotiza antes de decidir</h3>
              <p className="leading-relaxed text-secondary-foreground">
                La decisión mejora cuando sabes cuánto recibirías, qué costos aplican y qué condiciones estás aceptando.
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
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Financiamiento personal y cupo en dólares.</h2>
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
            <WalletCards className="mx-auto mb-5 h-10 w-10" />
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">¿Tienes cupo internacional y quieres comparar opciones?</h2>
            <p className="mx-auto mb-7 max-w-2xl text-primary-foreground/85">
              Escríbenos por WhatsApp, cotizamos tu caso y ves si tiene sentido antes de pedir un crédito nuevo o usar otra alternativa.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-black"
              onClick={() => openWhatsApp('financiamiento_personas_final', 'Hola, quiero comparar alternativas de financiamiento y cotizar mi cupo internacional disponible.')}
            >
              Cotizar por WhatsApp
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
