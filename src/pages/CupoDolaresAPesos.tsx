import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  WalletCards,
  XCircle,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const WHATSAPP_MESSAGES = {
  hero: 'Hola, vengo desde la página de cupo en dólares a pesos y quiero cotizar mi cupo internacional.',
  seguridad: 'Hola, quiero cotizar mi cupo internacional. Vi que no piden claves bancarias y quiero entender el proceso.',
  pyme: 'Hola, tengo una PyME/emprendimiento y quiero cotizar una alternativa usando cupo internacional disponible.',
  final: 'Hola, quiero revisar mi caso y recibir una cotización antes de decidir.',
};

const steps = [
  {
    title: 'Escribes por WhatsApp',
    description: 'Nos cuentas el monto aproximado que quieres cotizar, el banco de tu tarjeta y si tienes cupo internacional disponible.',
  },
  {
    title: 'Revisamos datos básicos para cotizar',
    description: 'Evaluamos si el caso tiene sentido antes de avanzar. No pedimos claves bancarias ni acceso a tus cuentas.',
  },
  {
    title: 'Recibes monto estimado, costos y condiciones',
    description: 'Te informamos el neto estimado en pesos chilenos, los costos considerados y las condiciones relevantes de la operación.',
  },
  {
    title: 'Si decides avanzar, te acompañamos',
    description: 'Solo si aceptas la cotización, coordinamos los siguientes pasos y mantenemos trazabilidad durante el proceso.',
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Nunca pedimos claves bancarias',
    description: 'No solicitamos claves de banco, contraseñas, token de acceso ni control remoto de tus dispositivos.',
  },
  {
    icon: FileText,
    title: 'Cotización previa y clara',
    description: 'Primero revisas cuánto recibirías, qué costos están considerados y bajo qué condiciones se podría operar.',
  },
  {
    icon: MessageCircle,
    title: 'Atención humana por WhatsApp',
    description: 'Una persona te guía, responde dudas y te ayuda a entender el proceso antes de tomar una decisión.',
  },
];

const informationNeeded = [
  'Banco emisor de la tarjeta',
  'Tipo de tarjeta y cupo internacional aproximado',
  'Monto en dólares que quieres cotizar',
  'Datos de contacto para coordinar por WhatsApp',
  'Cuenta bancaria donde recibirías pesos si decides avanzar',
];

const informationNeverAsked = [
  'Claves bancarias o contraseñas de tu banco',
  'Token, códigos dinámicos o claves de seguridad',
  'Acceso remoto a tu celular o computador',
  'Contraseñas de correo o apps financieras',
  'Acceso directo a tus cuentas bancarias',
];

const useCases = [
  {
    title: 'Persona natural',
    description: 'Para quienes tienen cupo internacional disponible y quieren evaluar una alternativa de liquidez puntual antes de decidir.',
    items: ['Gastos imprevistos', 'Ordenar flujo de caja', 'Comparar contra un avance bancario', 'Recibir pesos en cuenta bancaria'],
  },
  {
    title: 'PyME o emprendimiento',
    description: 'Para negocios chicos que necesitan revisar una alternativa de caja de corto plazo usando cupo internacional disponible.',
    items: ['Pago a proveedores', 'Desfase temporal de caja', 'Capital de trabajo puntual', 'Pagos operativos urgentes'],
  },
];

const notForYou = [
  'No tienes cupo internacional disponible en tu tarjeta de crédito.',
  'No entiendes los costos de usar tu tarjeta y prefieres no asumir ese cargo.',
  'No tienes claridad de cómo pagarás después la deuda de la tarjeta.',
  'Buscas un préstamo de largo plazo o refinanciamiento formal.',
  'Necesitas asesoría financiera, tributaria o legal personalizada.',
  'Esperas una tasa fija garantizada sin revisar primero una cotización.',
];

const comparisonRows = [
  {
    alternative: 'Avance bancario',
    what: 'Dinero entregado por el banco con cargo a la tarjeta.',
    consideration: 'Puede tener intereses, comisiones y condiciones propias del banco.',
  },
  {
    alternative: 'Crédito de consumo',
    what: 'Préstamo formal pagado en cuotas.',
    consideration: 'Puede servir para montos mayores o plazos más largos, sujeto a evaluación crediticia.',
  },
  {
    alternative: 'Cupo internacional',
    what: 'Uso de cupo disponible en dólares de una tarjeta de crédito.',
    consideration: 'Requiere entender tipo de cambio, costos, condiciones y pago posterior de la tarjeta.',
  },
  {
    alternative: 'EnPesos.cl',
    what: 'Cotización asistida por WhatsApp para evaluar una operación con cupo internacional disponible.',
    consideration: 'Primero revisas el monto estimado y decides si te conviene avanzar.',
  },
];

const faqs = [
  {
    question: '¿Qué es el cupo en dólares de una tarjeta de crédito?',
    answer: 'Es la parte del cupo internacional de una tarjeta de crédito que puede utilizarse para operaciones en moneda extranjera, normalmente dólares. No es un crédito nuevo: depende de la línea que ya tienes disponible.',
  },
  {
    question: '¿Qué significa pasar cupo en dólares a pesos chilenos?',
    answer: 'Significa cotizar una operación usando cupo internacional disponible de tu tarjeta de crédito para recibir un monto estimado en pesos chilenos en tu cuenta bancaria, descontando costos y condiciones aplicables.',
  },
  {
    question: '¿EnPesos es un préstamo?',
    answer: 'No. EnPesos no entrega créditos, préstamos ni aumenta tu línea bancaria. Entregamos atención asistida para cotizar una operación usando cupo internacional que ya está disponible en tu tarjeta.',
  },
  {
    question: '¿Es lo mismo que un avance en efectivo?',
    answer: 'No. Un avance en efectivo es un producto del banco. EnPesos no ofrece avances bancarios; te ayuda a cotizar una alternativa asistida con cupo internacional disponible.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Puedes pedir una cotización, revisar el monto estimado, costos y condiciones, hacer preguntas y decidir si te conviene. Cotizar no significa que tengas que avanzar.',
  },
  {
    question: '¿Piden claves bancarias, token o acceso a mi cuenta?',
    answer: 'No. Nunca pedimos claves bancarias, token de acceso, contraseñas, control remoto de dispositivos ni acceso a tus cuentas. Si alguien te pide eso, no lo entregues.',
  },
  {
    question: '¿Cuánto puedo recibir por mi cupo internacional?',
    answer: 'Depende del monto disponible, tipo de cambio, banco, tarjeta, costos de procesamiento, margen del servicio y condiciones vigentes al momento de cotizar. Por eso entregamos un neto estimado antes de avanzar.',
  },
  {
    question: '¿Qué bancos o tarjetas sirven?',
    answer: 'Se revisa caso a caso. En general se evalúan tarjetas de crédito con cupo internacional disponible, pero la compatibilidad puede variar según banco, tarjeta, límites y validaciones.',
  },
  {
    question: '¿Cuánto demora el proceso?',
    answer: 'El tiempo depende del banco, tarjeta, monto, validaciones y condiciones de la operación. Evitamos prometer un plazo único porque lo responsable es revisar cada caso antes de confirmar.',
  },
  {
    question: '¿Puedo cotizar si soy de regiones?',
    answer: 'Sí. La atención es por WhatsApp, por lo que puedes cotizar de forma remota desde distintas ciudades de Chile. Si decides avanzar, la coordinación se realiza por ese canal.',
  },
  {
    question: '¿Qué pasa si mi banco rechaza la operación?',
    answer: 'Puede ocurrir por límites, seguridad, configuración de la tarjeta u otras validaciones del banco. En ese caso se revisa la situación y no se debe forzar una operación que el banco no permite.',
  },
  {
    question: '¿Qué costos debo considerar?',
    answer: 'Debes considerar tipo de cambio, costos asociados, margen o comisión del servicio y el cargo que luego deberás pagar en tu tarjeta. Todo eso debe revisarse antes de decidir.',
  },
  {
    question: '¿Cómo pago después el cargo de mi tarjeta?',
    answer: 'El cargo asociado a la operación queda vinculado a tu tarjeta de crédito y deberás pagarlo según las condiciones de tu banco, facturación, tipo de cambio y fechas de pago.',
  },
  {
    question: '¿Sirve para PyMEs o emprendimientos?',
    answer: 'Puede servir para evaluar una necesidad puntual de liquidez o caja de corto plazo, siempre que exista cupo internacional disponible y se entiendan los costos. No debe confundirse con crédito PyME formal.',
  },
];

export default function CupoDolaresAPesos() {
  useEffect(() => {
    document.title = 'Cupo en dólares a pesos chilenos | Cotiza por WhatsApp | EnPesos.cl';

    const metaDescription = 'Cotiza tu cupo en dólares o cupo internacional de tarjeta de crédito para recibir pesos chilenos. Atención humana por WhatsApp, cotización clara y sin claves bancarias.';
    const canonicalUrl = 'https://www.enpesos.cl/cupo-en-dolares-a-pesos-chilenos';
    const siteUrl = 'https://www.enpesos.cl';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Cotiza tu cupo en dólares a pesos chilenos | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: 'Atención asistida por WhatsApp para evaluar tu cupo internacional disponible. Cotización clara, sin claves bancarias y sin obligación de operar.' });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'EnPesos.cl' });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'EnPesos.cl',
        url: siteUrl,
        sameAs: [
          'https://www.instagram.com/enpesoscl/',
          'https://www.facebook.com/enpesoscl',
          'https://www.tiktok.com/@enpesoscl',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: '+56974483779',
          availableLanguage: 'Spanish',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Cupo en dólares a pesos chilenos',
        description: metaDescription,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'EnPesos.cl',
          url: siteUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Cotización asistida de cupo en dólares a pesos chilenos',
        provider: {
          '@type': 'Organization',
          name: 'EnPesos.cl',
          url: siteUrl,
        },
        areaServed: 'Chile',
        serviceType: 'Atención asistida por WhatsApp para cotizar cupo internacional disponible',
        description: 'Servicio de atención asistida para personas con tarjeta de crédito y cupo internacional disponible que quieren cotizar una operación para recibir pesos chilenos en su cuenta.',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Cupo en dólares a pesos chilenos',
            item: canonicalUrl,
          },
        ],
      },
      {
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
      },
    ];

    let script = document.head.querySelector('#cupo-dolares-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'cupo-dolares-schema';
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
                  Cupo en dólares a pesos chilenos: cotiza por WhatsApp
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  EnPesos.cl entrega atención humana por WhatsApp para personas con tarjeta de crédito y cupo en dólares disponible. Antes de avanzar, te explicamos el monto estimado, costos, condiciones y pasos del proceso.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-8 max-w-2xl">
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">Cotización previa antes de decidir.</p>
                  </div>
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">No pedimos claves bancarias ni acceso a tus cuentas.</p>
                  </div>
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">Atención por WhatsApp con una persona real.</p>
                  </div>
                  <div className="flex gap-2 rounded-2xl border border-border bg-background/80 p-4">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground">El monto final depende del banco, tarjeta y condiciones.</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp('seo_cupo_hero', WHATSAPP_MESSAGES.hero)}
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
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <WalletCards className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                  Primero entiendes. Después decides.
                </h2>
                <p className="text-secondary-foreground leading-relaxed mb-6">
                  Puedes cotizar una operación usando el cupo internacional disponible de tu tarjeta de crédito. Si la cotización te conviene y decides avanzar, recibes pesos chilenos en tu cuenta bancaria según las condiciones informadas.
                </p>

                <div className="rounded-[2rem] border border-border bg-secondary p-3 sm:p-4">
                  <div className="rounded-[1.5rem] bg-background overflow-hidden border border-border">
                    <div className="bg-primary px-4 py-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-foreground/95 flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-primary-foreground">EnPesos por WhatsApp</p>
                        <p className="text-xs text-primary-foreground/80">Cotización asistida</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 bg-[linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]">
                      <div className="max-w-[86%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">Hola, tengo cupo internacional disponible. ¿Cuánto recibiría por USD 1.000?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">Lo cotizamos antes de avanzar: monto estimado, costos y condiciones. No necesitas entregar claves bancarias.</p>
                      </div>
                      <div className="max-w-[84%] rounded-2xl rounded-tl-md bg-background px-4 py-3 border border-border shadow-sm">
                        <p className="text-sm text-foreground">¿Cotizar me obliga a operar?</p>
                      </div>
                      <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md bg-primary px-4 py-3 shadow-sm">
                        <p className="text-sm text-primary-foreground">No. Primero revisas si te conviene y después decides.</p>
                      </div>
                    </div>
                  </div>
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
                <p className="text-secondary-foreground leading-relaxed">No se trata de pedir un crédito nuevo. La operación depende de que ya cuentes con cupo internacional disponible.</p>
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
                Cómo cotizar tu cupo en dólares a pesos chilenos
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

        <section id="informacion" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-7 h-7 text-accent" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Información razonable para cotizar</h2>
                </div>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  Para entregar una cotización seria, necesitamos entender el caso. La información solicitada debe estar relacionada con la operación y su trazabilidad.
                </p>
                <ul className="space-y-3">
                  {informationNeeded.map((item) => (
                    <li key={item} className="flex gap-3 text-secondary-foreground">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-7 h-7 text-destructive" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Información que nunca deberías entregar</h2>
                </div>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  Si alguien te pide claves, accesos o control de tus dispositivos, detente. Esa información no corresponde para una cotización responsable.
                </p>
                <ul className="space-y-3">
                  {informationNeverAsked.map((item) => (
                    <li key={item} className="flex gap-3 text-secondary-foreground">
                      <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="seguridad" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Seguridad y claridad</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  ¿Es seguro cambiar cupo en dólares a pesos?
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed mb-6">
                  La seguridad depende de entender el proceso, revisar la cotización antes de decidir y no entregar información sensible. EnPesos nunca solicita claves bancarias ni acceso a tus cuentas.
                </p>
                <div className="rounded-3xl border border-primary/20 bg-background p-5 mb-6">
                  <p className="text-base font-extrabold text-foreground mb-2">Cotizar no te obliga a operar.</p>
                  <p className="text-secondary-foreground leading-relaxed">
                    Puedes pedir una estimación, revisar si el monto te conviene y hacer preguntas. Solo avanzas si estás de acuerdo con las condiciones.
                  </p>
                </div>
                <Button
                  className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                  onClick={() => openWhatsApp('seo_cupo_seguridad', WHATSAPP_MESSAGES.seguridad)}
                >
                  Cotizar sin entregar claves
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid gap-5">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-3xl border border-border bg-background p-6 flex gap-4">
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

        <section id="monto" className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-7 sm:p-10 card-shadow">
              <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Ejemplo de cotización</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    ¿Cuánto recibirías por USD 1.000 de cupo internacional?
                  </h2>
                  <p className="text-lg text-secondary-foreground leading-relaxed mb-4">
                    No hay un único número fijo. El neto depende del monto, tarjeta, banco, tipo de cambio, validaciones y costos aplicables al momento de cotizar. Por eso la respuesta responsable no es prometer un valor fijo en la web, sino mostrarte una cotización clara antes de operar.
                  </p>
                  <a className="font-bold text-primary hover:underline" href="/cuanto-recibo-por-mi-cupo-en-dolares">
                    Ver cómo se calcula cuánto podrías recibir por tu cupo en dólares
                  </a>
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

        <section id="para-quien" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Casos de uso</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                ¿Para quién puede servir cotizar cupo en dólares?
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Puede servir para evaluar liquidez puntual, pero no reemplaza una decisión financiera responsable. La cotización existe para que puedas comparar antes de avanzar.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="rounded-3xl border border-border bg-background p-6 sm:p-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                    {useCase.title.includes('PyME') ? <Building2 className="w-6 h-6 text-primary" /> : <WalletCards className="w-6 h-6 text-primary" />}
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground mb-3">{useCase.title}</h3>
                  <p className="text-secondary-foreground leading-relaxed mb-5">{useCase.description}</p>
                  <ul className="space-y-3">
                    {useCase.items.map((item) => (
                      <li key={item} className="flex gap-3 text-secondary-foreground">
                        <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {useCase.title.includes('PyME') && (
                    <Button
                      className="mt-6 h-12 rounded-xl px-7 text-base font-bold button-shadow"
                      onClick={() => openWhatsApp('seo_cupo_pyme', WHATSAPP_MESSAGES.pyme)}
                    >
                      Cotizar para mi negocio
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="no-sirve" className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <AlertTriangle className="w-10 h-10 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 mb-3">También hay límites</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Esto puede no ser para ti si...
                  </h2>
                  <p className="text-secondary-foreground leading-relaxed mb-6">
                    Una buena cotización también debe ayudarte a decidir cuándo no avanzar. Evitamos vender una operación como solución universal.
                  </p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {notForYou.map((item) => (
                      <div key={item} className="flex gap-3 rounded-2xl bg-background p-4 border border-amber-100">
                        <XCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        <p className="text-sm text-secondary-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="comparar" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Comparar alternativas</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                No es lo mismo que un crédito, un avance bancario o una casa de cambio
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                Antes de decidir, conviene entender qué alternativa estás evaluando y qué costos o condiciones pueden aplicar.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-background">
              <div className="grid md:grid-cols-[0.85fr_1fr_1.25fr] gap-0 bg-primary text-primary-foreground font-extrabold">
                <div className="p-4">Alternativa</div>
                <div className="p-4">Qué es</div>
                <div className="p-4">Consideración</div>
              </div>
              {comparisonRows.map((row) => (
                <div key={row.alternative} className="grid md:grid-cols-[0.85fr_1fr_1.25fr] gap-0 border-t border-border">
                  <div className="p-4 font-extrabold text-foreground">{row.alternative}</div>
                  <div className="p-4 text-secondary-foreground">{row.what}</div>
                  <div className="p-4 text-secondary-foreground">{row.consideration}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cluster" className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Aprende antes de decidir</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Guías útiles sobre cupo internacional y seguridad
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto">
                Si todavía tienes dudas, revisa estas guías antes de cotizar. La idea es que entiendas el proceso, costos y cuidados básicos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <a href="/vender-cupo-en-dolares-chile" className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Vender cupo en dólares en Chile</h3>
                <p className="text-secondary-foreground leading-relaxed">Entiende el concepto, cuándo se usa y qué debes revisar antes de avanzar.</p>
              </a>
              <a href="/es-seguro-cambiar-cupo-en-dolares-a-pesos" className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
                <ShieldCheck className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">¿Es seguro cambiar cupo?</h3>
                <p className="text-secondary-foreground leading-relaxed">Aprende qué información no debes entregar y cómo reducir riesgos.</p>
              </a>
              <a href="/como-pagar-deuda-en-dolares-tarjeta-credito" className="rounded-3xl border border-border bg-card p-6 hover:border-primary/40 transition-colors">
                <CreditCard className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-extrabold text-foreground mb-2">Cómo pagar deuda en dólares</h3>
                <p className="text-secondary-foreground leading-relaxed">Revisa qué considerar después de usar el cupo internacional de tu tarjeta.</p>
              </a>
            </div>
          </div>
        </section>

        <section id="preguntas-frecuentes" className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Dudas comunes sobre cupo en dólares a pesos chilenos
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
            <div className="rounded-3xl bg-primary p-7 sm:p-10 text-primary-foreground text-center card-shadow">
              <HelpCircle className="w-10 h-10 mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Cotiza antes de decidir</h2>
              <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-7 text-primary-foreground/90">
                Escríbenos por WhatsApp, revisamos tu caso y te entregamos una cotización clara. No estás obligado a operar.
              </p>
              <Button
                variant="secondary"
                className="h-12 rounded-xl px-7 text-base font-bold"
                onClick={() => openWhatsApp('seo_cupo_final', WHATSAPP_MESSAGES.final)}
              >
                Revisar mi caso por WhatsApp
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
