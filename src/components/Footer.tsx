import { CreditCard, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import logo from '@/assets/logo-enpesos-completo.png';

const navLinks = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos' },
  { label: 'Bancos y tarjetas', href: '/bancos-y-tarjetas-cupo-en-dolares' },
  { label: 'Seguridad', href: '/es-seguro-cambiar-cupo-en-dolares-a-pesos' },
  { label: 'Bancos', href: '/#bancos' },
  { label: 'Preguntas frecuentes', href: '/#preguntas-frecuentes' },
  { label: 'Qué es EnPesos', href: '/que-es-enpesos' },
  { label: 'Guías EnPesos', href: '/guias' },
  { label: 'Liquidez para negocios', href: '/liquidez-para-negocios-cupo-internacional' },
];

const bankCardLinks = [
  { label: 'Cupo en dólares BancoEstado', href: '/cupo-en-dolares-banco-estado' },
  { label: 'Cupo en dólares Santander', href: '/cupo-en-dolares-santander' },
  { label: 'Cupo en dólares Banco de Chile', href: '/cupo-en-dolares-banco-de-chile' },
  { label: 'Cupo en dólares BCI', href: '/cupo-en-dolares-bci' },
  { label: 'Cupo en dólares Scotiabank', href: '/cupo-en-dolares-scotiabank' },
  { label: 'Cupo en dólares Itaú', href: '/cupo-en-dolares-itau' },
  { label: 'Cupo en dólares CMR Falabella', href: '/cupo-en-dolares-cmr-falabella' },
  { label: 'Cupo en dólares Visa', href: '/cupo-en-dolares-tarjeta-visa' },
  { label: 'Cupo en dólares Mastercard', href: '/cupo-en-dolares-tarjeta-mastercard' },
];

const cityLinks = [
  { label: 'Cupo en dólares Santiago', href: '/cupo-en-dolares-santiago' },
  { label: 'Cupo en dólares Las Condes', href: '/cupo-en-dolares-las-condes' },
  { label: 'Cupo en dólares Providencia', href: '/cupo-en-dolares-providencia' },
  { label: 'Cupo en dólares Concepción', href: '/cupo-en-dolares-concepcion' },
  { label: 'Cupo en dólares Antofagasta', href: '/cupo-en-dolares-antofagasta' },
];

export default function Footer() {
  return (
    <footer className="bg-background">
      <section className="py-12 sm:py-16 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary-light via-background to-primary-light p-8 sm:p-10 text-center card-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 opacity-30 bg-[radial-gradient(circle_at_70%_35%,hsl(var(--primary)_/_0.22),transparent_22%),radial-gradient(circle_at_78%_62%,hsl(var(--primary)_/_0.18),transparent_20%)]" />
            <div className="relative mx-auto max-w-3xl">
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                ¿Tienes cupo internacional disponible y quieres evaluar una cotización?
              </h2>
              <Button
                className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                onClick={() => openWhatsApp('footer_cta')}
              >
                <MessageCircle className="w-5 h-5" />
                Hablar por WhatsApp
              </Button>
              <div className="mt-4">
                <a href="/es-seguro-cambiar-cupo-en-dolares-a-pesos" className="text-sm font-semibold text-primary hover:underline underline-offset-4">
                  Revisar guía de seguridad →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center">
            <div>
              <img src={logo} alt="EnPesos.cl" className="h-12 w-auto object-contain object-left mb-2" />
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-secondary-foreground">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="lg:justify-self-end inline-flex items-center gap-2 text-sm text-secondary-foreground">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <span>Proceso transparente y confidencial</span>
            </div>
          </div>

          <nav className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs font-semibold text-muted-foreground">
            {bankCardLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <nav className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs font-semibold text-muted-foreground">
            {cityLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <a href="/referidos" className="font-semibold text-primary hover:underline underline-offset-4">
              ¿Eres asesor o referidor? Conoce el programa de referidos →
            </a>
            <div className="mt-5 space-y-1 text-xs">
              <p>EnPesos no ofrece préstamos, adelantos de efectivo ni financiamiento.</p>
              <p>EnPesos no es banco ni entidad financiera regulada.</p>
              <p>© 2026 EnPesos.cl. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
