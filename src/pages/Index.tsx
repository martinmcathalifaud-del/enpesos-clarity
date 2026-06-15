import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuoteCalculator from '@/components/QuoteCalculator';
import TrustSection from '@/components/TrustSection';
import HowItWorks from '@/components/HowItWorks';
import CompatibleBanks from '@/components/CompatibleBanks';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
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
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
