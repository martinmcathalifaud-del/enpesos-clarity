import { useEffect } from 'react';
import { AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, CreditCard, FileText, MessageCircle, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const reviewItems = [
  {
    icon: CreditCard,
    title: 'Cómo factura tu banco los cargos internacionales',
    description: 'Cada banco puede mostrar y cobrar los cargos en dólares de forma distinta. Revisa tu estado de cuenta y las condiciones de tu tarjeta.',
  },
  {
    icon: CalendarDays,
    title: 'Fecha de facturación y fecha de pago',
    description: 'La fecha en que se registra el cargo y la fecha de vencimiento pueden afectar cuándo debes pagarlo y cómo lo verás en tu cartola.',
  },
  {
    icon: WalletCards,
    title: 'Tipo de cambio usado por tu banco',
    description: 'El banco puede usar su propio tipo de cambio para convertir montos en dólares a pesos, según sus reglas y fecha de facturación o pago.',
  },
  {
    icon: FileText,
    title: 'Intereses, cuotas y pago mínimo',
    description: 'Si no pagas el total facturado, pueden aplicarse intereses u otros cargos. No conviene avanzar si no entiendes cómo vas a pagar después.',
  },
];

const checklist = [
  'Revisa si el cargo quedará facturado en dólares o convertido a pesos por tu banco.',
  'Confirma la fecha de facturación, fecha de vencimiento y condiciones de pago.',
  'Mira si tu tarjeta permite pagar el saldo internacional en pesos, dólares o ambos.',
  'Considera que el tipo de cambio del banco puede cambiar respecto del día de la operación.',
  'No avances si dependes de pagar solo el mínimo y no entiendes el costo financiero total.',
];

const faqs = [
  {
    question: '¿Después de usar mi cupo en dólares tengo que pagarle al banco?',
    answer: 'Sí. Si se realiza una operación con tu tarjeta, el banco puede registrar un cargo asociado en tu estado de cuenta. Antes de avanzar debes revisar cómo se factura y cómo tendrás que pagarlo según las condiciones de tu tarjeta.',
  },
  {
    question: '¿EnPesos define cómo se paga la deuda de mi tarjeta?',
    answer: 'No. La forma de pago, fechas, intereses, cuotas y tipo de cambio aplicable dependen de tu banco y de las condiciones de tu tarjeta de crédito.',
  },
  {
    question: '¿El cargo se paga en dólares o en pesos?',
    answer: 'Depende de tu banco y de tu tarjeta. Algunas tarjetas muestran saldo internacional en dólares y otras permiten convertir o pagar en pesos según sus condiciones. Debes revisarlo directamente en tu banco.',
  },
  {
    question: '¿Qué pasa si no pago el total facturado?',
    answer: 'Podrían aplicarse intereses, cargos u otras condiciones propias de tu tarjeta. Por eso es importante entender el costo posterior antes de cotizar o aceptar una operación.',
  },
  {
    question: '¿Me conviene cotizar si no sé cómo voy a pagar la tarjeta?',
    answer: 'No. Si no tienes claro cómo se reflejará el cargo o cómo pagarás el estado de cuenta, lo responsable es revisar primero la información de tu banco antes de avanzar.',
  },
];

export default function PagarDeudaDolaresTarjeta() {
  useEffect(() => {
    document.title = 'Cómo pagar la deuda en dólares de la tarjeta | EnPesos.cl';

    const metaDescription = 'Guía para entender qué revisar después de usar cupo internacional: estado de cuenta, deuda en dólares, tipo de cambio, fechas de pago e información del banco.';
    const canonicalUrl = 'https://www.enpesos.cl/como-pagar-deuda-en-dolares-tarjeta-credito';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Cómo pagar la deuda en dólares de la tarjeta | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
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

    let script = document.head.querySelector('#pagar-deuda-dolares-faq-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'pagar-deuda-dolares-faq-schema';
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
                  <FileText className="w-4 h-4" />
                  Guía para usar cupo internacional con responsabilidad
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Cómo pagar la deuda en dólares de la tarjeta después de usar el cupo
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Antes de cotizar una operación con tu cupo internacional, no basta con mirar cuánto recibirías en pesos. También debes entender cómo se reflejará el cargo en tu tarjeta, cuándo tendrás que pagarlo y qué condiciones aplica tu banco.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seo_pagar_deuda_hero')}
                  >
                    Resolver dudas por WhatsApp
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a
                    href="#que-revisar"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver qué revisar
                  </a>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>
                      Esta guía no reemplaza la información oficial de tu banco. Cada tarjeta puede tener condiciones distintas de facturación, pago, intereses y tipo de cambio.
                    </p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  La pregunta correcta no es solo cuánto recibes
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  También deberías preguntarte: “si uso mi cupo internacional, ¿cómo aparecerá después en mi estado de cuenta y cómo lo voy a pagar?”.
                </p>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-secondary p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">Usuario</p>
                    <p className="text-sm font-semibold text-foreground">“Si recibo pesos hoy, ¿después qué pasa con mi tarjeta?”</p>
                  </div>
                  <div className="rounded-2xl bg-primary-light p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary mb-2">EnPesos</p>
                    <p className="text-sm font-semibold text-foreground">“Antes de avanzar, revisa cómo tu banco factura el cargo, la fecha de pago y el tipo de cambio aplicable.”</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="que-revisar" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Qué revisar</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Antes de aceptar una cotización, mira cómo se pagará el cargo
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Una operación puede parecer conveniente por el monto que recibes hoy, pero la decisión completa incluye lo que pasará después con tu tarjeta de crédito.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {reviewItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-3xl border border-border bg-card p-6 flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground mb-2">{item.title}</h3>
                      <p className="text-secondary-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-background p-7 sm:p-10 card-shadow">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Checklist</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-6">
                Preguntas que deberías responder antes de avanzar
              </h2>
              <div className="space-y-4">
                {checklist.map((item) => (
                  <div key={item} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <p className="text-secondary-foreground leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Criterio responsable</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Si no sabes cómo vas a pagar la tarjeta, no avances todavía
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  EnPesos puede ayudarte a cotizar el monto neto estimado, pero la obligación con tu tarjeta depende de tu banco. La decisión responsable es revisar ambos lados: lo que recibes hoy y lo que tendrás que pagar después.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                <h3 className="text-2xl font-extrabold text-foreground mb-4">Cómo lo comunicamos en EnPesos</h3>
                <div className="space-y-4">
                  <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><p className="text-secondary-foreground">Primero te informamos el neto estimado en pesos.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><p className="text-secondary-foreground">La cotización no te obliga a operar.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><p className="text-secondary-foreground">Te recomendamos revisar las condiciones de tu tarjeta antes de aceptar.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><p className="text-secondary-foreground">No ofrecemos préstamos, avances bancarios ni asesoría financiera personalizada.</p></div>
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
                Dudas sobre deuda en dólares y tarjeta de crédito
              </h2>
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-primary-light via-background to-secondary p-7 sm:p-10 text-center card-shadow">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cotiza solo si entiendes ambos lados de la operación
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto mb-7">
                Podemos ayudarte a estimar cuánto recibirías en pesos. Pero antes de avanzar, revisa cómo tu banco mostrará y cobrará el cargo en tu tarjeta.
              </p>
              <Button
                className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                onClick={() => openWhatsApp('seo_pagar_deuda_footer')}
              >
                Consultar por WhatsApp
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <a href="/cuanto-recibo-por-mi-cupo-en-dolares" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Guía relacionada</p>
                <h3 className="font-extrabold text-foreground">Cuánto recibo por mi cupo en dólares</h3>
              </a>
              <a href="/es-seguro-cambiar-cupo-en-dolares-a-pesos" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Guía relacionada</p>
                <h3 className="font-extrabold text-foreground">¿Es seguro cambiar cupo en dólares?</h3>
              </a>
              <a href="/avance-cupo-en-dolares-online" className="rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition-colors">
                <p className="text-sm font-bold text-primary mb-2">Guía relacionada</p>
                <h3 className="font-extrabold text-foreground">Avance cupo en dólares online</h3>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
