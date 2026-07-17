import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, CreditCard, FileText, HelpCircle, MessageCircle, ShieldCheck, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const comparisonRows = [
  { label: 'Quién lo entrega', cashAdvance: 'El banco o emisor de la tarjeta.', dollarLimit: 'EnPesos no entrega avance; ayuda a cotizar usando cupo internacional disponible.' },
  { label: 'Qué debes comparar', cashAdvance: 'Comisión, interés, cuotas, facturación y costo total.', dollarLimit: 'Monto neto en pesos, costo, condiciones y cargo/deuda posterior en tarjeta.' },
  { label: 'Deuda posterior', cashAdvance: 'Depende del producto del banco o emisor.', dollarLimit: 'Puede generarse un cargo o deuda en tu tarjeta, según tu banco o emisor.' },
  { label: 'Decisión', cashAdvance: 'Revisa condiciones antes de pedirlo.', dollarLimit: 'Cotizas primero, ves cuánto recibirías y decides después.' },
];

const processItems = [
  'Indicas que tienes cupo internacional disponible y el monto que quieres cotizar.',
  'Se revisan datos básicos del caso sin pedir claves bancarias, token, acceso remoto ni CVV por WhatsApp.',
  'Recibes una cotización previa con monto neto estimado, costo y condiciones.',
  'Comparas con otras alternativas, como avance en efectivo o crédito de consumo, antes de decidir.',
];

const deepDiveSections = [
  {
    heading: 'Qué diferencia hay entre un avance en efectivo y el cupo en dólares',
    paragraphs: [
      "Cuando alguien busca 'avance cupo en dólares online', muchas veces está comparando dos cosas distintas. Un avance en efectivo es un producto que entrega directamente el banco o emisor de la tarjeta, con sus propias condiciones de comisión, interés y facturación.",
      'Usar el cupo internacional disponible es diferente: EnPesos no entrega ese avance ni define sus condiciones; ayuda a cotizar una operación asistida para recibir pesos chilenos usando el cupo que ya está aprobado en tu tarjeta, mostrando antes el monto estimado, el costo y las condiciones del caso.',
    ],
  },
  {
    heading: 'Qué deberías comparar antes de decidir',
    paragraphs: [
      'Antes de elegir cualquier alternativa conviene comparar el monto neto que recibirías, el costo total asociado, el plazo, la facturación y, sobre todo, qué cargo o deuda quedará después en tu tarjeta.',
      'Comparar solo por el nombre del producto no es suficiente: dos operaciones pueden verse parecidas pero tener condiciones distintas según el banco o emisor. Revisar esta información con calma, antes de aceptar, es lo que permite decidir si te conviene avanzar o si prefieres evaluar otra alternativa.',
    ],
  },
  {
    heading: 'Qué información se revisa antes de cotizar',
    paragraphs: [
      'Para orientar una cotización se revisan datos básicos, como el banco o tipo de tarjeta, el monto aproximado que quieres evaluar y el cupo internacional disponible en ese momento.',
      'No se solicitan claves bancarias, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco se pide el CVV por WhatsApp. Si alguien te solicita esos datos a nombre de EnPesos, no los entregues y confirma que estás usando un canal oficial.',
    ],
  },
  {
    heading: 'Qué pasa con tu tarjeta después',
    paragraphs: [
      'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito. Ese cargo se factura según las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total.',
      'EnPesos no define esas condiciones ni puede anticipar un tiempo exacto de revisión o aprobación para cada caso, porque dependen del banco o emisor y de la información propia de tu tarjeta.',
    ],
  },
  {
    heading: 'Cotizar no obliga a avanzar',
    paragraphs: [
      'Pedir una cotización sirve para revisar información, no para comprometerte a continuar. Puedes preguntar, comparar el monto estimado con otras alternativas y desistir en cualquier momento si no te hace sentido.',
      'La atención se entrega por WhatsApp, que funciona como canal de contacto para resolver dudas y coordinar la revisión de tu caso, no como una promesa de aprobación, tasa o plazo exacto.',
    ],
  },
  {
    heading: 'Qué considerar según tu situación',
    paragraphs: [
      'No todas las personas tienen el mismo cupo internacional disponible, y no todas las tarjetas tienen las mismas condiciones. Antes de cotizar, revisa el estado actual de tu tarjeta, cuánto cupo internacional aparece disponible y si ya tienes cargos pendientes que podrían afectar tu capacidad de pago.',
      'Si no tienes claridad sobre estos puntos, lo responsable es revisarlos primero con tu banco o emisor antes de solicitar una cotización, para que la información que recibas de EnPesos tenga sentido con tu situación real.',
    ],
  },
];

const relatedLinks = [
  { label: 'Formas de financiamiento para personas', href: '/formas-de-financiamiento-para-personas-chile' },
  { label: 'Cuánto recibo por mi cupo', href: '/cuanto-recibo-por-mi-cupo-en-dolares' },
  { label: 'Deuda en dólares de tarjeta', href: '/como-pagar-deuda-en-dolares-tarjeta-credito' },
  { label: 'Simulador de pago de tarjeta', href: '/simulador-pago-tarjeta-credito' },
  { label: 'Seguridad', href: '/seguridad' },
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos' },
];

const faqs = [
  {
    question: '¿Qué significa avance cupo en dólares online?',
    answer: 'Es una búsqueda que muchas personas usan cuando quieren recibir pesos usando el cupo internacional de su tarjeta. EnPesos no ofrece un avance bancario tradicional; ayuda a cotizar una operación con cupo en dólares disponible.',
  },
  {
    question: '¿Es lo mismo que un avance en efectivo?',
    answer: 'No. Un avance en efectivo es un producto del banco o emisor. EnPesos no es banco, no entrega préstamos ni créditos, y no define las condiciones bancarias posteriores.',
  },
  {
    question: '¿Es lo mismo un avance con tarjeta de crédito que usar el cupo en dólares?',
    answer: 'No son lo mismo. Un avance con tarjeta de crédito es una operación que ofrece directamente tu banco, generalmente con comisiones e intereses definidos por ellos. Usar el cupo en dólares disponible en tu tarjeta es distinto: no es un avance bancario tradicional, no es un préstamo ni un crédito. Es una operación asistida donde cotizas cuántos pesos chilenos podrías recibir usando el cupo internacional que ya tienes disponible. Antes de avanzar, ves el monto estimado, el costo y las condiciones. Si la operación se confirma, puede generarse un cargo o deuda en tu tarjeta según tu banco o emisor.',
  },
  {
    question: '¿Qué debo comparar antes de decidir?',
    answer: 'Compara monto neto en pesos, costo total, plazo, condiciones del banco o emisor, capacidad de pago y qué cargo o deuda quedará después en la tarjeta.',
  },
  {
    question: '¿Puede generarse deuda en mi tarjeta?',
    answer: 'Sí. Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Cotizar sirve para revisar cuánto podrías recibir en pesos, costo y condiciones antes de decidir. Si no te hace sentido, no tienes obligación de avanzar.',
  },
];

export default function AvanceCupoDolaresOnline() {
  useEffect(() => {
    document.title = 'Avance cupo en dólares online: qué significa | EnPesos.cl';

    const metaDescription = 'Compara avance en efectivo, avance bancario y cupo en dólares disponible. EnPesos no es préstamo ni crédito; cotiza primero y revisa condiciones.';
    const canonicalUrl = 'https://www.enpesos.cl/avance-cupo-en-dolares-online';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Avance cupo en dólares online | EnPesos.cl' });
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

    let script = document.head.querySelector('#avance-cupo-dolares-faq-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'avance-cupo-dolares-faq-schema';
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
                  Guía EnPesos sobre alternativas con tarjeta
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Avance cupo en dólares online: avance en efectivo vs cupo en dólares
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Si buscas un avance, primero distingue las opciones. Un avance en efectivo es un producto bancario. Usar cupo internacional disponible es distinto: puedes cotizar cuánto recibirías en pesos, revisar costo y decidir después.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('seo_avance_cupo_hero')}>
                    Solicitar cotización
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a href="#comparativa" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                    Comparar alternativas
                  </a>
                </div>

                <div className="rounded-2xl border border-border bg-background/85 p-4 max-w-2xl">
                  <p className="text-sm font-bold text-foreground mb-1">Importante</p>
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    EnPesos no es un avance bancario tradicional, no es préstamo y no es crédito. WhatsApp es solo el canal de atención para resolver dudas y pedir una cotización.
                  </p>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <ShieldCheck className="w-10 h-10 text-primary mb-5" />
                <h2 className="text-2xl font-extrabold text-foreground mb-3">Antes de elegir, mira el costo completo</h2>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  Compara monto neto, comisiones, intereses, fecha de facturación, plazo y capacidad de pago. La alternativa más clara es la que entiendes antes de aceptar.
                </p>
                <a href="/formas-de-financiamiento-para-personas-chile" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
                  Ver formas de financiamiento
                  <ArrowRight className="w-4 h-4" />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section id="comparativa" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Comparativa</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Avance en efectivo vs cupo en dólares: qué comparar
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                No se trata de elegir por nombre. Mira quién entrega el producto, qué costo tiene, cómo se paga después y qué condiciones dependen del banco o emisor.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="grid grid-cols-3 bg-secondary px-4 py-3 text-sm font-extrabold text-foreground">
                <span>Aspecto</span>
                <span>Avance en efectivo</span>
                <span>Cupo en dólares</span>
              </div>
              {comparisonRows.map((row) => (
                <div key={row.label} className="grid grid-cols-1 gap-3 border-t border-border px-4 py-4 text-sm md:grid-cols-3">
                  <p className="font-extrabold text-foreground">{row.label}</p>
                  <p className="text-secondary-foreground">{row.cashAdvance}</p>
                  <p className="text-secondary-foreground">{row.dollarLimit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cómo se cotiza</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Cómo evaluar tu cupo en dólares online
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  La cotización se hace caso a caso. Antes de avanzar debes entender cuánto recibirías en pesos, qué costos hay y qué puede pasar después con tu tarjeta.
                </p>
              </div>

              <div className="grid gap-4">
                {processItems.map((step, index) => (
                  <div key={step} className="rounded-2xl border border-border bg-background p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold shrink-0">{index + 1}</div>
                    <p className="text-foreground font-medium leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-10">
              <CreditCard className="w-9 h-9 text-amber-600 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Puede generarse un cargo o deuda posterior en tu tarjeta
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. El pago posterior, intereses, tipo de cambio y fechas dependen de esas condiciones.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">A fondo</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Lo que conviene entender antes de buscar un avance</h2>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Dudas sobre avance y cupo en dólares</h2>
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Guías relacionadas</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedLinks.map((link) => (
                  <a key={link.href} href={link.href} className="rounded-2xl border border-border p-5 hover:border-primary/40 hover:bg-primary-light transition-colors">
                    <p className="font-extrabold text-foreground mb-2">{link.label}</p>
                    <p className="text-sm text-secondary-foreground">Revisa esta guía antes de decidir.</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
