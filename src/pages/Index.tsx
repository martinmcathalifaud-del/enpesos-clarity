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
