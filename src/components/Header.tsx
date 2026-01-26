import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20solicitar%20una%20cotizaci%C3%B3n.";

export default function Header() {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">EnPesos</span>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="hidden sm:flex"
            onClick={() => window.open(WHATSAPP_URL, '_blank')}
          >
            Contactar
          </Button>
          <Button onClick={scrollToCalculator}>
            Cotizar ahora
          </Button>
        </div>
      </div>
    </header>
  );
}
