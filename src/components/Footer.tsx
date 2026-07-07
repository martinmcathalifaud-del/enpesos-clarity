import { CheckCircle2, CreditCard, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';
import logo from '@/assets/logo-enpesos-completo.png';

type FooterLink = {
  label: string;
  href: string;
};

const primaryLinks: FooterLink[] = [
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos' },
  { label: 'Cómo funciona', href: '/como-funciona' },
  { label: 'Seguridad', href: '/seguridad' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Bancos y tarjetas', href: '/bancos-y-tarjetas-cupo-en-dolares' },
  { label: 'Liquidez para negocios', href: '/liquidez-para-negocios-cupo-internacional' },
];

const coverageLinks: FooterLink[] = [
  { label: 'Cupo en dólares Santiago', href: '/cupo-en-dolares-santiago' },
  { label: 'Cupo en dólares Las Condes', href: '/cupo-en-dolares-las-condes' },
  { label: 'Cupo en dólares Providencia', href: '/cupo-en-dolares-providencia' },
  { label: 'Cupo en dólares Concepción', href: '/cupo-en-dolares-concepcion' },
  { label: 'Cupo en dólares Antofagasta', href: '/cupo-en-dolares-antofagasta' },
  { label: 'Cupo en dólares Valparaíso', href: '/cupo-en-dolares-valparaiso' },
  { label: 'Cupo en dólares Rancagua', href: '/cupo-en-dolares-rancagua' },
];

const resourceLinks: FooterLink[] = [
  { label: 'Guías EnPesos', href: '/guias' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Qué es EnPesos', href: '/que-es-enpesos' },
  { label: 'Simulador de pago de tarjeta', href: '/simulador-pago-tarjeta-credito' },
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
  'Cotización previa antes de decidir',
  'No pedimos claves ni contraseñas',
  'Costo y condiciones claras antes de avanzar',
];

function FooterLinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-foreground mb-3">{title}</h3>
      <nav className="grid gap-2.5 text-sm font-semibold leading-5 text-secondary-foreground">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_2.35fr] lg:gap-10 xl:gap-12">
          <section className="rounded-3xl border border-border bg-background p-6 sm:p-7 card-shadow lg:self-start">
            <img src={logo} alt="EnPesos.cl" className="h-12 w-auto object-contain object-left mb-4" />
            <p className="text-2xl font-extrabold text-foreground tracking-tight">Más pesos en tu cuenta</p>
            <p className="mt-3 text-sm text-secondary-foreground leading-relaxed">
              Cotiza cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta, con costo claro antes de decidir.
            </p>

            <Button
              className="mt-5 w-full sm:w-auto h-12 rounded-xl px-6 font-bold button-shadow"
              onClick={() => openWhatsApp('footer_cta')}
            >
              Solicitar cotización
              <MessageCircle className="w-5 h-5" />
            </Button>

            <div className="mt-5 grid gap-2.5">
              {trustItems.map((item) => (
                <div key={item} className="flex gap-3 text-sm font-semibold text-secondary-foreground">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a href="mailto:contacto@enpesos.cl" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
              <Mail className="w-4 h-4" />
              contacto@enpesos.cl
            </a>
          </section>

          <div className="hidden md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-8 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10 lg:pt-2">
            <FooterLinkGroup title="Principales" links={primaryLinks} />
            <FooterLinkGroup title="Cobertura" links={coverageLinks} />
            <FooterLinkGroup title="Recursos" links={resourceLinks} />
            <FooterLinkGroup title="Bancos y tarjetas" links={bankCardLinks} />
          </div>

          <div className="grid gap-3 md:hidden">
            <FooterAccordion title="Principales" links={primaryLinks} />
            <FooterAccordion title="Cobertura" links={coverageLinks} />
            <FooterAccordion title="Recursos" links={resourceLinks} />
            <FooterAccordion title="Bancos y tarjetas" links={bankCardLinks} />
          </div>
        </div>

        <section className="mt-6 border-t border-border pt-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-foreground">Programa de colaboradores</h3>
                <p className="mt-0.5 text-xs text-secondary-foreground">Para creadoras, asesoras o referidores que quieren conocer el programa.</p>
              </div>
            </div>
            <a
              href="/programa-de-colaboradores"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary px-4 py-2 text-xs font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
            >
              Conocer programa
            </a>
          </div>
        </section>

        <div className="mt-5 border-t border-border pt-4">
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
