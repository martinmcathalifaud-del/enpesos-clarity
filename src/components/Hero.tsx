import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20cotizar%20por%20WhatsApp.";

export default function Hero() {
  const scrollToCalc = () => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });


  return (
    <div className="lg:pr-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight animate-fade-in">
        Convierte tu cupo internacional en
        <span className="text-primary"> pesos chilenos</span>
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
        Usa el cupo en dólares de tu tarjeta para recibir pesos chilenos en tu cuenta, mediante una operación internacional asistida, simple y con acompañamiento humano.
      </p>

      <div className="space-y-4 mb-10">
        {[
          'Transforma tu cupo USD en pesos chilenos',
          'Sin solicitar un préstamo bancario',
          'Proceso asistido de principio a fin',
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 animate-slide-in"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-secondary-foreground">{item}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <Button
          className="button-shadow"
          onClick={() => window.open(WHATSAPP_URL, '_blank')}
        >
          Cotizar por WhatsApp
        </Button>
        <Button variant="outline" asChild>
          <a href="#como-funciona">Ver cómo funciona</a>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        No pedimos claves bancarias ni CVV por WhatsApp.
      </p>
    </div>
  );
}
