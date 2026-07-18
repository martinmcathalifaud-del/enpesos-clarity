import { useEffect } from 'react';
import { ArrowRight, Calculator, CheckCircle2, CreditCard, DollarSign, FileText, MessageCircle, Percent, ShieldCheck, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const costFactors = [
  {
    icon: DollarSign,
    title: 'Monto en dólares que quieres cotizar',
    description: 'El punto de partida es el monto de cupo internacional disponible que quieres revisar. No todo monto funciona igual; se revisa caso a caso.',
  },
  {
    icon: TrendingUp,
    title: 'Dólar referencial del momento',
    description: 'El valor del dólar puede cambiar. Por eso una estimación sin cotización formal puede quedar desactualizada.',
  },
  {
    icon: Percent,
    title: 'Costos y comisión del servicio',
    description: 'La cotización debe mostrar el monto neto estimado en pesos considerando costos aplicables. No conviene mirar solo un porcentaje aislado.',
  },
  {
    icon: CreditCard,
    title: 'Condiciones operativas del caso',
    description: 'Banco, emisor, tarjeta, cupo disponible, validaciones y momento de confirmación pueden influir en el resultado final.',
  },
];

const referenceLimits = [
  'Una calculadora puede usar supuestos, pero la cotización real depende del momento de confirmación.',
  'Sin conocer banco, tarjeta, monto, costos y condiciones, el resultado solo puede ser referencial.',
  'No conviene decidir por un número automático si no entiendes qué incluye y qué no incluye.',
  'El monto relevante es el neto estimado que recibirías en pesos chilenos en tu cuenta.',
];

const relatedLinks = [
  { label: 'Simulador de pago de tarjeta', href: '/simulador-pago-tarjeta-credito', description: 'Revisa escenarios de pago posterior con supuestos editables.' },
  { label: 'Deuda en dólares de tarjeta', href: '/como-pagar-deuda-en-dolares-tarjeta-credito', description: 'Entiende qué pasa después con el cargo en tu tarjeta.' },
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos', description: 'Guía principal para cotizar cupo internacional disponible.' },
  { label: 'Cómo funciona EnPesos', href: '/como-funciona', description: 'Proceso paso a paso antes de decidir.' },
  { label: 'Seguridad', href: '/seguridad', description: 'Datos que no pedimos y canales oficiales.' },
];

const deepDiveSections = [
  {
    heading: 'Por qué no existe una tasa fija publicada',
    paragraphs: [
      'El monto neto que podrías recibir en pesos depende de variables que cambian caso a caso: el monto en dólares que quieres cotizar, el dólar de referencia del momento, los costos de procesamiento, el banco o emisor de tu tarjeta y las condiciones vigentes al momento de confirmar. Por eso EnPesos no publica una tasa fija ni promete un porcentaje exacto para todos los casos.',
      'Publicar un número genérico sin conocer estas variables podría generar una expectativa que después no se cumple. Lo responsable es cotizar tu caso específico antes de decidir.',
    ],
  },
  {
    heading: 'Qué mirar además del monto que recibirías hoy',
    paragraphs: [
      'El monto neto en pesos es solo una parte de la operación. También conviene revisar qué cargo o deuda podría quedar después en tu tarjeta, según las condiciones de tu banco o emisor, y si tienes capacidad de pago para asumir ese cargo cuando llegue la facturación.',
      'Comparar solo el monto que recibirías hoy, sin mirar el costo posterior, puede llevar a una decisión que no te convenga en el tiempo.',
    ],
  },
  {
    heading: 'Cómo se calcula una cotización real',
    paragraphs: [
      'Una cotización real considera el monto que quieres evaluar, el dólar de referencia del momento, los costos de procesamiento aplicables y las condiciones específicas de tu banco o emisor. Por eso el resultado puede variar entre dos personas que cotizan un monto similar, si sus tarjetas o condiciones son distintas.',
      'El simulador de pago de tarjeta puede ayudarte a estimar el escenario de pago posterior, pero no reemplaza una cotización real para saber cuánto podrías recibir hoy.',
    ],
  },
  {
    heading: 'Qué información se pide y qué no se pide',
    paragraphs: [
      'Para orientar una cotización normalmente se piden datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
      'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp.',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuánto recibo por vender mi cupo en dólares?',
    answer: 'No existe un monto fijo universal. El neto final depende del monto cotizado, dólar referencial, costos, comisión, banco, tarjeta, validaciones y condiciones del caso. Por eso EnPesos cotiza caso a caso antes de avanzar.',
  },
  {
    question: '¿Por qué no hay un monto automático exacto?',
    answer: 'Porque una cotización real depende de información que puede cambiar: dólar, costos, condiciones operativas, banco o emisor y momento de confirmación. Una calculadora sin esos datos solo puede ser referencial.',
  },
  {
    question: '¿Qué significa monto neto en pesos?',
    answer: 'Es el monto estimado que recibirías finalmente en tu cuenta bancaria en pesos chilenos, después de considerar los costos y condiciones informadas en la cotización.',
  },
  {
    question: '¿Debo mirar la comisión o el monto final?',
    answer: 'La comparación más útil es mirar el monto final que recibirías en tu cuenta y las condiciones asociadas. Un porcentaje aislado no siempre cuenta toda la historia.',
  },
  {
    question: '¿Queda deuda en la tarjeta?',
    answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Cotizar sirve para revisar monto estimado, costo y condiciones antes de decidir. Si no te hace sentido, no tienes obligación de avanzar.',
  },
];

export default function CuantoReciboCupoDolares() {
  useEffect(() => {
    document.title = 'Cuánto recibo por mi cupo en dólares | EnPesos.cl';

    const metaDescription = 'Entiende qué factores influyen en cuánto podrías recibir por tu cupo en dólares: monto, dólar referencial, costos, comisión, condiciones y deuda posterior.';
    const canonicalUrl = 'https://www.enpesos.cl/cuanto-recibo-por-mi-cupo-en-dolares';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Cuánto recibo por mi cupo en dólares | EnPesos.cl' });
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

    let script = document.head.querySelector('#cuanto-recibo-cupo-dolares-faq-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'cuanto-recibo-cupo-dolares-faq-schema';
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
                  <Calculator className="w-4 h-4" />
                  Guía de costos y monto neto
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  ¿Cuánto recibo por mi cupo en dólares?
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  No hay un monto automático exacto sin cotización. El neto que podrías recibir en pesos depende del monto, dólar referencial, costos, comisión, condiciones operativas y momento de confirmación.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('seo_cuanto_recibo_hero')}>
                    Solicitar cotización
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a href="#calculo" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                    Ver factores
                  </a>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <MessageCircle className="w-10 h-10 text-primary mb-5" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">La pregunta clave es el neto</h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  El número importante no es solo el dólar ni la comisión. Es cuántos pesos chilenos llegarían a tu cuenta y bajo qué condiciones.
                </p>
                <a href="/cupo-en-dolares-a-pesos-chilenos" className="inline-flex items-center gap-2 font-bold text-primary hover:underline">
                  Ver guía principal
                  <ArrowRight className="w-4 h-4" />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section id="calculo" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Factores</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">Qué influye en cuánto recibes</h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                Una cotización clara debe ayudarte a entender qué se considera antes de decidir. No inventamos una fórmula pública si los supuestos operativos no están definidos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {costFactors.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-3xl border border-border p-6 bg-card">
                    <Icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-xl font-extrabold text-foreground mb-2">{item.title}</h3>
                    <p className="text-secondary-foreground leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cálculo referencial</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Por qué una calculadora automática puede ser solo referencial
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  Una calculadora puede servir para orientarte, pero no reemplaza una cotización real. El monto final puede cambiar por condiciones del banco o emisor, costos, validaciones y momento de confirmación.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="space-y-4">
                  {referenceLimits.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <p className="text-secondary-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-10">
              <CreditCard className="w-9 h-9 text-amber-600 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">También debes mirar la deuda posterior</h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. Antes de avanzar, revisa cómo se facturará y cómo lo pagarás después.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">A fondo</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Lo que conviene entender sobre el monto neto</h2>
            </div>
            <div className="grid gap-5">
              {deepDiveSections.map((item) => (
                <article key={item.heading} className="rounded-3xl border border-border bg-background p-6 sm:p-7 card-shadow">
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

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Dudas comunes sobre monto neto y costos</h2>
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Guías relacionadas</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedLinks.map((link) => (
                  <a key={link.href} href={link.href} className="rounded-2xl border border-border p-5 hover:border-primary/40 hover:bg-primary-light transition-colors">
                    <p className="font-extrabold text-foreground mb-2">{link.label}</p>
                    <p className="text-sm text-secondary-foreground">{link.description}</p>
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
