import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
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

const CANONICAL_URL = 'https://www.enpesos.cl/financiamiento-para-negocios-y-pymes-chile';

const options = [
  {
    title: 'Crédito comercial',
    description: 'Financiamiento bancario para empresas o personas con actividad, normalmente sujeto a evaluación, antecedentes y capacidad de pago.',
    bestFor: 'Inversiones, capital de trabajo planificado o necesidades con monto y plazo definidos.',
    watch: 'Requisitos, garantías, tasa, plazo, seguros, historial del negocio y carga financiera total.',
  },
  {
    title: 'Línea de crédito empresa',
    description: 'Puede ayudar a cubrir desfases de caja, pagos de corto plazo o diferencias entre cobros y pagos.',
    bestFor: 'Negocios con ingresos recurrentes y necesidad de flexibilidad.',
    watch: 'Si se usa como caja permanente, puede convertirse en deuda cara y difícil de ordenar.',
  },
  {
    title: 'Factoring',
    description: 'Permite adelantar el cobro de facturas emitidas, recibiendo liquidez antes de que pague el cliente.',
    bestFor: 'Negocios que venden con factura y tienen cuentas por cobrar.',
    watch: 'Costo de descuento, plazos, calidad del pagador y dependencia de facturas emitidas.',
  },
  {
    title: 'Leasing',
    description: 'Alternativa para financiar activos o equipamiento sin comprar todo al contado desde el inicio.',
    bestFor: 'Maquinaria, vehículos, equipos o activos que ayudan a operar el negocio.',
    watch: 'No sirve para cualquier urgencia de caja; está más orientado a activos específicos.',
  },
  {
    title: 'Proveedores a plazo',
    description: 'Negociar días de pago con proveedores puede financiar inventario o compras sin tomar deuda bancaria inmediata.',
    bestFor: 'Negocios con relación estable con proveedores y rotación clara.',
    watch: 'Puede afectar margen, abastecimiento o relación comercial si no cumples los pagos.',
  },
  {
    title: 'Fondos, subsidios o programas públicos',
    description: 'Pueden apoyar crecimiento, inversión o formalización, pero normalmente tienen requisitos, postulaciones y tiempos definidos.',
    bestFor: 'Proyectos con planificación, innovación, crecimiento o inversión no necesariamente urgente.',
    watch: 'No suelen resolver una urgencia inmediata de caja porque dependen de convocatoria, evaluación y plazos.',
  },
  {
    title: 'Socios o inversionistas',
    description: 'Levantar capital puede financiar crecimiento sin deuda tradicional, pero implica compartir propiedad, control o resultados.',
    bestFor: 'Negocios con potencial de crecimiento y propuesta clara.',
    watch: 'No es ideal para urgencias chicas; requiere negociación y puede diluir participación.',
  },
  {
    title: 'Cupo internacional disponible',
    description: 'Si el dueño o el negocio cuenta con tarjeta con cupo internacional, puede cotizar una alternativa de liquidez en pesos antes de pedir un crédito nuevo.',
    bestFor: 'Necesidades puntuales de caja, proveedores, inventario o desfases cortos cuando existe cupo disponible.',
    watch: 'Debe evaluarse caso a caso, con cotización previa, costos claros y sin entregar claves bancarias.',
  },
];

const businessNeeds = [
  'Comprar inventario para no perder ventas.',
  'Pagar proveedores o servicios críticos.',
  'Cubrir caja mientras entran pagos de clientes.',
  'Aprovechar una oportunidad comercial puntual.',
  'Ordenar una necesidad urgente sin tomar una decisión a ciegas.',
];

const enpesosFit = [
  'Tienes tarjeta de crédito con cupo internacional disponible.',
  'Necesitas evaluar liquidez de corto plazo para tu negocio.',
  'Quieres saber cuánto podrías recibir antes de decidir.',
  'Buscas una alternativa distinta a pedir un crédito comercial nuevo.',
  'Quieres atención humana por WhatsApp, sin claves bancarias ni acceso remoto.',
];

const faqs = [
  {
    question: '¿Qué financiamiento conviene para un negocio o pyme?',
    answer: 'Depende del objetivo: capital de trabajo, inventario, equipamiento, desfase de caja, crecimiento o urgencia. Un crédito comercial, factoring, línea de crédito, proveedores a plazo o cupo internacional pueden servir en casos distintos.',
  },
  {
    question: '¿Qué alternativa sirve para capital de trabajo urgente?',
    answer: 'Para caja de corto plazo suelen evaluarse línea de crédito, factoring, proveedores a plazo, tarjeta de crédito o una cotización usando cupo internacional disponible. Lo importante es revisar costo, plazo y capacidad de pago.',
  },
  {
    question: '¿EnPesos entrega créditos para empresas?',
    answer: 'No. EnPesos no entrega préstamos ni créditos comerciales. Ayuda a cotizar una operación usando cupo internacional disponible, para evaluar pesos chilenos antes de decidir.',
  },
  {
    question: '¿Sirve si soy independiente o emprendedor?',
    answer: 'Puede servir si tienes tarjeta de crédito con cupo internacional disponible y necesitas cotizar una alternativa de liquidez. Cada caso se revisa antes de avanzar.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Cotizar sirve para revisar monto estimado, costos y condiciones. Si no te conviene o prefieres otra alternativa, no tienes obligación de continuar.',
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

export default function FinanciamientoNegociosPymes() {
  useEffect(() => {
    document.title = 'Financiamiento para negocios y pymes en Chile | EnPesos.cl';

    const description = 'Guía comercial para comparar financiamiento para negocios y pymes en Chile: crédito comercial, factoring, línea de crédito, proveedores, subsidios y cupo internacional.';

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Financiamiento para negocios y pymes en Chile' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'article' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: CANONICAL_URL });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: CANONICAL_URL });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: 'Financiamiento para negocios y pymes en Chile',
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

    let script = document.getElementById('ld-json-financiamiento-negocios') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-json-financiamiento-negocios';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.getElementById('ld-json-financiamiento-negocios')?.remove();
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
                <Building2 className="h-4 w-4" />
                Guía para negocios y pymes
              </div>

              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Financiamiento para negocios y pymes en Chile: opciones para capital de trabajo y liquidez.
              </h1>

              <p className="mb-8 max-w-3xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                Cuando un negocio necesita caja, no siempre conviene pedir el primer crédito disponible. Compara crédito comercial, factoring, línea de crédito, proveedores, fondos y cupo internacional antes de decidir.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('financiamiento_negocios_hero', 'Hola, tengo un negocio y quiero evaluar mi cupo internacional disponible como alternativa de liquidez.')}
                >
                  Cotizar para mi negocio
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <a
                  href="#comparativa"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  Ver opciones
                </a>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <Calculator className="mb-5 h-10 w-10 text-primary" />
              <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground">Primero entiende la caja.</h2>
              <p className="mb-5 leading-relaxed text-secondary-foreground">
                Financiar un negocio no es solo conseguir plata: es cuidar margen, flujo de caja, plazos de pago y capacidad real de devolver lo usado.
              </p>
              <div className="space-y-3">
                {businessNeeds.map((item) => (
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
                Opciones de financiamiento para capital de trabajo, caja o crecimiento.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                No todas las alternativas sirven para lo mismo. Algunas son para crecer, otras para comprar activos, otras para adelantar cobros y otras para resolver caja puntual.
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
                <WalletCards className="h-7 w-7" />
              </div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Dónde entra EnPesos</p>
              <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
                Cupo internacional: una alternativa de liquidez si el negocio necesita caja puntual.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-secondary-foreground">
                EnPesos no reemplaza un crédito comercial, factoring o subsidio. Es una alternativa para cotizar pesos usando cupo internacional disponible, especialmente cuando quieres evaluar una necesidad de corto plazo antes de endeudarte de otra forma.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/liquidez-para-negocios-cupo-internacional"
                  className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline"
                >
                  Ver liquidez para negocios
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/cupo-en-dolares-a-pesos-chilenos"
                  className="inline-flex items-center gap-2 text-sm font-black text-primary hover:underline"
                >
                  Ver cupo en dólares a pesos
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
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
              <h3 className="mb-3 text-2xl font-black text-foreground">No financies pérdidas permanentes</h3>
              <p className="leading-relaxed text-secondary-foreground">
                Si el problema es estructural, más caja puede postergar el problema. Revisa margen, ventas, costos y capacidad de pago.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <ShieldCheck className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Cuida la información sensible</h3>
              <p className="leading-relaxed text-secondary-foreground">
                Para cotizar cupo internacional no deberías entregar claves bancarias, token, coordenadas ni acceso remoto a tus cuentas.
              </p>
            </div>
            <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm">
              <CreditCard className="mb-5 h-8 w-8 text-primary" />
              <h3 className="mb-3 text-2xl font-black text-foreground">Compara costo y velocidad</h3>
              <p className="leading-relaxed text-secondary-foreground">
                La mejor alternativa no siempre es la más rápida. Evalúa cuánto recibes, cuánto pagas y qué impacto tendrá en la caja.
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
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Financiamiento para negocios y cupo internacional.</h2>
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
            <Building2 className="mx-auto mb-5 h-10 w-10" />
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-5xl">¿Tu negocio necesita liquidez de corto plazo?</h2>
            <p className="mx-auto mb-7 max-w-2xl text-primary-foreground/85">
              Cotiza tu cupo internacional disponible por WhatsApp y revisa si esta alternativa tiene sentido para tu caja antes de tomar otro financiamiento.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-black"
              onClick={() => openWhatsApp('financiamiento_negocios_final', 'Hola, tengo un negocio y quiero cotizar cupo internacional disponible para evaluar liquidez.')}
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
