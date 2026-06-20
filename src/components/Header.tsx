import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import logo from '@/assets/logo-enpesos-header.png';

const primaryLinks = [
  { label: 'Cupo en dólares', href: '/cupo-en-dolares-a-pesos-chilenos' },
  { label: 'Bancos y tarjetas', href: '/bancos-y-tarjetas-cupo-en-dolares' },
  { label: 'Seguridad', href: '/es-seguro-cambiar-cupo-en-dolares-a-pesos' },
  { label: 'Negocios', href: '/liquidez-para-negocios-cupo-internacional' },
];

const resourceLinks = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Preguntas frecuentes', href: '/#preguntas-frecuentes' },
  { label: 'Guías EnPesos', href: '/guias' },
  { label: 'Qué es EnPesos', href: '/que-es-enpesos' },
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

        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7" aria-label="Navegación principal">
          {primaryLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-semibold text-secondary-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-secondary-foreground hover:text-primary focus:text-primary transition-colors"
              aria-haspopup="true"
            >
              Recursos
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>

            <div className="pointer-events-none absolute right-0 top-full z-50 mt-3 w-64 opacity-0 translate-y-1 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
              <div className="rounded-2xl border border-border bg-background p-2 shadow-xl">
                {resourceLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
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

            <div className="space-y-5">
              <div>
                <p className="mb-2 px-2 text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Principal</p>
                <nav className="grid gap-2" aria-label="Navegación principal móvil">
                  {primaryLinks.map((link) => (
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
              </div>

              <div>
                <p className="mb-2 px-2 text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">Recursos</p>
                <nav className="grid gap-2" aria-label="Recursos móviles">
                  {resourceLinks.map((link) => (
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
              </div>
            </div>

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
