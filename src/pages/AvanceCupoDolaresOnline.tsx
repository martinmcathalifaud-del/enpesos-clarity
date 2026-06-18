import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function AvanceCupoDolaresOnline() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Avance cupo en dólares online
          </h1>
          <p className="text-lg text-secondary-foreground leading-relaxed">
            Guía EnPesos sobre cupo internacional y cotización online.
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
