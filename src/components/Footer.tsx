import { CheckCircle2, CreditCard, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import logo from '@/assets/logo-enpesos-completo.png';

type FooterLink = {
  label: string;
  href: string;
};

const primaryLinks: FooterLink[] = [
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos' },
  { label: 'Seguridad', href: '/es-seguro-cambiar-cupo-en-dolares-a-pesos' },
  { label: 'Bancos y tarjetas', href: '/bancos-y-tarjetas-cupo-en-dolares' },
  { label: 'Liquidez para negocios', href: '/liquidez-para-negocios-cupo-internacional' },
];

const coverageLinks: FooterLink[] = [
  { label: 'Cupo en dólares Santiago', href: '/cupo-en-dolares-santiago' },
  { label: 'Cupo en dólares Las Condes', href: '/cupo-en-dolares-las-condes' },
  { label: 'Cupo en dólares Providencia', href: '/cupo-en-dolares-providencia' },
  { label: 'Cupo en dólares Concepción', href: '/cupo-en-dolares-concepcion' },
  { label: 'Cupo en dólares Antofagasta', href: '/cupo-en-dolares-antofagasta' },
];

const resourceLinks: FooterLink[] = [
  { label: 'Guías EnPesos', href: '/guias' },
  { label: 'Preguntas frecuentes', href: '/#preguntas-frecuentes' },
  { label: 'Qué es EnPesos', href: '/que-es-enpesos' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Bancos compatibles', href: '/#bancos' },
];

const bankCardLinks: FooterLink[] = [
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

const trustItems = [
  'Proceso transparente y confidencial',
  'No pedimos claves ni contraseñas',
  'Cotización previa antes de decidir',
];

function FooterLinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-foreground mb-4">{title}</h3>
      <nav className="grid gap-3 text-sm font-semibold text-secondary-foreground">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function FooterAccordion({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <details className="group rounded-2xl border border-border bg-background p-4 open:card-shadow">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm font-extrabold uppercase tracking-[0.14em] text-foreground">
        {title}
        <span className="text-primary text-lg leading-none group-open:rotate-90 transition-transform">›</span>
      </summary>
      <nav className="mt-4 grid gap-3 border-t border-border pt-4 text-sm font-semibold text-secondary-foreground">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
    </details>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr_0.85fr] lg:gap-10">
          <section className="rounded-3xl border border-border bg-background p-6 sm:p-7 card-shadow">
            <img src={logo} alt="EnPesos.cl" className="h-12 w-auto object-contain object-left mb-4" />
            <p className="text-2xl font-extrabold text-foreground tracking-tight">Más pesos en tu cuenta</p>
            <p className="mt-3 text-sm text-secondary-foreground leading-relaxed">
              Cotiza tu cupo internacional disponible con atención humana por WhatsApp.
            </p>

            <Button
              className="mt-5 w-full sm:w-auto h-12 rounded-xl px-6 font-bold button-shadow"
              onClick={() => openWhatsApp('footer_cta')}
            >
              Cotizar por WhatsApp
              <MessageCircle className="w-5 h-5" />
            </Button>

            <div className="mt-6 grid gap-3">
              {trustItems.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold text-secondary-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="hidden md:block rounded-3xl border border-border bg-background p-6">
            <FooterLinkGroup title="Principales" links={primaryLinks} />
          </div>
          <div className="hidden md:block rounded-3xl border border-border bg-background p-6">
            <FooterLinkGroup title="Cobertura" links={coverageLinks} />
          </div>
          <div className="hidden md:block rounded-3xl border border-border bg-background p-6">
            <FooterLinkGroup title="Recursos" links={resourceLinks} />
          </div>

          <div className="grid gap-3 md:hidden">
            <FooterAccordion title="Principales" links={primaryLinks} />
            <FooterAccordion title="Cobertura" links={coverageLinks} />
            <FooterAccordion title="Recursos" links={resourceLinks} />
            <FooterAccordion title="Bancos y tarjetas" links={bankCardLinks} />
          </div>
        </div>

        <section className="mt-6 hidden md:block rounded-3xl border border-border bg-background p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-foreground mb-2">Bancos y tarjetas</h3>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Enlaces por banco, emisor o marca de tarjeta para revisar cupo internacional disponible.
              </p>
            </div>
            <nav className="grid gap-x-5 gap-y-3 text-sm font-semibold text-secondary-foreground sm:grid-cols-2 lg:grid-cols-3">
              {bankCardLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-primary/20 bg-background p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-foreground">Programa de referidos</h3>
                <p className="mt-1 text-sm text-secondary-foreground">Para asesores o referidores que quieren conocer el programa.</p>
              </div>
            </div>
            <a
              href="/referidos"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              Conocer referidos
            </a>
          </div>
        </section>

        <div className="mt-6 border-t border-border pt-5">
          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p>EnPesos no ofrece préstamos, adelantos de efectivo ni financiamiento.</p>
            </div>
            <p>EnPesos no es banco ni entidad financiera regulada.</p>
            <p>© 2026 EnPesos.cl. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
