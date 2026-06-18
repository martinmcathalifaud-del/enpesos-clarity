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
    title: 'Valor del dólar del día',
    description: 'El monto final en pesos depende del tipo de cambio usado al momento de cotizar. Si el dólar cambia, el neto también puede variar.',
  },
  {
    icon: CreditCard,
    title: 'Costo de procesamiento',
    description: 'Una operación con tarjeta puede incluir costos asociados al procesamiento del pago o pasarela. Ese costo se considera dentro de la cotización.',
  },
  {
    icon: Percent,
    title: 'Comisión del servicio',
    description: 'EnPesos cobra una comisión por coordinar, asistir y respaldar el proceso. La comisión debe estar incorporada en el neto informado.',
  },
  {
    icon: TrendingUp,
    title: 'Monto y condiciones del caso',
    description: 'No siempre es igual cotizar USD 300, USD 1.000 o USD 3.000. El banco, la tarjeta y las validaciones pueden afectar la operación.',
  },
];

const faqs = [
  {
    question: '¿Cuánto recibo por vender mi cupo en dólares?',
    answer: 'No existe un monto fijo universal. El neto final depende del valor del dólar del día, el monto cotizado, los costos de procesamiento, la comisión del servicio y las condiciones de tu tarjeta o banco. Por eso EnPesos cotiza caso a caso antes de avanzar.',
  },
  {
    question: '¿Por qué no publican una tabla fija?',
    answer: 'Porque el monto puede variar según el tipo de cambio, el monto, la tarjeta, el banco y los costos vigentes al momento de cotizar. Publicar un número fijo podría ser poco preciso o engañoso.',
  },
  {
    question: '¿Qué significa monto neto en pesos?',
    answer: 'Es el monto estimado que recibirías finalmente en tu cuenta bancaria, después de considerar tipo de cambio, costos de procesamiento y comisión del servicio.',
  },
  {
    question: '¿Debo mirar la comisión o el monto final?',
    answer: 'La comparación correcta es mirar el monto final que recibirías en tu cuenta. Dos servicios pueden mostrar comisiones distintas, pero lo importante es cuánto te depositan finalmente y en qué condiciones.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. La cotización sirve para que veas el neto estimado en pesos antes de decidir. Si el monto no te conviene, no tienes que avanzar.',
  },
  {
    question: '¿Puedo cotizar USD 500, USD 1.000 o más?',
    answer: 'Sí, puedes consultar por distintos montos. La compatibilidad y condiciones se revisan caso a caso según cupo disponible, tarjeta, banco y validaciones del proceso.',
  },
];

export default function CuantoReciboCupoDolares() {
  useEffect(() => {
    document.title = 'Cuánto recibo por mi cupo en dólares | EnPesos.cl';

    const metaDescription = 'Entiende cuánto podrías recibir por cotizar tu cupo en dólares: valor del dólar, costos de procesamiento, comisión del servicio y monto neto final en pesos chilenos.';
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
                  Guía de cotización
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  ¿Cuánto recibo por mi cupo en dólares?
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  No hay un monto fijo universal. El neto que recibirías en pesos depende del valor del dólar del día, el monto cotizado, los costos de procesamiento, la comisión del servicio y las condiciones de tu tarjeta o banco.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seo_cuanto_recibo_hero')}
                  >
                    Cotizar mi monto por WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <a
                    href="#calculo"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver cómo se calcula
                  </a>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Monto neto</p>
                    <p className="text-xs text-muted-foreground mt-1">Lo importante es cuánto llega a tu cuenta.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Costos incluidos</p>
                    <p className="text-xs text-muted-foreground mt-1">Pasarela, comisión y tipo de cambio.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Sin obligación</p>
                    <p className="text-xs text-muted-foreground mt-1">Cotizar no te obliga a operar.</p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <MessageCircle className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                  La pregunta correcta no es solo “¿cuánto cobran?”
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  La pregunta clave es: si cotizo un monto en dólares, ¿cuántos pesos recibiría finalmente en mi cuenta y bajo qué condiciones?
                </p>

                <div className="rounded-[2rem] border border-border bg-secondary p-3 sm:p-4">
                  <div className="rounded-[1.5rem] bg-background overflow-hidden border border-border">
                    <div className="bg-primary px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-foreground/95 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-primary-foreground">Cotización EnPesos</p>
                        <p className="text-xs text-primary-foreground/80">Neto estimado antes de avanzar</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]">
                      <div className="max-w-[86%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">Si cotizo USD 1.000, ¿cuánto me depositan?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">Te damos el monto neto en pesos, considerando dólar del día, procesamiento, comisión y costos aplicables.</p>
                      </div>
                      <div className="max-w-[84%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">¿Y si el monto no me conviene?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">No avanzas. Primero cotizas, después decides.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="calculo" className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cómo se calcula</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Del cupo en dólares al monto neto en pesos
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                En simple, el monto que recibes no depende solo de cuántos dólares tengas de cupo. La cotización considera varios factores y termina en un número concreto: el neto estimado que llegaría a tu cuenta bancaria.
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-secondary p-6 sm:p-8 mb-8">
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 items-center text-center md:text-left">
                <div className="rounded-2xl bg-background border border-border p-5">
                  <p className="text-sm font-bold text-primary mb-1">Monto cotizado</p>
                  <p className="text-2xl font-extrabold text-foreground">USD disponibles</p>
                  <p className="text-sm text-muted-foreground mt-2">Por ejemplo: USD 500, USD 1.000 o USD 2.000.</p>
                </div>
                <div className="text-4xl font-extrabold text-primary">→</div>
                <div className="rounded-2xl bg-background border border-border p-5">
                  <p className="text-sm font-bold text-primary mb-1">Resultado relevante</p>
                  <p className="text-2xl font-extrabold text-foreground">Pesos netos</p>
                  <p className="text-sm text-muted-foreground mt-2">Monto estimado después de costos, comisión y tipo de cambio.</p>
                </div>
              </div>
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
            <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Transparencia</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Por qué no basta con mirar solo la comisión
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                  Algunos servicios pueden mostrar una comisión baja, pero después sumar otros costos o usar un tipo de cambio menos conveniente. Por eso la comparación más honesta no es “qué porcentaje dicen cobrar”, sino cuánto dinero recibes finalmente en tu cuenta.
                </p>
                <Button
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('seo_cuanto_recibo_costos')}
                >
                  Pedir cotización neta
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <h3 className="text-2xl font-extrabold text-foreground mb-5">La comparación correcta</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-extrabold text-foreground">¿Cuántos pesos me depositan?</p>
                      <p className="text-secondary-foreground mt-1">Ese es el número que realmente importa.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-extrabold text-foreground">¿Qué costos ya están incluidos?</p>
                      <p className="text-secondary-foreground mt-1">La cotización debe considerar procesamiento, comisión y tipo de cambio.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-extrabold text-foreground">¿Estoy obligado a avanzar?</p>
                      <p className="text-secondary-foreground mt-1">No. Una cotización seria te deja decidir después de ver el neto.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
              <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Regla simple</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Si no entiendes el neto, no avances
                  </h2>
                  <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                    Antes de aceptar cualquier operación, deberías saber cuánto recibirías, qué costos se consideran y qué condiciones aplican. Si una cotización no deja claro el monto final en pesos, es mejor pedir más detalle o comparar otra alternativa.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <p className="font-extrabold text-foreground">Monto</p>
                      <p className="text-sm text-muted-foreground mt-1">Cuánto cotizas en dólares.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <p className="font-extrabold text-foreground">Costos</p>
                      <p className="text-sm text-muted-foreground mt-1">Qué se descuenta y por qué.</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-background p-4">
                      <p className="font-extrabold text-foreground">Neto</p>
                      <p className="text-sm text-muted-foreground mt-1">Cuánto llega a tu cuenta.</p>
                    </div>
                  </div>
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
                Dudas comunes sobre cuánto recibes por tu cupo
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

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-light via-background to-secondary p-7 sm:p-10 card-shadow">
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Guías relacionadas</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Sigue entendiendo cómo funciona el cupo en dólares
                  </h2>
                  <p className="text-lg text-secondary-foreground leading-relaxed">
                    Primero entiende cuánto podrías recibir. Después revisa qué significa vender cupo en dólares y cómo convertir cupo internacional a pesos chilenos.
                  </p>
                </div>
                <div className="grid gap-3 min-w-[260px]">
                  <a href="/vender-cupo-en-dolares-chile" className="inline-flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-5 py-4 font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                    Vender cupo en dólares
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="/cupo-en-dolares-a-pesos-chilenos" className="inline-flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-5 py-4 font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                    Cupo en dólares a pesos
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
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
