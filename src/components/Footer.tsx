import { Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20cotizar%20por%20WhatsApp.";

const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Seguridad', href: '#seguridad' },
  { label: 'Bancos compatibles', href: '#bancos' },
  { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
];

const legalLinks = [
  { label: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
  { label: 'Política de Privacidad', href: '/politica-de-privacidad' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-extrabold tracking-tight mb-4">
              <span className="text-primary">EnPesos</span>
              <span className="text-background">.cl</span>
            </div>
            <p className="text-background font-semibold mb-2">Más pesos en tu cuenta.</p>
            <p className="text-sm text-background/70 leading-relaxed">
              Operaciones internacionales asistidas con respaldo y atención humana.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-background font-semibold mb-4 text-sm uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-background/70 hover:text-background transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-background font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-background/70 hover:text-background transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-background font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3 text-sm mb-5">
              <li>
                <a href="mailto:contacto@enpesos.cl" className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                  <Mail className="w-4 h-4" />
                  contacto@enpesos.cl
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </li>
            </ul>
            <Button
              size="sm"
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
            >
              Cotizar por WhatsApp
            </Button>
          </div>
        </div>

        <div className="border-t border-background/15 pt-8 space-y-2 text-xs text-background/60 leading-relaxed">
          <p>EnPesos no ofrece préstamos, adelantos de efectivo ni financiamiento.</p>
          <p>EnPesos no es banco ni entidad financiera regulada.</p>
          <p>Las cuotas, si están disponibles, dependen exclusivamente del banco emisor de la tarjeta.</p>
          <p className="pt-4 text-background/50">© 2026 EnPesos.cl. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
