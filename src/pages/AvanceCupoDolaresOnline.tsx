import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, CreditCard, FileText, HelpCircle, MessageCircle, ShieldCheck, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const faqs = [
  {
    question: '¿Qué significa avance cupo en dólares online?',
    answer: 'Es una forma en que muchas personas buscan información para usar su cupo internacional disponible y recibir una cotización en pesos chilenos. EnPesos no ofrece un avance bancario; ayuda a cotizar una operación con cupo en dólares disponible.',
  },
  {
    question: '¿Es lo mismo que un avance en efectivo del banco?',
    answer: 'No. Un avance en efectivo es un producto del banco. EnPesos no entrega créditos ni financiamiento bancario. La cotización se basa en evaluar un cupo internacional ya disponible.',
  },
  {
    question: '¿Cuánto puedo recibir?',
    answer: 'Depende del monto, el valor del dólar del día, costos de procesamiento, comisión del servicio y condiciones del caso. Por eso se informa un monto neto estimado antes de avanzar.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Cotizar sirve para saber cuánto recibirías aproximadamente en pesos. Si no te conviene o prefieres no avanzar, no tienes obligación.',
  },
];

export default function AvanceCupoDolaresOnline() {
  useEffect(() => {
    document.title = 'Avance cupo en dólares online: qué significa | EnPesos.cl';

    const metaDescription = 'Guía sobre avance cupo en dólares online: qué significa, diferencia con un avance bancario y cómo cotizar tu cupo internacional a pesos chilenos por WhatsApp.';
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
                  Guía EnPesos sobre cupo internacional
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Avance cupo en dólares online: qué significa y cómo cotizar
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Muchas personas buscan “avance cupo en dólares online” cuando quieren usar el cupo internacional de su tarjeta. En esta guía explicamos la diferencia entre un avance bancario y una cotización con cupo en dólares disponible.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('seo_avance_cupo_hero')}>
                    Cotizar mi cupo por WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <a href="#diferencia" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                    Ver diferencias
                  </a>
                </div>

                <div className="rounded-2xl border border-border bg-background/85 p-4 max-w-2xl">
                  <p className="text-sm font-bold text-foreground mb-1">Importante</p>
                  <p className="text-sm text-secondary-foreground leading-relaxed">
                    EnPesos no ofrece avances bancarios ni préstamos. Ayudamos a cotizar una operación con cupo internacional disponible y mostramos el monto neto estimado antes de que decidas avanzar.
                  </p>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="rounded-3xl bg-secondary p-5 mb-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-sm font-bold text-foreground">WhatsApp EnPesos</p>
                      <p className="text-xs text-muted-foreground">Cotización online asistida</p>
                    </div>
                    <MessageCircle className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-primary-foreground text-sm font-medium">
                      Hola, tengo cupo en dólares y quiero saber cuánto recibiría en pesos.
                    </div>
                    <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-background border border-border px-4 py-3 text-sm text-foreground">
                      Te ayudamos a cotizar el monto neto estimado antes de decidir.
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-foreground mb-3">La pregunta correcta</h2>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  No basta con preguntar si se puede hacer online. Lo importante es saber cuánto recibirías finalmente en tu cuenta y qué costos están considerados.
                </p>
                <Button className="w-full h-12 rounded-xl font-bold button-shadow" onClick={() => openWhatsApp('seo_avance_cupo_card')}>
                  Preguntar por mi caso
                </Button>
              </aside>
            </div>
          </div>
        </section>

        <section id="diferencia" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Diferencia clave</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                “Avance cupo en dólares” no siempre significa lo mismo
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                En Google muchas personas usan la palabra avance para buscar liquidez. Pero un avance bancario y una cotización con cupo internacional son cosas distintas.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-border bg-card p-6">
                <CreditCard className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Avance bancario</h3>
                <p className="text-secondary-foreground leading-relaxed">Es un producto del banco, con condiciones, costos e intereses definidos por esa institución.</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <WalletCards className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Cupo internacional</h3>
                <p className="text-secondary-foreground leading-relaxed">Es el cupo en dólares disponible en tu tarjeta, que puede evaluarse caso a caso para una cotización.</p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6">
                <HelpCircle className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Neto final</h3>
                <p className="text-secondary-foreground leading-relaxed">La comparación útil no es solo la comisión, sino cuánto recibirías en pesos después de costos y tipo de cambio.</p>
              </div>
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
                  La cotización se hace caso a caso. El monto final puede variar por el valor del dólar del día, costos de procesamiento, comisión del servicio, monto cotizado y condiciones de tu tarjeta.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  'Indicas el monto que quieres evaluar, por ejemplo USD 500, USD 1.000 o USD 2.000.',
                  'Se revisa si tiene sentido cotizar según tu cupo internacional disponible.',
                  'Te informamos el monto neto estimado en pesos chilenos antes de avanzar.',
                  'Si aceptas, se coordina el proceso de forma asistida por WhatsApp.',
                ].map((step, index) => (
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
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
              <ShieldCheck className="w-9 h-9 text-primary mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Antes de avanzar, entiende el costo total
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                En una cotización responsable deberías saber cuánto recibirías neto en pesos, qué costos están considerados y si la operación te conviene frente a otras alternativas.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'No mires solo la palabra comisión: mira el monto neto final.',
                  'No avances si no entiendes el cálculo o prefieres comparar.',
                  'Cotizar no te obliga a operar.',
                  'El proceso debe realizarse con el titular de la tarjeta y cuenta bancaria.',
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-background border border-border p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-foreground font-semibold leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Dudas sobre avance de cupo en dólares online</h2>
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
                <a href="/cuanto-recibo-por-mi-cupo-en-dolares" className="rounded-2xl border border-border p-5 hover:border-primary/40 hover:bg-primary-light transition-colors">
                  <p className="font-extrabold text-foreground mb-2">¿Cuánto recibo por mi cupo?</p>
                  <p className="text-sm text-secondary-foreground">Dólar del día, costos, comisión y neto final.</p>
                </a>
                <a href="/es-seguro-cambiar-cupo-en-dolares-a-pesos" className="rounded-2xl border border-border p-5 hover:border-primary/40 hover:bg-primary-light transition-colors">
                  <p className="font-extrabold text-foreground mb-2">¿Es seguro cambiar cupo?</p>
                  <p className="text-sm text-secondary-foreground">Señales de confianza y alertas antes de operar.</p>
                </a>
                <a href="/vender-cupo-en-dolares-chile" className="rounded-2xl border border-border p-5 hover:border-primary/40 hover:bg-primary-light transition-colors">
                  <p className="font-extrabold text-foreground mb-2">Vender cupo en dólares</p>
                  <p className="text-sm text-secondary-foreground">Qué significa realmente y cómo funciona en Chile.</p>
                </a>
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
