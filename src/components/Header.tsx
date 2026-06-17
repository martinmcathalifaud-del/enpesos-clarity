import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import logo from '@/assets/logo-enpesos-header.png';

const navLinks = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Seguridad', href: '#seguridad' },
  { label: 'Bancos', href: '#bancos' },
  { label: 'Preguntas frecuentes', href: '#preguntas-frecuentes' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] sm:h-[84px] flex justify-between items-center gap-4">
        <a href="#inicio" className="flex items-center shrink-0 py-1" aria-label="EnPesos.cl - Más pesos en tu cuenta">
          <img
            src={logo}
            alt="EnPesos.cl - Más pesos en tu cuenta"
            width={200}
            height={56}
            className="w-[148px] h-[42px] sm:w-[184px] sm:h-[56px] object-contain object-left block"
            loading="eager"
            decoding="async"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-secondary-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            className="hidden sm:inline-flex h-11 rounded-xl px-5 font-bold button-shadow"
            onClick={() => openWhatsApp('header_desktop')}
          >
            Cotizar por WhatsApp
          </Button>

          <button
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-foreground py-1"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="sm:hidden mt-2 rounded-xl font-bold"
              onClick={() => {
                setOpen(false);
                openWhatsApp('header_mobile');
              }}
            >
              Cotizar por WhatsApp
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
