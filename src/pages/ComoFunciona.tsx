import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, CreditCard, FileText, HelpCircle, Landmark, LockKeyhole, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const CANONICAL_URL = 'https://www.enpesos.cl/como-funciona';
const metaDescription = 'Conoce como EnPesos te ayuda a cotizar tu cupo en dolares de la tarjeta, ver cuantos pesos podrias recibir y entender el cargo posterior antes de decidir.';

const steps = [
  {
    title: 'Indicas el monto que quieres cotizar',
    description: 'Nos cuentas que tienes cupo internacional disponible o cupo en dolares en tu tarjeta y que monto quieres revisar.',
  },
  {
    title: 'Recibes una cotizacion previa',
    description: 'Te mostramos cuantos pesos chilenos podrias recibir en tu cuenta, junto con el costo y las condiciones antes de avanzar.',
  },
  {
    title: 'Decides si te hace sentido',
    description: 'Cotizar no te obliga. Puedes preguntar, comparar y seguir solo si el monto y las condiciones te acomodan.',
  },
  {
    title: 'Se coordina la operacion asistida',
    description: 'Si decides avanzar, el proceso se acompana paso a paso y se revisa la informacion necesaria sin pedir claves bancarias.',
  },
  {
    title: 'Se confirma la operacion con tu tarjeta',
    description: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de credito, segun las condiciones de tu banco o emisor.',
  },
  {
    title: 'Recibes pesos chilenos en tu cuenta',
    description: 'Una vez confirmada la operacion, recibes una transferencia en pesos chilenos en una cuenta bancaria del titular validado.',
  },
];

const allowedData = [
  'Nombre y datos de contacto.',
  'Monto aproximado que quieres cotizar.',
  'Banco, emisor o tipo de tarjeta a nivel general.',
  'Confirmacion de cupo internacional disponible.',
  'Cuenta bancaria chilena del titular, si corresponde avanzar.',
];

const neverData = [
  'Clave bancaria o clave de internet.',
  'Token, coordenadas o codigos para entrar a tu banco.',
  'CVV por WhatsApp.',
  'Acceso remoto a tu celular o computador.',
  'Fotos completas de tu tarjeta por ambos lados.',
];

const deepDiveSections = [
  {
    heading: 'Antes de cotizar: qué necesitas tener',
    paragraphs: [
      'Para pedir una cotización necesitas tener una tarjeta de crédito con cupo internacional disponible y saber, de forma aproximada, cuánto quieres evaluar en dólares. No necesitas viajar ni tener compras previas en el extranjero: el cupo internacional suele estar aprobado igual, aunque lo uses poco.',
      'Antes de escribir por WhatsApp, revisa tu estado de cuenta para confirmar que el cupo aparece disponible y si ya existen cargos pendientes que podrían afectar tu capacidad de pago más adelante.',
    ],
  },
  {
    heading: 'Qué pasa durante la revisión de tu caso',
    paragraphs: [
      'Una vez que escribes por WhatsApp, se revisan los datos básicos necesarios para orientar la cotización: banco o tipo de tarjeta, monto aproximado y confirmación de cupo internacional disponible.',
      'Cada caso se evalúa de forma individual porque el monto final depende del tipo de tarjeta, el banco o emisor, el dólar de referencia y los costos de procesamiento del momento. No se promete un resultado ni un tiempo exacto antes de revisar esta información, porque cada caso puede tomar un curso distinto.',
    ],
  },
  {
    heading: 'Qué información se pide y qué nunca se pide',
    paragraphs: [
      'Normalmente se solicitan datos como nombre, contacto, banco o tipo de tarjeta, monto aproximado y, si decides avanzar, una cuenta bancaria chilena a nombre del titular validado.',
      'EnPesos nunca pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación, acceso remoto a tu celular o computador, ni el CVV por WhatsApp, y tampoco pide fotos completas de tu tarjeta por ambos lados. Si alguien te solicita esos datos a nombre de EnPesos, no se los entregues.',
    ],
  },
  {
    heading: 'Qué pasa con tu tarjeta si decides avanzar',
    paragraphs: [
      'Si decides avanzar y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito. Ese cargo depende de las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total facturado.',
      'EnPesos no define esas condiciones y tampoco puede anticipar un tiempo exacto para cada revisión, porque depende de la información de tu banco o emisor y del propio caso.',
    ],
  },
  {
    heading: 'Si una operación no puede completarse',
    paragraphs: [
      'No todos los casos avanzan hasta el final. Si una operación no puede completarse por algún motivo, el proceso se detiene y se revisa el caso antes de cualquier siguiente paso, sin presionarte a continuar.',
      'Cotizar tampoco te obliga a avanzar: puedes preguntar, comparar y desistir en cualquier momento si la información no te hace sentido. WhatsApp funciona como canal de contacto para resolver dudas, no como una promesa de aprobación.',
    ],
  },
  {
    heading: 'Qué revisar en tu estado de cuenta',
    paragraphs: [
      'Antes de aceptar una cotización, revisa en tu estado de cuenta cuánto cupo internacional aparece disponible, si tienes cargos pendientes y qué condiciones informa tu banco o emisor sobre compras o cargos en dólares.',
      'Esta revisión previa ayuda a que la cotización que recibas tenga sentido con tu situación real y a que entiendas con más claridad qué puede pasar después con tu tarjeta.',
    ],
  },
];

const faqs = [
  {
    question: '¿Cotizar me obliga a avanzar?',
    answer: 'No. La cotizacion sirve para revisar cuanto podrias recibir, el costo y las condiciones antes de decidir.',
  },
  {
    question: '¿Que pasa despues con mi tarjeta?',
    answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de credito, segun las condiciones de tu banco o emisor.',
  },
  {
    question: '¿Cuanto demora el proceso?',
    answer: 'Te indicamos los tiempos estimados antes de avanzar. No prometemos plazos exactos sin revisar el caso.',
  },
  {
    question: '¿Que pasa si no me conviene?',
    answer: 'Puedes detenerte. Si la cotizacion no te hace sentido, no tienes obligacion de continuar.',
  },
  {
    question: '¿Que pasa si una operacion no puede completarse?',
    answer: 'Si una operacion no puede completarse, se detiene el proceso y se revisa el caso antes de cualquier siguiente paso.',
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

export default function ComoFunciona() {
  useEffect(() => {
    document.title = 'Como funciona EnPesos | Cupo en dolares a pesos chilenos';

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Como funciona EnPesos' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: CANONICAL_URL });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: CANONICAL_URL });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${CANONICAL_URL}#webpage`,
          url: CANONICAL_URL,
          name: 'Como funciona EnPesos',
          description: metaDescription,
          isPartOf: {
            '@type': 'WebSite',
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

    const scriptId = 'como-funciona-schema';
    document.getElementById(scriptId)?.remove();
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => document.getElementById(scriptId)?.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="hero-gradient px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary">Proceso paso a paso</p>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Como funciona EnPesos: cotizas primero y decides despues
              </h1>
              <p className="mb-7 max-w-2xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                Si tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuantos pesos chilenos podrias recibir usando ese cupo. Si decides avanzar, se realiza una operacion asistida con tu tarjeta y recibes una transferencia en pesos en tu cuenta.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('como_funciona_hero')}>
                  Solicitar cotizacion
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <a href="/preguntas-frecuentes" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">
                  Ver preguntas frecuentes
                </a>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <WalletCards className="mb-5 h-10 w-10 text-primary" />
              <h2 className="mb-4 text-2xl font-extrabold text-foreground">En simple</h2>
              <div className="grid gap-4 text-sm font-semibold text-secondary-foreground">
                <div className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />Cotizas cuanto podrias recibir en pesos.</div>
                <div className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />Ves costo y condiciones antes de decidir.</div>
                <div className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />No entregas claves bancarias ni CVV por WhatsApp.</div>
                <div className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />Puede generarse un cargo o deuda en tu tarjeta.</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Paso a paso</p>
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Desde la cotizacion hasta la transferencia.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-black text-primary-foreground">{index + 1}</div>
                  <h3 className="mb-3 text-xl font-black text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary-foreground">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
              <CreditCard className="mb-5 h-8 w-8 text-primary" />
              <h2 className="mb-3 text-2xl font-black text-foreground">Que pasa con tu tarjeta</h2>
              <p className="leading-relaxed text-secondary-foreground">Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de credito. El pago posterior depende de las condiciones de tu banco o emisor.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
              <FileText className="mb-5 h-8 w-8 text-primary" />
              <h2 className="mb-3 text-2xl font-black text-foreground">Si no conviene</h2>
              <p className="leading-relaxed text-secondary-foreground">Si la cotizacion no te acomoda, puedes detenerte. Cotizar es para revisar antes de decidir, no una obligacion de avanzar.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
              <Landmark className="mb-5 h-8 w-8 text-primary" />
              <h2 className="mb-3 text-2xl font-black text-foreground">Si no puede completarse</h2>
              <p className="leading-relaxed text-secondary-foreground">Si una operacion no puede completarse, se detiene el proceso y se revisa el caso antes de cualquier siguiente paso.</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="mb-5 text-2xl font-black text-foreground">Datos que pueden pedirse</h2>
              <ul className="grid gap-3 text-secondary-foreground">
                {allowedData.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{item}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7">
              <h2 className="mb-5 text-2xl font-black text-foreground">Datos que no pedimos</h2>
              <ul className="grid gap-3 text-secondary-foreground">
                {neverData.map((item) => <li key={item} className="flex gap-3"><LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-primary" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">A fondo</p>
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Lo que conviene entender antes de cotizar</h2>
            </div>
            <div className="grid gap-5">
              {deepDiveSections.map((item) => (
                <article key={item.heading} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-7">
                  <h3 className="mb-3 text-xl font-black text-foreground">{item.heading}</h3>
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-3 leading-relaxed text-secondary-foreground last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <HelpCircle className="mx-auto mb-4 h-9 w-9 text-primary" />
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Preguntas sobre el proceso</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-black text-foreground">{faq.question}</summary>
                  <p className="mt-4 leading-relaxed text-secondary-foreground">{faq.answer}</p>
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
