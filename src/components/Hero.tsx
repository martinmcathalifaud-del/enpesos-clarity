import { CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <div className="lg:pr-8">
      <div className="inline-block bg-accent-light text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-in">
        No es préstamo - 100% transparente
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
        Convierte tus dólares internacionales en
        <span className="text-primary"> pesos chilenos</span>
      </h1>
      
      <p className="text-lg sm:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        Paga en dólares con tu tarjeta de crédito mediante una compra internacional y recibe pesos chilenos en tu cuenta. Simple, transparente y con acompañamiento humano.
      </p>

      <div className="space-y-3 mb-8">
        {[
          'Transferencia en 24-48 hrs hábiles',
          'Solo al titular - mismo RUT'
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
    </div>
  );
}
