import { CheckCircle, MessageCircle, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const bullets = [
  'Cotización previa antes de decidir',
  'Pesos chilenos en tu cuenta si avanzas y la operación se confirma',
  'Sin claves bancarias ni CVV por WhatsApp',
];

export default function Hero() {
  return (
    <div className="lg:pr-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.06] tracking-tight animate-fade-in">
        Convierte el cupo en dólares de tu tarjeta en{' '}
        <span className="text-primary">pesos chilenos</span>
      </h1>

      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-9 leading-relaxed animate-fade-in max-w-2xl" style={{ animationDelay: '0.1s' }}>
        Primero cotizas cuánto podrías recibir en pesos chilenos. Si decides avanzar, se realiza una operación asistida con tu tarjeta y recibes una transferencia en tu cuenta.
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
          Solicitar cotización
        </Button>
        <Button variant="outline" className="h-12 rounded-xl px-6 text-base font-bold border-primary/30 text-primary hover:bg-primary-light" asChild>
          <a href="/como-funciona">
            <ClipboardList className="w-5 h-5" />
            Ver cómo funciona
          </a>
        </Button>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground">
        Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.
      </p>
    </div>
  );
}
