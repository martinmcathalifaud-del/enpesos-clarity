import { useEffect } from 'react';
import { ArrowRight, HelpCircle, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const CANONICAL_URL = 'https://www.enpesos.cl/preguntas-frecuentes';
const metaDescription = 'Resuelve dudas sobre EnPesos: cotizacion, costos, seguridad, datos que no pedimos, deuda posterior en la tarjeta y diferencias con prestamos o avances.';

const faqSections = [
  {
    title: 'Que es y que no es EnPesos',
    faqs: [
      ['¿Que hace EnPesos?', 'EnPesos te ayuda a cotizar cuantos pesos chilenos podrias recibir usando cupo internacional disponible o cupo en dolares de tu tarjeta.'],
      ['¿EnPesos es un prestamo?', 'No. EnPesos no entrega prestamos ni crea una linea de credito nueva. Primero ves una cotizacion y decides si avanzar.'],
      ['¿EnPesos es un credito?', 'No. EnPesos no aprueba creditos, no aumenta lineas y no entrega financiamiento propio.'],
      ['¿Es lo mismo que un avance bancario?', 'No debe entenderse como un avance bancario tradicional. Es una cotizacion asistida usando cupo internacional disponible.'],
      ['¿EnPesos es una casa de cambio?', 'No. EnPesos no es una casa de cambio ni compra o vende divisas como entidad cambiaria.'],
    ],
  },
  {
    title: 'Costos y cotizacion',
    faqs: [
      ['¿Cotizar me obliga a avanzar?', 'No. Cotizar sirve para revisar cuanto podrias recibir, el costo y las condiciones antes de decidir.'],
      ['¿Como se calcula cuantos pesos podria recibir?', 'Depende del monto, cupo disponible, banco, tarjeta, costos, dolar de referencia y condiciones del caso.'],
      ['¿Cuando conozco el costo?', 'Antes de avanzar. La idea es que revises el costo y las condiciones con una cotizacion previa.'],
      ['¿El monto final puede cambiar?', 'Puede depender de las condiciones del caso y del momento en que se confirme la operacion. Debe quedar claro antes de avanzar.'],
      ['¿Por que depende del banco o tarjeta?', 'Porque cada banco, emisor o tarjeta puede tener condiciones distintas para cargos, facturacion y cupo internacional.'],
    ],
  },
  {
    title: 'Seguridad y datos',
    faqs: [
      ['¿Piden claves bancarias?', 'No. EnPesos no pide claves bancarias, token, coordenadas ni acceso remoto.'],
      ['¿Piden CVV por WhatsApp?', 'No pedimos CVV por WhatsApp. Si alguien te pide ese dato por ese canal, no avances.'],
      ['¿Que datos me pueden pedir?', 'Datos basicos para cotizar y validar titularidad, como nombre, monto a cotizar, banco o tipo de tarjeta a nivel general y cuenta del titular si corresponde avanzar.'],
      ['¿Que datos nunca deberia entregar?', 'No entregues claves, token, coordenadas, CVV por WhatsApp, acceso remoto ni fotos completas de tu tarjeta por ambos lados.'],
      ['¿Como puedo reconocer un proceso mas seguro?', 'Debe haber cotizacion previa, costo claro, titularidad validada, condiciones explicadas y ningun pedido de claves bancarias.'],
    ],
  },
  {
    title: 'Tarjeta, banco y deuda',
    faqs: [
      ['¿Que pasa con mi tarjeta despues?', 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de credito, segun las condiciones de tu banco o emisor.'],
      ['¿Queda un cargo o deuda en la tarjeta?', 'Si decides avanzar y la operacion se confirma, puede quedar un cargo o deuda asociado al cupo internacional usado.'],
      ['¿Quien define el tipo de cambio o facturacion posterior?', 'Las condiciones posteriores de facturacion, tipo de cambio, intereses o comisiones dependen del banco o emisor.'],
      ['¿Funciona con cualquier banco o tarjeta?', 'No se promete compatibilidad universal. Se revisa caso a caso segun banco, emisor, tarjeta y cupo disponible.'],
      ['¿EnPesos representa a bancos, Visa, Mastercard o CMR?', 'No. EnPesos no representa ni esta asociado oficialmente a bancos, emisores, Visa, Mastercard ni CMR.'],
    ],
  },
  {
    title: 'Operacion y tiempos',
    faqs: [
      ['¿Cuanto demora el proceso?', 'Te indicamos los tiempos estimados antes de avanzar. No prometemos tiempos exactos sin revisar el caso.'],
      ['¿Como recibo los pesos chilenos?', 'Si la operacion se confirma, recibes una transferencia en pesos chilenos en una cuenta bancaria del titular validado.'],
      ['¿La transferencia puede ser a una cuenta de otra persona?', 'Por seguridad, el proceso debe considerar titularidad validada. No se debe operar con cuentas de terceros sin validacion.'],
      ['¿Que pasa si la operacion no se confirma?', 'Si una operacion no puede completarse, se detiene el proceso y se revisa el caso antes de cualquier siguiente paso.'],
    ],
  },
  {
    title: 'Cuando puede no convenir o no funcionar',
    faqs: [
      ['¿Que pasa si no me conviene la cotizacion?', 'No avanzas. Cotizar no te obliga a continuar.'],
      ['¿En que casos puede no funcionar?', 'Puede no funcionar si no hay cupo internacional disponible, si la tarjeta no es compatible o si las condiciones del caso no permiten avanzar.'],
      ['¿Que pasa si no tengo cupo internacional disponible?', 'No habria cupo que cotizar. Puedes revisar con tu banco o emisor, pero EnPesos no aumenta lineas de credito.'],
      ['¿Puedo usar una tarjeta que no es mia?', 'No. El proceso debe ser del titular de la tarjeta y de la cuenta bancaria validada.'],
    ],
  },
];

const allFaqs = faqSections.flatMap((section) => section.faqs.map(([question, answer]) => ({ question, answer })));

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

export default function PreguntasFrecuentes() {
  useEffect(() => {
    document.title = 'Preguntas frecuentes EnPesos | Cupo en dolares a pesos';
    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Preguntas frecuentes EnPesos' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: CANONICAL_URL });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: CANONICAL_URL });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', '@id': `${CANONICAL_URL}#webpage`, url: CANONICAL_URL, name: 'Preguntas frecuentes EnPesos', description: metaDescription, isPartOf: { '@type': 'WebSite', name: 'EnPesos.cl', url: 'https://www.enpesos.cl' } },
        { '@type': 'FAQPage', mainEntity: allFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      ],
    };

    const scriptId = 'preguntas-frecuentes-schema';
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
          <div className="mx-auto max-w-5xl text-center">
            <HelpCircle className="mx-auto mb-5 h-11 w-11 text-primary" />
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Preguntas frecuentes sobre EnPesos
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
              Resuelve dudas sobre cotizacion, costos, seguridad, datos que no pedimos, transferencia en pesos y cargo o deuda posterior en tu tarjeta.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('faq_hero')}>
                Solicitar cotizacion
                <ArrowRight className="h-5 w-5" />
              </Button>
              <a href="/como-funciona" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">Ver como funciona</a>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <aside className="rounded-3xl border border-border bg-secondary p-6 lg:self-start lg:sticky lg:top-28">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Categorias</p>
                <nav className="grid gap-2 text-sm font-bold text-foreground">
                  {faqSections.map((section) => <a key={section.title} href={`#${section.title.toLowerCase().replaceAll(' ', '-')}`} className="rounded-xl px-3 py-2 hover:bg-background hover:text-primary">{section.title}</a>)}
                </nav>
              </aside>
              <div className="grid gap-8">
                {faqSections.map((section) => (
                  <section key={section.title} id={section.title.toLowerCase().replaceAll(' ', '-')}>
                    <h2 className="mb-4 text-2xl font-black text-foreground sm:text-3xl">{section.title}</h2>
                    <div className="grid gap-3">
                      {section.faqs.map(([question, answer]) => (
                        <details key={question} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                          <summary className="cursor-pointer list-none text-base font-black text-foreground">{question}</summary>
                          <p className="mt-4 leading-relaxed text-secondary-foreground">{answer}</p>
                        </details>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-background p-8 text-center shadow-sm">
            <ShieldCheck className="mx-auto mb-4 h-9 w-9 text-primary" />
            <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground">La regla base es simple.</h2>
            <p className="mx-auto mb-7 max-w-3xl leading-relaxed text-secondary-foreground">Antes de avanzar debes ver cuanto podrias recibir en pesos, el costo y las condiciones. EnPesos no pide claves bancarias ni CVV por WhatsApp.</p>
            <a href="/seguridad" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-secondary px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">Ver seguridad</a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
