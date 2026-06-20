import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import logo from '@/assets/logo-enpesos-header.png';

const navLinks = [
  { label: 'Cupo en dólares', href: '/cupo-en-dolares-a-pesos-chilenos' },
  { label: 'Seguridad', href: '/es-seguro-cambiar-cupo-en-dolares-a-pesos' },
  { label: 'Bancos y tarjetas', href: '/bancos-y-tarjetas-cupo-en-dolares' },
  { label: 'Negocios', href: '/liquidez-para-negocios-cupo-internacional' },
  { label: 'Preguntas frecuentes', href: '/#preguntas-frecuentes' },
  { label: 'Guías EnPesos', href: '/guias' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[84px] sm:h-[104px] flex justify-between items-center gap-4">
        <a href="/" className="flex items-center shrink-0 py-1" aria-label="Ir al inicio de EnPesos.cl">
          <img
            src={logo}
            alt="EnPesos.cl"
            width={340}
            height={96}
            className="w-[224px] h-[62px] sm:w-[286px] sm:h-[80px] xl:w-[324px] xl:h-[90px] object-contain object-left block"
            loading="eager"
            decoding="async"
          />
        </a>

        <nav className="hidden xl:flex items-center gap-4 2xl:gap-6">
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
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-foreground shadow-sm"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border bg-secondary/95 px-4 py-4 shadow-lg">
          <div className="max-w-7xl mx-auto rounded-3xl border border-border bg-background p-4 card-shadow">
            <div className="mb-4 border-b border-border pb-3">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Menú EnPesos</p>
              <p className="mt-1 text-sm text-secondary-foreground">Cotiza y aprende antes de decidir.</p>
            </div>
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-bold text-foreground hover:bg-secondary hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button
              className="mt-4 w-full h-12 rounded-xl font-bold"
              onClick={() => {
                setOpen(false);
                openWhatsApp('header_mobile');
              }}
            >
              Cotizar por WhatsApp
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
