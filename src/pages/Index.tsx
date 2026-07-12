import { useEffect } from 'react';
import { CreditCard, FileSearch, LockKeyhole, ScrollText, Wallet } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import TrustSection from '@/components/TrustSection';
import HowItWorks from '@/components/HowItWorks';
import CompatibleBanks from '@/components/CompatibleBanks';
import FAQ from '@/components/FAQ';
import HomeGuides from '@/components/HomeGuides';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const deepDiveSections = [
  {
    icon: CreditCard,
    heading: 'Qué es el cupo internacional de tu tarjeta',
    paragraphs: [
      'Muchas tarjetas de crédito emitidas en Chile incluyen un cupo internacional aprobado por el banco o emisor, pensado originalmente para compras en el extranjero o en sitios que facturan en dólares. Una parte importante de las personas usa poco ese cupo porque no viaja seguido ni compra habitualmente en dólares, por lo que queda disponible sin utilizarse.',
      'EnPesos ayuda a evaluar una operación asistida para que ese cupo internacional disponible se traduzca en una cotización de pesos chilenos, siempre revisando primero el caso antes de avanzar.',
    ],
  },
  {
    icon: FileSearch,
    heading: 'Cómo se revisa cada cotización',
    paragraphs: [
      'Cada solicitud se evalúa de forma individual porque el monto final que podrías recibir depende de varias variables: el tipo de tarjeta, el banco o emisor, el cupo internacional disponible en el momento de cotizar, el dólar de referencia y los costos de procesamiento asociados.',
      'Por eso esta página no muestra un monto neto automático ni una tasa fija: la manera responsable de saber cuánto podrías recibir es solicitar una cotización real para tu caso y revisarla con calma antes de decidir si te conviene avanzar.',
    ],
  },
  {
    icon: LockKeyhole,
    heading: 'Qué información se pide y qué no se pide',
    paragraphs: [
      'Para orientar una cotización normalmente se solicitan datos básicos, como nombre, un medio de contacto, el banco o tipo de tarjeta y el monto aproximado que quieres evaluar.',
      'EnPesos no pide clave bancaria, clave de internet, token, coordenadas, códigos de verificación ni acceso remoto a tu celular o computador, y tampoco solicita el CVV por WhatsApp. Si alguien te pide esa información a nombre de EnPesos, no se la entregues y verifica que estás usando un canal oficial enlazado desde este sitio.',
    ],
  },
  {
    icon: Wallet,
    heading: 'Qué pasa después con tu tarjeta',
    paragraphs: [
      'Es importante entender que usar el cupo internacional no queda fuera de tu tarjeta: si confirmas una operación, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, y esas condiciones —fecha de facturación, tipo de cambio aplicado, intereses y pago mínimo— dependen del banco o emisor que la emitió, no de EnPesos.',
      'Tampoco es posible anticipar un tiempo exacto para cada caso, porque cada revisión toma un curso distinto. Pedir una cotización no te obliga a continuar: puedes preguntar, comparar y decidir con calma. La atención se realiza por WhatsApp, que funciona como canal para resolver dudas y coordinar la revisión de tu caso.',
    ],
  },
  {
    icon: ScrollText,
    heading: 'Antes de decidir, compara con calma',
    paragraphs: [
      'Antes de aceptar cualquier cotización, tiene sentido comparar el monto estimado con otras alternativas que puedas tener disponibles, revisar tu capacidad de pago y confirmar que entiendes cómo se reflejará el cargo en tu próximo estado de cuenta.',
      'No existe una respuesta única para todos los casos: el monto, el costo y las condiciones cambian según tu banco o emisor, tu tarjeta y el momento en que cotizas. Si en algún punto del proceso una operación no puede completarse, se detiene y se revisa el caso antes de cualquier paso siguiente.',
    ],
  },
];

const homeFaqs = [
  {
    question: '¿Es un préstamo?',
    answer: 'No. EnPesos no entrega préstamos ni crea una línea de crédito nueva. Te ayuda a cotizar cuántos pesos chilenos podrías recibir usando cupo internacional disponible de tu tarjeta.',
  },
  {
    question: '¿Piden mis claves bancarias?',
    answer: 'No. EnPesos no pide claves bancarias, token, coordenadas ni acceso remoto. Tampoco pedimos CVV por WhatsApp.',
  },
  {
    question: '¿Cotizar me obliga a avanzar?',
    answer: 'No. La cotización sirve para revisar monto estimado, costo y condiciones antes de decidir. Si no te conviene, no tienes obligación de continuar.',
  },
  {
    question: '¿Qué pasa con la deuda de la tarjeta?',
    answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.',
  },
  {
    question: '¿Cómo recibo los pesos?',
    answer: 'Si decides avanzar y la operación se confirma, recibes una transferencia en pesos chilenos en una cuenta bancaria del titular validado.',
  },
];

const Index = () => {
  useEffect(() => {
    document.title = 'Cupo en dólares a pesos chilenos | EnPesos.cl';

    const metaDescription = 'Cotiza tu cupo en dólares de la tarjeta, revisa cuántos pesos chilenos podrías recibir y decide con costo claro, proceso asistido y sin claves bancarias.';
    const canonicalUrl = 'https://www.enpesos.cl/';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = document.createElement(attributes.rel ? 'link' : 'meta') as HTMLMetaElement | HTMLLinkElement;
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Cupo en dólares a pesos chilenos | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.id = 'home-faq-schema';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: homeFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
    document.head.querySelector('#home-faq-schema')?.remove();
    document.head.appendChild(schema);

    return () => {
      document.head.querySelector('#home-faq-schema')?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section id="inicio" className="hero-gradient py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Hero />
            <LeadCaptureForm
              origen="home_calculadora_lead"
              title="¿Cuánto cupo quieres evaluar?"
              description="Cada caso es distinto según tu tarjeta, banco y condiciones. Completa estos datos y te contactamos con una cotización clara para que decidas con toda la información."
            />
          </div>
        </div>
      </section>

      <TrustSection />
      <HowItWorks />
      <CompatibleBanks />

      <section className="bg-secondary px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-primary">Antes de cotizar</p>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground sm:text-5xl">
              Todo lo que debes saber antes de cotizar tu cupo en dólares
            </h2>
          </div>
          <div className="grid gap-5">
            {deepDiveSections.map((item) => (
              <article key={item.heading} className="rounded-3xl border border-border bg-background p-6 shadow-sm sm:p-8">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary-light text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
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

      <FAQ />
      <HomeGuides />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
