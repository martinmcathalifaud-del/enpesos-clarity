import { CheckCircle, MessageCircle, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const bullets = [
  'No es un préstamo nuevo',
  'No pedimos claves bancarias ni CVV',
  'Cotización clara antes de operar',
];

export default function Hero() {
  return (
    <div className="lg:pr-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.06] tracking-tight animate-fade-in">
        Recibe pesos usando el cupo internacional{' '}
        <span className="text-primary">disponible</span> de tu tarjeta
      </h1>

      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-9 leading-relaxed animate-fade-in max-w-2xl" style={{ animationDelay: '0.1s' }}>
        Cotiza una operación asistida por WhatsApp. Te mostramos el monto, el costo y las condiciones antes de que decidas operar.
      </p>

      <div className="space-y-4 mb-9">
        {bullets.map((item, index) => (
          <div
            key={item}
            className="flex items-start gap-3 animate-slide-in"
            style={{ animationDelay: `${0.25 + index * 0.1}s` }}
          >
            <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-secondary-foreground font-medium">{item}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <Button
          className="h-12 rounded-xl px-6 text-base font-bold button-shadow"
          onClick={() => openWhatsApp('hero_primary')}
        >
          <MessageCircle className="w-5 h-5" />
          Cotizar por WhatsApp
        </Button>
        <Button variant="outline" className="h-12 rounded-xl px-6 text-base font-bold border-primary/30 text-primary hover:bg-primary-light" asChild>
          <a href="#como-funciona">
            <ClipboardList className="w-5 h-5" />
            Ver cómo funciona
          </a>
        </Button>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground">
        No pedimos claves bancarias ni CVV por WhatsApp.
      </p>
    </div>
  );
}
