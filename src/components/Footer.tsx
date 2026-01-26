import { DollarSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-muted py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-background">EnPesos</span>
          </div>
          
          <p className="text-muted-foreground mb-4">
            © 2026 EnPesos. Todos los derechos reservados.
          </p>
          
          <div className="max-w-2xl space-y-2">
            <p className="text-sm text-muted-foreground">
              EnPesos no ofrece préstamos, adelantos de efectivo ni financiamiento.
            </p>
            <p className="text-sm text-muted-foreground">
              Las cuotas, si están disponibles, dependen exclusivamente del banco emisor de la tarjeta.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
