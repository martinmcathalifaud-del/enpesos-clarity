import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuoteCalculator from '@/components/QuoteCalculator';
import TrustSection from '@/components/TrustSection';
import HowItWorks from '@/components/HowItWorks';
import CompatibleBanks from '@/components/CompatibleBanks';
import FAQ from '@/components/FAQ';
import HomeGuides from '@/components/HomeGuides';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const homeFaqs = [
  {
    question: '¿Es un préstamo?',
    answer: 'No. EnPesos no es un préstamo nuevo ni una línea de crédito. Es una operación asistida para evaluar el uso de un cupo internacional disponible, con cotización previa y aceptación del cliente antes de avanzar.',
  },
  {
    question: '¿Piden mis claves bancarias?',
    answer: 'No. Nunca pedimos claves bancarias. Tampoco pedimos CVV por WhatsApp. El proceso se coordina con acompañamiento y validaciones de seguridad.',
  },
  {
    question: '¿Cuándo conozco el costo?',
    answer: 'Antes de operar. Te enviamos una cotización clara con el monto estimado, costos y condiciones. Tú decides si avanzar o no después de revisar esa información.',
  },
  {
    question: '¿Qué tarjetas pueden cotizar?',
    answer: 'Principalmente tarjetas de crédito con cupo internacional disponible y uso internacional habilitado. La compatibilidad se confirma caso a caso durante la cotización.',
  },
  {
    question: '¿Cuánto tiempo toma la operación?',
    answer: 'Depende de las validaciones y del procesamiento de la operación. Como referencia, una vez validado el caso, el proceso puede tomar entre 24 y 48 horas hábiles.',
  },
  {
    question: '¿Cómo me llega el dinero?',
    answer: 'La transferencia se realiza a una cuenta bancaria chilena del titular validado. Por seguridad, no se realizan transferencias a cuentas de terceros.',
  },
];

const Index = () => {
  useEffect(() => {
    document.title = 'Cupo en Dólares a Pesos Chilenos | EnPesos.cl';

    const metaDescription = 'Cotiza tu cupo en dólares de tarjeta de crédito y recibe una estimación en pesos chilenos. Proceso asistido por WhatsApp, sin préstamos ni avances bancarios.';
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
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Cupo en Dólares a Pesos Chilenos | EnPesos.cl' });
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
            <QuoteCalculator />
          </div>
        </div>
      </section>

      <TrustSection />
      <HowItWorks />
      <CompatibleBanks />
      <FAQ />
      <HomeGuides />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
