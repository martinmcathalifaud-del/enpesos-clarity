import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20cotizar%20por%20WhatsApp.";

export default function Hero() {
  const scrollToCalc = () => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });


  return (
    <div className="lg:pr-8">
      <div className="inline-block bg-accent-light text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
        No es préstamo · cotización antes de operar
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
        Convierte tu cupo internacional en
        <span className="text-primary"> pesos chilenos</span>
      </h1>

      <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        Usa el cupo en dólares de tu tarjeta mediante una operación internacional asistida. Cotiza, valida y recibe pesos chilenos en tu cuenta.
      </p>

      <div className="space-y-3 mb-8">
        {[
          'No pedimos claves ni CVV',
          'Transferencia tras validación del pago',
          'Solo al titular - mismo RUT',
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
        <Button variant="outline" onClick={scrollToCalc}>
          Ver cómo funciona
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        No pedimos claves bancarias ni CVV por WhatsApp.
      </p>
    </div>
  );
}
