import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Clock3, CreditCard, FileText, MessageCircle, ShieldCheck, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const requirements = [
  'Tener una tarjeta de crédito emitida en Chile.',
  'Contar con cupo internacional o cupo en dólares disponible.',
  'Ser titular de la tarjeta y de la cuenta donde recibirías los pesos.',
  'Solicitar una cotización antes de decidir si avanzar.',
];

const steps = [
  {
    title: 'Nos indicas el monto que quieres cotizar',
    description: 'Puedes partir preguntando por USD 500, USD 1.000 u otro monto. Revisamos el caso antes de confirmar cualquier operación.',
  },
  {
    title: 'Recibes una cotización clara',
    description: 'Te mostramos cuánto recibirías en pesos chilenos y qué costos están considerados. La cotización no te obliga a operar.',
  },
  {
    title: 'Validamos que el proceso tenga sentido',
    description: 'El proceso es asistido por WhatsApp, con foco en titularidad, trazabilidad y respaldo de la operación.',
  },
  {
    title: 'Si aceptas, coordinamos la operación',
    description: 'Una vez completada la validación, se coordina la transferencia a la cuenta bancaria del titular.',
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Sin claves bancarias',
    description: 'No pedimos claves de acceso a tu banco ni datos sensibles para operar desde tu cuenta.',
  },
  {
    icon: FileText,
    title: 'Cotización antes de avanzar',
    description: 'Primero ves el monto estimado a recibir. Si no te conviene, no tienes obligación de continuar.',
  },
  {
    icon: MessageCircle,
    title: 'Atención humana por WhatsApp',
    description: 'No es una app automática. Una persona te guía y resuelve dudas antes de cualquier decisión.',
  },
];

const faqs = [
  {
    question: '¿Qué significa convertir cupo en dólares a pesos chilenos?',
    answer: 'Significa cotizar una operación usando el cupo internacional disponible de tu tarjeta de crédito para recibir un monto en pesos chilenos en tu cuenta. EnPesos no entrega un préstamo nuevo ni aumenta tu línea de crédito.',
  },
  {
    question: '¿Es lo mismo que un avance en efectivo?',
    answer: 'No. Un avance en efectivo es un producto del banco. EnPesos no ofrece avances, créditos ni financiamiento. Lo que hacemos es ayudarte a cotizar una operación asistida usando cupo internacional ya disponible.',
  },
  {
    question: '¿Cuánto recibo por USD 1.000?',
    answer: 'Depende de la cotización del momento, costos asociados, banco, tarjeta y monto. Por eso siempre informamos el neto estimado en pesos antes de avanzar.',
  },
  {
    question: '¿Me conviene hacerlo?',
    answer: 'No siempre. Si el costo final no hace sentido para ti, lo correcto es no operar. La cotización previa sirve justamente para comparar contra otras alternativas de liquidez.',
  },
  {
    question: '¿Qué tarjetas sirven?',
    answer: 'Se evalúan tarjetas de crédito con cupo internacional disponible. La compatibilidad puede variar según banco, tarjeta, límites y validaciones propias de cada caso.',
  },
  {
    question: '¿Piden claves, token o acceso a mi banco?',
    answer: 'No. No pedimos claves bancarias, token de acceso ni acceso a tu cuenta. El proceso debe realizarse con autorización del titular y con respaldo de la operación.',
  },
];

export default function CupoDolaresAPesos() {
  useEffect(() => {
    document.title = 'Cupo en dólares a pesos chilenos | Cotiza por WhatsApp | EnPesos.cl';

    const metaDescription = 'Cotiza tu cupo en dólares o cupo internacional de tarjeta de crédito para recibir pesos chilenos. Atención humana por WhatsApp, sin claves bancarias y con cotización previa.';
    const canonicalUrl = 'https://www.enpesos.cl/cupo-en-dolares-a-pesos-chilenos';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Cupo en dólares a pesos chilenos | EnPesos.cl' });
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

    let script = document.head.querySelector('#cupo-dolares-faq-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'cupo-dolares-faq-schema';
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
                  <CreditCard className="w-4 h-4" />
                  Cupo internacional de tarjeta de crédito
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Convierte tu cupo en dólares a pesos chilenos
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Si tienes tarjeta de crédito con cupo internacional disponible, en EnPesos.cl puedes cotizar una operación asistida para recibir pesos chilenos en tu cuenta. Sin pedir un préstamo nuevo y con cotización clara antes de avanzar.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seo_cupo_hero')}
                  >
                    Cotizar por WhatsApp
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <a
                    href="#como-funciona"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver cómo funciona
                  </a>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 max-w-2xl">
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">No es préstamo</p>
                    <p className="text-xs text-muted-foreground mt-1">No aumenta tu deuda bancaria con un crédito nuevo.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Sin claves</p>
                    <p className="text-xs text-muted-foreground mt-1">No pedimos acceso a tu banco.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-background/80 p-4">
                    <p className="text-sm font-bold text-foreground">Cotización previa</p>
                    <p className="text-xs text-muted-foreground mt-1">Decides después de ver el neto estimado.</p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <WalletCards className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                  ¿Qué puedes cotizar?
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  Una conversión de cupo internacional disponible a pesos chilenos, evaluada caso a caso. Antes de avanzar, te informamos cuánto recibirías y qué condiciones aplican.
                </p>
                <div className="space-y-4">
                  {requirements.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <p className="text-sm sm:text-base text-foreground font-medium">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-2xl bg-secondary p-4">
                  <p className="text-sm font-bold text-foreground mb-1">Mensaje inicial sugerido</p>
                  <p className="text-sm text-muted-foreground">
                    “Hola, quiero cotizar mi cupo internacional y saber cuánto recibiría en pesos.”
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cupo en dólares</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                ¿Qué es el cupo internacional de una tarjeta de crédito?
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                Muchas tarjetas de crédito en Chile tienen un cupo nacional en pesos y un cupo internacional en dólares. Ese cupo suele usarse para compras en comercios extranjeros, viajes, suscripciones o pagos internacionales. En algunos casos, si tienes cupo disponible, puedes evaluar una operación para transformar ese cupo en pesos chilenos.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-border p-6 bg-card">
                <CreditCard className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Ya tienes el cupo</h3>
                <p className="text-secondary-foreground leading-relaxed">No se trata de solicitar un crédito nuevo. La operación depende de que ya cuentes con cupo internacional disponible.</p>
              </div>
              <div className="rounded-3xl border border-border p-6 bg-card">
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Primero cotizas</h3>
                <p className="text-secondary-foreground leading-relaxed">Antes de operar, recibes una estimación del monto neto en pesos. Así puedes comparar y decidir con información clara.</p>
              </div>
              <div className="rounded-3xl border border-border p-6 bg-card">
                <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Proceso asistido</h3>
                <p className="text-secondary-foreground leading-relaxed">La atención es por WhatsApp y se revisa caso a caso. No se piden claves bancarias ni acceso a tus cuentas.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cómo funciona</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cotizar tu cupo en dólares a pesos chilenos es simple
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                La clave es no avanzar a ciegas. Primero se revisa el monto, luego se informa la cotización y recién después decides si quieres continuar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border bg-background p-6 sm:p-7">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-extrabold mb-5">
                    {index + 1}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3">{step.title}</h3>
                  <p className="text-secondary-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="seguridad" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Seguridad y claridad</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Lo importante no es solo recibir pesos. Es entender bien el proceso.
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                  En este tipo de operación, la confianza importa más que el titular llamativo. Por eso EnPesos trabaja con cotización previa, atención humana y reglas claras antes de operar.
                </p>
                <Button
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('seo_cupo_seguridad')}
                >
                  Hacer una consulta
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid gap-5">
                {trustItems.map((item) => {
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
          </div>
        </section>

        <section id="bancos" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-background p-7 sm:p-10 card-shadow">
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Ejemplo de cotización</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    ¿Cuánto recibirías por USD 1.000?
                  </h2>
                  <p className="text-lg text-secondary-foreground leading-relaxed">
                    No hay un único número fijo. El neto depende del monto, tarjeta, banco, validaciones y costos aplicables al momento de cotizar. Por eso la respuesta correcta no es prometer un valor en la web, sino mostrarte una cotización clara antes de operar.
                  </p>
                </div>
                <div className="rounded-3xl bg-primary-light p-6 min-w-[240px]">
                  <Clock3 className="w-8 h-8 text-primary mb-4" />
                  <p className="text-sm font-bold text-primary mb-1">Primero cotiza</p>
                  <p className="text-2xl font-extrabold text-foreground">Sin obligación</p>
                  <p className="text-sm text-secondary-foreground mt-2">Decides después de ver el monto estimado en pesos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Dudas comunes sobre vender o convertir cupo en dólares
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
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
