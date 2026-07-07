import { ArrowRight, Building2, Calculator, CreditCard, Landmark, ShieldCheck, WalletCards } from 'lucide-react';

const featuredGuides = [
  {
    category: 'Principal',
    title: 'Cupo en dólares a pesos chilenos',
    description: 'Conoce cómo cotizar tu cupo internacional disponible para evaluar cuánto podrías recibir en pesos chilenos antes de decidir.',
    href: '/cupo-en-dolares-a-pesos-chilenos',
    cta: 'Ver guía principal',
    icon: CreditCard,
  },
  {
    category: 'Bancos y tarjetas',
    title: 'Cupo en dólares según banco o tarjeta',
    description: 'Revisa qué considerar si tienes BancoEstado, Santander, Banco de Chile, BCI, CMR, Visa, Mastercard u otra tarjeta con cupo internacional disponible.',
    href: '/bancos-y-tarjetas-cupo-en-dolares',
    cta: 'Ver bancos y tarjetas',
    icon: Landmark,
  },
  {
    category: 'Costos',
    title: '¿Cuánto recibo por mi cupo en dólares?',
    description: 'Entiende por qué el monto final depende del dólar del día, costos de procesamiento, comisión y condiciones del caso.',
    href: '/cuanto-recibo-por-mi-cupo-en-dolares',
    cta: 'Guía para saber cuánto recibo por mi cupo en dólares',
    icon: Calculator,
  },
  {
    category: 'Seguridad',
    title: '¿Es seguro cambiar cupo en dólares a pesos?',
    description: 'Revisa qué señales mirar antes de operar, qué datos no entregar y cómo identificar un proceso responsable.',
    href: '/es-seguro-cambiar-cupo-en-dolares-a-pesos',
    cta: 'Guía sobre seguridad al cambiar cupo en dólares',
    icon: ShieldCheck,
  },
  {
    category: 'Funcionamiento',
    title: 'Vender cupo en dólares: cómo funciona en Chile',
    description: 'Aprende qué significa cotizar una operación con cupo internacional disponible y qué revisar antes de avanzar.',
    href: '/vender-cupo-en-dolares-chile',
    cta: 'Guía para vender cupo en dólares en Chile',
    icon: WalletCards,
  },
  {
    category: 'Negocios',
    title: 'Liquidez para negocios con cupo internacional',
    description: 'Revisa cuándo podría servir para cubrir caja puntual, proveedores o inventario usando cupo internacional disponible.',
    href: '/liquidez-para-negocios-cupo-internacional',
    cta: 'Ver alternativa de liquidez para mi negocio',
    icon: Building2,
  },
];

const coreLinks = [
  { label: 'Cómo funciona', href: '/como-funciona' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Seguridad en EnPesos', href: '/seguridad' },
  { label: 'Nosotros', href: '/nosotros' },
];

const cityLinks = [
  { label: 'Santiago', href: '/cupo-en-dolares-santiago' },
  { label: 'Las Condes', href: '/cupo-en-dolares-las-condes' },
  { label: 'Providencia', href: '/cupo-en-dolares-providencia' },
  { label: 'Concepción', href: '/cupo-en-dolares-concepcion' },
  { label: 'Antofagasta', href: '/cupo-en-dolares-antofagasta' },
  { label: 'Valparaíso', href: '/cupo-en-dolares-valparaiso' },
  { label: 'Rancagua', href: '/cupo-en-dolares-rancagua' },
];

export default function HomeGuides() {
  return (
    <section id="guias" className="py-14 sm:py-18 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Guías EnPesos</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Aprende antes de cotizar
            </h2>
            <p className="text-lg text-secondary-foreground leading-relaxed">
              Guías simples para entender cómo funciona el cupo internacional, qué costos considerar y qué revisar antes de cotizar tu cupo en dólares a pesos chilenos.
            </p>
          </div>
          <a
            href="/guias"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
          >
            Ver todas las guías EnPesos
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredGuides.map((guide) => {
            const Icon = guide.icon;
            return (
              <a
                key={guide.href}
                href={guide.href}
                className="group rounded-3xl border border-border bg-background p-6 card-shadow hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary mb-3">{guide.category}</p>
                <h3 className="text-xl font-extrabold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-secondary-foreground leading-relaxed mb-5">{guide.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                  {guide.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-border/70 bg-background/70 px-5 py-4 text-sm text-secondary-foreground">
          <span className="font-semibold text-foreground">Páginas clave para decidir mejor: </span>
          <span className="inline-flex flex-wrap gap-x-2 gap-y-1">
            {coreLinks.map((link, index) => (
              <span key={link.href} className="inline-flex items-center gap-x-2">
                <a href={link.href} className="font-bold text-primary hover:text-primary/80 transition-colors">
                  {link.label}
                </a>
                {index < coreLinks.length - 1 && <span className="text-border">·</span>}
              </span>
            ))}
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-border/70 bg-background/70 px-5 py-4 text-sm text-secondary-foreground">
          <span className="font-semibold text-foreground">También puedes revisar cobertura por ciudad: </span>
          <span className="inline-flex flex-wrap gap-x-2 gap-y-1">
            {cityLinks.map((city, index) => (
              <span key={city.href} className="inline-flex items-center gap-x-2">
                <a href={city.href} className="font-bold text-primary hover:text-primary/80 transition-colors">
                  {city.label}
                </a>
                {index < cityLinks.length - 1 && <span className="text-border">·</span>}
              </span>
            ))}
          </span>
        </div>

        <a
          href="/simulador-pago-tarjeta-credito"
          className="group mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-primary/20 bg-background p-6 card-shadow hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary mb-2">Herramienta</p>
              <h3 className="text-xl font-extrabold text-foreground mb-2 group-hover:text-primary transition-colors">
                Simula el pago de tu tarjeta
              </h3>
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Antes de cotizar, estima cuánto podrías demorar en pagar si eliges pago total, pago mensual referencial o un monto fijo mensual.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary shrink-0">
            Simulador de pago de tarjeta de crédito
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>
      </div>
    </section>
  );
}
