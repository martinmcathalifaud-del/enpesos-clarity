import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo-enpesos-header.png';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20cotizar%20por%20WhatsApp.";

const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Seguridad', href: '#seguridad' },
  { label: 'Bancos', href: '#bancos' },
  { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center gap-4">
        <a href="#" className="flex items-center shrink-0" aria-label="EnPesos.cl">
          <img
            src={logo}
            alt="EnPesos.cl"
            width={180}
            height={52}
            className="w-[135px] h-10 sm:w-[170px] sm:h-12 object-contain object-left"
            loading="eager"
            decoding="async"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-secondary-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            className="hidden sm:inline-flex"
            onClick={() => window.open(WHATSAPP_URL, '_blank')}
          >
            Cotizar por WhatsApp
          </Button>
          <button
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-foreground py-1"
              >
                {l.label}
              </a>
            ))}
            <Button
              className="sm:hidden mt-2"
              onClick={() => { setOpen(false); window.open(WHATSAPP_URL, '_blank'); }}
            >
              Cotizar por WhatsApp
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
