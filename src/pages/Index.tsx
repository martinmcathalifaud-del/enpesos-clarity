import Header from '@/components/Header';
import Hero from '@/components/Hero';
import QuoteCalculator from '@/components/QuoteCalculator';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Calculator */}
      <section className="hero-gradient py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Hero />
            <QuoteCalculator />
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
