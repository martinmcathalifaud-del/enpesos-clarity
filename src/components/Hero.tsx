import { CheckCircle, MessageCircle, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const bullets = [
  'Usas cupo que ya tienes aprobado por tu banco',
  'Cotización clara antes de decidir',
  'Evaluamos cada caso, no es un proceso automático',
  'Acompañamiento humano durante todo el proceso',
];

export default function Hero() {
  return (
    <div className="lg:pr-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-[1.06] tracking-tight animate-fade-in">
        Usa tu cupo internacional disponible para recibir{' '}
        <span className="text-primary">pesos chilenos</span>
      </h1>

      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-9 leading-relaxed animate-fade-in max-w-2xl" style={{ animationDelay: '0.1s' }}>
        Muchas personas tienen cupo internacional aprobado por su banco que usan poco, porque normalmente sirve para compras en dólares o pagos fuera de Chile. EnPesos te ayuda a evaluar una operación para recibir pesos chilenos en tu cuenta, con cotización previa y acompañamiento humano.
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
          Evaluar mi cupo
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
