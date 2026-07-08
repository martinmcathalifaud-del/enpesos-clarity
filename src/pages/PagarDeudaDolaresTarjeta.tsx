import { useEffect } from 'react';
import { AlertTriangle, ArrowRight, CalendarDays, Calculator, CheckCircle2, CreditCard, FileText, MessageCircle, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const reviewItems = [
  {
    icon: CreditCard,
    title: 'Cargo o deuda posterior',
    description: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.',
  },
  {
    icon: CalendarDays,
    title: 'Fecha de facturación y fecha de pago',
    description: 'El día en que se registra el cargo y la fecha de vencimiento pueden afectar cuándo debes pagarlo y cómo aparecerá en tu estado de cuenta.',
  },
  {
    icon: WalletCards,
    title: 'Tipo de cambio usado por el banco',
    description: 'Tu banco o emisor puede usar sus propias reglas para convertir, facturar o cobrar montos asociados al cupo internacional.',
  },
  {
    icon: FileText,
    title: 'Pago mínimo, intereses y condiciones',
    description: 'Si no pagas el total facturado, pueden aplicarse intereses, cargos u otras condiciones del contrato de tu tarjeta.',
  },
];

const checklist = [
  'Revisa tu estado de cuenta y las condiciones de tu tarjeta.',
  'Confirma si el cargo se muestra en dólares, pesos o bajo una regla específica del banco.',
  'Mira fecha de facturación, fecha de vencimiento y forma de pago disponible.',
  'Considera intereses, pago mínimo, comisiones u otros cargos si no pagas el total.',
  'No avances si no entiendes cómo pagarás después.',
];

const relatedLinks = [
  { label: 'Simulador de pago de tarjeta', href: '/simulador-pago-tarjeta-credito' },
  { label: 'Cuánto recibo por mi cupo', href: '/cuanto-recibo-por-mi-cupo-en-dolares' },
  { label: 'Formas de financiamiento', href: '/formas-de-financiamiento-para-personas-chile' },
  { label: 'Seguridad', href: '/seguridad' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos' },
];

const faqs = [
  {
    question: '¿Después de usar mi cupo en dólares tengo que pagarle al banco?',
    answer: 'Sí. Si se realiza una operación con tu tarjeta, el banco o emisor puede registrar un cargo o deuda en tu estado de cuenta. Debes revisar cómo se factura y cómo tendrás que pagarlo según las condiciones de tu tarjeta.',
  },
  {
    question: '¿EnPesos define cómo se paga la deuda de mi tarjeta?',
    answer: 'No. EnPesos no define fechas de pago, intereses, pago mínimo, tipo de cambio del banco ni condiciones de tu contrato de tarjeta. Eso depende de tu banco o emisor.',
  },
  {
    question: '¿El cargo se paga en dólares o en pesos?',
    answer: 'Depende de tu banco o emisor. Algunas tarjetas muestran saldo internacional en dólares y otras permiten pagar o convertir según sus propias reglas. Debes revisarlo directamente con tu banco.',
  },
  {
    question: '¿Qué pasa si no pago el total facturado?',
    answer: 'Podrían aplicarse intereses, cargos u otras condiciones propias de tu tarjeta. Por eso conviene revisar capacidad de pago antes de aceptar una operación.',
  },
  {
    question: '¿Me conviene cotizar si no sé cómo voy a pagar la tarjeta?',
    answer: 'Si no tienes claro cómo se reflejará el cargo o cómo lo pagarás, lo responsable es revisar primero la información de tu banco o emisor antes de avanzar.',
  },
];

export default function PagarDeudaDolaresTarjeta() {
  useEffect(() => {
    document.title = 'Cómo pagar la deuda en dólares de la tarjeta | EnPesos.cl';

    const metaDescription = 'Entiende qué pasa después de usar cupo internacional: cargo o deuda en tarjeta, facturación, tipo de cambio del banco, pago mínimo, intereses y condiciones del emisor.';
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
                  Guía sobre deuda posterior
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Qué pasa con la deuda de la tarjeta después de usar cupo en dólares
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  Antes de cotizar, mira la operación completa: cuánto podrías recibir en pesos y qué cargo o deuda puede quedar después en tu tarjeta de crédito.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('seo_pagar_deuda_hero')}>
                    Resolver dudas por WhatsApp
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a href="/simulador-pago-tarjeta-credito" className="inline-flex h-12 items-center justify-center rounded-xl border border-primary/30 bg-background px-7 text-base font-bold text-primary hover:bg-primary-light transition-colors">
                    Simular pago
                    <Calculator className="w-5 h-5" />
                  </a>
                  <a href="#que-revisar" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">
                    Ver qué revisar
                  </a>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>Esta guía no reemplaza la información oficial de tu banco o emisor. Cada tarjeta puede tener condiciones distintas de facturación, pago, intereses y tipo de cambio.</p>
                  </div>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">Mira dos cosas al mismo tiempo</h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">Lo que recibirías en pesos hoy y lo que tendrás que pagar después no son lo mismo. Ambas partes deben estar claras antes de decidir.</p>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-secondary p-4">
                    <p className="text-sm font-bold text-foreground mb-1">Lo que recibes</p>
                    <p className="text-sm text-secondary-foreground">Monto neto estimado en pesos, informado antes de avanzar.</p>
                  </div>
                  <div className="rounded-2xl bg-primary-light p-4">
                    <p className="text-sm font-bold text-foreground mb-1">Lo que pagas después</p>
                    <p className="text-sm text-secondary-foreground">Cargo o deuda en la tarjeta, según banco, emisor y condiciones.</p>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">Antes de aceptar una cotización, revisa cómo se pagará el cargo</h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">EnPesos puede ayudarte a cotizar, pero no define las condiciones bancarias de tu tarjeta. Esa parte depende de tu banco o emisor.</p>
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
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-6">Preguntas que deberías responder antes de avanzar</h2>
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">Si no sabes cómo vas a pagar la tarjeta, no avances todavía</h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">Cotizar puede ayudarte a entender cuánto recibirías en pesos, pero la decisión responsable también considera capacidad de pago, fecha de vencimiento y condiciones del emisor.</p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                <h3 className="text-2xl font-extrabold text-foreground mb-4">Qué sí y qué no define EnPesos</h3>
                <div className="space-y-4">
                  <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><p className="text-secondary-foreground">Puede informar una cotización previa con monto neto estimado en pesos.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><p className="text-secondary-foreground">No define intereses, pago mínimo, facturación ni tipo de cambio del banco.</p></div>
                  <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><p className="text-secondary-foreground">No ofrece préstamos, créditos, avances bancarios ni asesoría financiera personalizada.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Dudas sobre deuda en dólares y tarjeta de crédito</h2>
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedLinks.map((link) => (
                  <a key={link.href} href={link.href} className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40 hover:bg-primary-light transition-colors">
                    <p className="font-extrabold text-foreground">{link.label}</p>
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
