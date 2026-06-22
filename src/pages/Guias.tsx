import { useEffect } from 'react';
import { ArrowRight, Building2, Calculator, CreditCard, Landmark, MessageCircle, ShieldCheck, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const guides = [
  {
    category: 'Funcionamiento',
    title: 'Cupo en dólares a pesos chilenos',
    description: 'Qué significa cotizar tu cupo internacional y cómo funciona una conversión a pesos chilenos.',
    href: '/cupo-en-dolares-a-pesos-chilenos',
    icon: CreditCard,
  },
  {
    category: 'Bancos y tarjetas',
    title: 'Cupo en dólares según banco o tarjeta',
    description: 'Revisa qué considerar según banco, emisor o marca de tarjeta antes de solicitar una cotización por WhatsApp.',
    href: '/bancos-y-tarjetas-cupo-en-dolares',
    icon: Landmark,
  },
  {
    category: 'Costos',
    title: '¿Cuánto recibo por mi cupo en dólares?',
    description: 'Cómo se calcula el monto neto final considerando dólar del día, costos, comisión y condiciones del caso.',
    href: '/cuanto-recibo-por-mi-cupo-en-dolares',
    icon: Calculator,
  },
  {
    category: 'Seguridad',
    title: '¿Es seguro cambiar cupo en dólares a pesos?',
    description: 'Señales de proceso responsable, datos que no deberías entregar y alertas antes de operar.',
    href: '/es-seguro-cambiar-cupo-en-dolares-a-pesos',
    icon: ShieldCheck,
  },
  {
    category: 'Funcionamiento',
    title: 'Vender cupo en dólares: cómo funciona en Chile',
    description: 'Qué se entiende por vender cupo en dólares y qué revisar antes de avanzar con una cotización.',
    href: '/vender-cupo-en-dolares-chile',
    icon: WalletCards,
  },
  {
    category: 'Negocios',
    title: 'Liquidez para negocios con cupo internacional',
    description: 'Revisa cuándo podría servir para cubrir caja puntual, proveedores o inventario usando cupo internacional disponible.',
    href: '/liquidez-para-negocios-cupo-internacional',
    icon: Building2,
  },
];

const extraResourceLinks = [
  { label: 'Simulador de pago de tarjeta', href: '/simulador-pago-tarjeta-credito' },
  { label: 'Avance cupo en dólares online', href: '/avance-cupo-en-dolares-online' },
  { label: 'Pagar deuda en dólares', href: '/como-pagar-deuda-en-dolares-tarjeta-credito' },
];

const bankCardLinks = [
  { label: 'BancoEstado', href: '/cupo-en-dolares-banco-estado' },
  { label: 'Santander', href: '/cupo-en-dolares-santander' },
  { label: 'Banco de Chile', href: '/cupo-en-dolares-banco-de-chile' },
  { label: 'BCI', href: '/cupo-en-dolares-bci' },
  { label: 'Scotiabank', href: '/cupo-en-dolares-scotiabank' },
  { label: 'Itaú', href: '/cupo-en-dolares-itau' },
  { label: 'CMR Falabella', href: '/cupo-en-dolares-cmr-falabella' },
  { label: 'Visa', href: '/cupo-en-dolares-tarjeta-visa' },
  { label: 'Mastercard', href: '/cupo-en-dolares-tarjeta-mastercard' },
];

const cityLinks = [
  { label: 'Santiago', href: '/cupo-en-dolares-santiago' },
  { label: 'Las Condes', href: '/cupo-en-dolares-las-condes' },
  { label: 'Providencia', href: '/cupo-en-dolares-providencia' },
  { label: 'Concepción', href: '/cupo-en-dolares-concepcion' },
  { label: 'Antofagasta', href: '/cupo-en-dolares-antofagasta' },
];

const compactSections = [
  {
    title: 'Más recursos',
    description: 'Herramientas y guías complementarias para revisar antes de cotizar.',
    links: extraResourceLinks,
  },
  {
    title: 'Bancos y tarjetas populares',
    description: 'Páginas específicas según banco, emisor o marca de tarjeta.',
    links: bankCardLinks,
  },
  {
    title: 'Cobertura por ciudad',
    description: 'Referencias de atención remota para distintas ciudades de Chile.',
    links: cityLinks,
  },
];

export default function Guias() {
  useEffect(() => {
    document.title = 'Guías EnPesos | Cupo internacional y cupo en dólares';

    const description = 'Guías simples para entender qué es EnPesos, el cupo internacional, vender cupo en dólares, costos, seguridad, pago posterior y simulación de tarjeta antes de cotizar en EnPesos.cl.';
    const canonicalUrl = 'https://www.enpesos.cl/guias';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Guías EnPesos' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section id="inicio" className="hero-gradient py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-4">Guías EnPesos</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
              Aprende antes de cotizar
            </h1>
            <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Información clara para entender qué es EnPesos, tu cupo internacional, comparar alternativas y cotizar con más seguridad.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                onClick={() => openWhatsApp('guides_hub_hero')}
              >
                Cotizar por WhatsApp
                <MessageCircle className="w-5 h-5" />
              </Button>
              <a
                href="#guias"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                Ver guías
              </a>
            </div>
          </div>
        </section>

        <section id="guias" className="py-14 sm:py-18 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {guides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <a
                    key={guide.href}
                    href={guide.href}
                    className="group rounded-3xl border border-border bg-card p-6 hover:-translate-y-1 hover:card-shadow transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary mb-3">{guide.category}</p>
                    <h2 className="text-xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-secondary-foreground leading-relaxed mb-5">{guide.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                      Leer guía
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-7 rounded-3xl border border-border bg-secondary/70 px-5 py-5 sm:px-6">
              <div className="grid gap-5 lg:grid-cols-3">
                {compactSections.map((section) => (
                  <div key={section.title} className="min-w-0">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-primary mb-2">
                      {section.title}
                    </p>
                    <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
                      {section.description}
                    </p>
                    <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-bold text-foreground">
                      {section.links.map((link, index) => (
                        <span key={link.href} className="inline-flex items-center gap-2">
                          {index > 0 && <span className="text-muted-foreground/50">·</span>}
                          <a href={link.href} className="hover:text-primary transition-colors">
                            {link.label}
                          </a>
                        </span>
                      ))}
                    </nav>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-background p-8 sm:p-10 text-center card-shadow">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                ¿Ya sabes qué quieres cotizar?
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto mb-7">
                Puedes escribirnos por WhatsApp, indicar el monto que quieres evaluar y recibir una cotización antes de decidir si avanzar.
              </p>
              <Button
                className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                onClick={() => openWhatsApp('guides_hub_footer')}
              >
                Cotizar por WhatsApp
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
