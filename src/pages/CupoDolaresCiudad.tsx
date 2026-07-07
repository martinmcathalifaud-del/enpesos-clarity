import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

type CityKey = 'santiago' | 'las-condes' | 'providencia' | 'concepcion' | 'antofagasta' | 'valparaiso' | 'rancagua';

type CityConfig = {
  key: CityKey;
  name: string;
  region: string;
  slug: string;
  searchName: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  localContext: string;
};

const cities: Record<CityKey, CityConfig> = {
  santiago: {
    key: 'santiago',
    name: 'Santiago',
    region: 'Región Metropolitana',
    slug: 'cupo-en-dolares-santiago',
    searchName: 'Santiago',
    title: 'Cupo en dólares desde Santiago | Cotiza a pesos chilenos',
    description: 'Cotiza desde Santiago cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Santiago',
    intro: 'Si estás en Santiago y tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir usando ese cupo. Primero ves monto estimado, costo y condiciones antes de decidir.',
    localContext: 'Desde Santiago puedes solicitar una cotización remota para revisar tu cupo en dólares de la tarjeta, sin asumir una decisión a ciegas y sin entregar claves bancarias.',
  },
  'las-condes': {
    key: 'las-condes',
    name: 'Las Condes',
    region: 'Región Metropolitana',
    slug: 'cupo-en-dolares-las-condes',
    searchName: 'Las Condes',
    title: 'Cupo en dólares desde Las Condes | Cotiza a pesos chilenos',
    description: 'Cotiza desde Las Condes cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Las Condes',
    intro: 'Si estás en Las Condes y tienes cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir en tu cuenta usando ese cupo.',
    localContext: 'Desde Las Condes puedes revisar una cotización previa con monto estimado, costo y condiciones antes de decidir si avanzar.',
  },
  providencia: {
    key: 'providencia',
    name: 'Providencia',
    region: 'Región Metropolitana',
    slug: 'cupo-en-dolares-providencia',
    searchName: 'Providencia',
    title: 'Cupo en dólares desde Providencia | Cotiza a pesos chilenos',
    description: 'Cotiza desde Providencia cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Providencia',
    intro: 'Si estás en Providencia y tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir en tu cuenta.',
    localContext: 'Desde Providencia puedes revisar una cotización clara antes de decidir, con explicación de costos, condiciones y cargo posterior en la tarjeta.',
  },
  concepcion: {
    key: 'concepcion',
    name: 'Concepción',
    region: 'Región del Biobío',
    slug: 'cupo-en-dolares-concepcion',
    searchName: 'Concepción',
    title: 'Cupo en dólares desde Concepción | Cotiza a pesos chilenos',
    description: 'Cotiza desde Concepción cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Concepción',
    intro: 'Si estás en Concepción y tienes cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir usando ese cupo.',
    localContext: 'Desde Concepción puedes cotizar de forma remota, revisar el monto estimado y decidir con más información antes de avanzar.',
  },
  antofagasta: {
    key: 'antofagasta',
    name: 'Antofagasta',
    region: 'Región de Antofagasta',
    slug: 'cupo-en-dolares-antofagasta',
    searchName: 'Antofagasta',
    title: 'Cupo en dólares desde Antofagasta | Cotiza a pesos chilenos',
    description: 'Cotiza desde Antofagasta cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. No somos casa de cambio ni pedimos claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Antofagasta',
    intro: 'Si estás en Antofagasta y tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir usando ese cupo. Primero ves monto estimado, costo y condiciones antes de decidir.',
    localContext: 'Desde Antofagasta puedes solicitar una cotización previa para saber cuántos pesos chilenos podrías recibir en tu cuenta usando el cupo en dólares de tu tarjeta.',
  },
  valparaiso: {
    key: 'valparaiso',
    name: 'Valparaíso',
    region: 'Región de Valparaíso',
    slug: 'cupo-en-dolares-valparaiso',
    searchName: 'Valparaíso',
    title: 'Cupo en dólares desde Valparaíso | Cotiza a pesos chilenos',
    description: 'Cotiza desde Valparaíso cuántos pesos chilenos podrías recibir usando cupo internacional disponible de tu tarjeta. Proceso asistido, sin claves bancarias.',
    h1: 'Cupo en dólares a pesos chilenos desde Valparaíso',
    intro: 'Si estás en Valparaíso y tienes cupo en dólares disponible en tu tarjeta, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir en tu cuenta.',
    localContext: 'Desde Valparaíso puedes revisar una cotización previa con monto estimado, costo y condiciones antes de decidir si avanzar.',
  },
  rancagua: {
    key: 'rancagua',
    name: 'Rancagua',
    region: "Región de O'Higgins",
    slug: 'cupo-en-dolares-rancagua',
    searchName: 'Rancagua',
    title: 'Cupo en dólares desde Rancagua | Cotiza a pesos chilenos',
    description: 'Desde Rancagua, cotiza cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Con costo claro antes de decidir.',
    h1: 'Cupo en dólares a pesos chilenos desde Rancagua',
    intro: 'Si estás en Rancagua y tu tarjeta tiene cupo internacional disponible, EnPesos te ayuda a cotizar cuántos pesos chilenos podrías recibir en tu cuenta.',
    localContext: 'Desde Rancagua puedes revisar monto estimado, costo y condiciones antes de decidir si quieres avanzar con una operación asistida.',
  },
};

const cityList = Object.values(cities);

const processSteps = [
  {
    title: 'Indicas tu cupo y monto',
    description: 'Nos cuentas que tienes cupo internacional disponible y el monto aproximado que quieres cotizar.',
  },
  {
    title: 'Recibes una cotización previa',
    description: 'Revisas cuántos pesos chilenos podrías recibir, junto con costo y condiciones antes de decidir.',
  },
  {
    title: 'Decides si avanzar',
    description: 'Cotizar no te obliga a continuar. Puedes preguntar, comparar y decidir con más información.',
  },
  {
    title: 'Recibes transferencia en pesos',
    description: 'Si decides avanzar y la operación se confirma, recibes una transferencia en pesos chilenos en tu cuenta.',
  },
];

const safetyItems = [
  'No pedimos claves bancarias, token, coordenadas ni contraseñas.',
  'No pedimos CVV por WhatsApp ni acceso remoto a tu celular o computador.',
  'Primero revisas monto estimado, costo y condiciones antes de decidir.',
  'Usa únicamente los canales enlazados desde enpesos.cl y nuestras redes oficiales.',
  'Si algo no queda claro, detente y pregunta antes de avanzar.',
];

const buildFaqs = (city: CityConfig) => [
  {
    question: `¿Puedo cotizar mi cupo en dólares desde ${city.name}?`,
    answer: `Sí. Si estás en ${city.name} y tienes cupo internacional disponible en tu tarjeta, puedes solicitar una cotización para revisar cuántos pesos chilenos podrías recibir en tu cuenta. La revisión depende del banco, emisor, monto, cupo disponible y condiciones del caso.`,
  },
  {
    question: '¿EnPesos tiene oficina local?',
    answer: 'No declaramos oficina física local si no está documentada. La cotización se realiza por los canales oficiales enlazados desde enpesos.cl, con atención humana y explicación previa antes de decidir.',
  },
  {
    question: '¿EnPesos es una casa de cambio?',
    answer: 'No. EnPesos no es una casa de cambio, no compra ni vende divisas como actividad cambiaria y no entrega dinero físico. Ayuda a cotizar cuántos pesos chilenos podrías recibir usando cupo internacional disponible de tu tarjeta.',
  },
  {
    question: '¿Recibo transferencia en pesos chilenos?',
    answer: 'Si decides avanzar y la operación se confirma, el objetivo es que recibas una transferencia en pesos chilenos en tu cuenta bancaria. Primero revisas la cotización y decides si te hace sentido.',
  },
  {
    question: '¿Queda un cargo o deuda en mi tarjeta?',
    answer: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor. El pago posterior, facturación, intereses o comisiones dependen de esas condiciones.',
  },
  {
    question: '¿Qué datos no debo entregar?',
    answer: 'No entregues claves bancarias, token, coordenadas, contraseñas, CVV por WhatsApp ni acceso remoto a tus dispositivos. Si alguien te pide esos datos, detente y usa solo canales oficiales enlazados desde enpesos.cl.',
  },
];

interface CupoDolaresCiudadProps {
  cityKey: CityKey;
}

export default function CupoDolaresCiudad({ cityKey }: CupoDolaresCiudadProps) {
  const city = cities[cityKey];
  const faqs = buildFaqs(city);
  const canonicalUrl = `https://www.enpesos.cl/${city.slug}`;
  const title = city.title;
  const description = city.description;
  const whatsappMessage = `Hola, estoy en ${city.name} y quiero cotizar mi cupo internacional disponible para recibir pesos chilenos.`;

  useEffect(() => {
    document.title = title;

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'EnPesos.cl' });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: city.h1,
        description,
        url: canonicalUrl,
        isPartOf: {
          '@type': 'WebSite',
          name: 'EnPesos.cl',
          url: 'https://www.enpesos.cl',
        },
        about: 'Cotización asistida de cupo internacional disponible a pesos chilenos',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: 'https://www.enpesos.cl',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: city.h1,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ];

    let script = document.getElementById(`ld-json-cupo-ciudad-${city.key}`) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `ld-json-cupo-ciudad-${city.key}`;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.getElementById(`ld-json-cupo-ciudad-${city.key}`)?.remove();
    };
  }, [canonicalUrl, city, description, faqs, title]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-secondary py-16 sm:py-24">
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_18%_20%,hsl(var(--primary)_/_0.16),transparent_26%),radial-gradient(circle_at_82%_18%,hsl(var(--accent)_/_0.14),transparent_24%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] text-primary mb-5">
                  <MapPin className="w-4 h-4" />
                  {city.name}, {city.region}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
                  {city.h1}
                </h1>
                <p className="text-xl text-secondary-foreground leading-relaxed mb-8 max-w-3xl">
                  {city.intro}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp(`seo_ciudad_${city.key}_hero`, whatsappMessage)}
                  >
                    Solicitar cotización
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a
                    href="/como-funciona"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Ver cómo funciona
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <ShieldCheck className="w-10 h-10 text-primary mb-5" />
                <h2 className="text-2xl font-extrabold text-foreground mb-4">Cotización remota, sin oficina local declarada</h2>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  Esta página es para personas que quieren cotizar desde {city.name}. EnPesos no declara una oficina física local si no está documentada; la atención se realiza por canales oficiales enlazados desde enpesos.cl.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Cotización previa antes de decidir.</span>
                  </li>
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Pesos chilenos en tu cuenta si avanzas y la operación se confirma.</span>
                  </li>
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Sin claves bancarias, token, acceso remoto ni CVV por WhatsApp.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Cómo funciona</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Cotiza tu cupo en dólares desde {city.name}
              </h2>
              <p className="text-lg text-secondary-foreground leading-relaxed">
                {city.localContext}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-border bg-card p-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-5 text-primary font-extrabold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-3">{step.title}</h3>
                  <p className="text-secondary-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">No somos casa de cambio</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Una alternativa distinta para cotizar cupo en dólares
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  EnPesos no es una casa de cambio, no compra ni vende divisas como actividad cambiaria y no entrega dinero físico. La referencia a dólares viene del cupo internacional disponible en tu tarjeta.
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <h3 className="text-2xl font-extrabold text-foreground mb-4">Qué significa para ti</h3>
                <p className="text-secondary-foreground leading-relaxed mb-4">
                  Puedes cotizar cuántos pesos chilenos podrías recibir usando el cupo en dólares de tu tarjeta. Primero revisas el monto estimado, el costo y las condiciones. Después decides si avanzar.
                </p>
                <p className="text-secondary-foreground leading-relaxed">
                  Si la operación se confirma, recibes una transferencia en pesos chilenos en tu cuenta bancaria.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Seguridad</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Datos que EnPesos no pide
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  Antes de decidir, revisa el monto estimado, costo, condiciones y datos solicitados. No entregues información sensible fuera de los canales oficiales.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 card-shadow">
                <ul className="space-y-4">
                  {safetyItems.map((item) => (
                    <li key={item} className="flex gap-3 text-secondary-foreground">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/seguridad"
                    className="inline-flex items-center gap-2 font-bold text-primary hover:underline underline-offset-4"
                  >
                    Ver seguridad en EnPesos
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/preguntas-frecuentes"
                    className="inline-flex items-center gap-2 font-bold text-primary hover:underline underline-offset-4"
                  >
                    Ver preguntas frecuentes
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <AlertTriangle className="w-10 h-10 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 mb-3">Importante</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Puede generarse un cargo o deuda en tu tarjeta
                  </h2>
                  <p className="text-secondary-foreground leading-relaxed mb-4">
                    Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.
                  </p>
                  <p className="text-secondary-foreground leading-relaxed">
                    EnPesos no entrega préstamos, no aumenta tu línea bancaria, no es banco y no ofrece avances bancarios tradicionales. El pago posterior, facturación, intereses o comisiones dependen de tu banco o emisor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Enlaces útiles</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Revisa más información antes de decidir
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <a href="/como-funciona" className="rounded-2xl border border-border bg-card p-4 font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">Cómo funciona</a>
              <a href="/seguridad" className="rounded-2xl border border-border bg-card p-4 font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">Seguridad</a>
              <a href="/preguntas-frecuentes" className="rounded-2xl border border-border bg-card p-4 font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">Preguntas frecuentes</a>
              <a href="/cupo-en-dolares-a-pesos-chilenos" className="rounded-2xl border border-border bg-card p-4 font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">Cupo en dólares a pesos</a>
              <a href="/que-es-enpesos" className="rounded-2xl border border-border bg-card p-4 font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">Qué es EnPesos</a>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Otras ciudades</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                También puedes cotizar desde otras ciudades de Chile
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {cityList.map((item) => (
                <a
                  key={item.slug}
                  href={`/${item.slug}`}
                  className={`rounded-full border px-5 py-3 text-sm font-bold transition-colors ${
                    item.key === city.key
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-background text-foreground hover:border-primary/40 hover:text-primary'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                Dudas comunes sobre cotizar desde {city.searchName}
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-border bg-card p-5 open:card-shadow">
                  <summary className="cursor-pointer list-none text-lg font-extrabold text-foreground flex items-start justify-between gap-4">
                    {faq.question}
                    <span className="text-primary group-open:rotate-90 transition-transform">›</span>
                  </summary>
                  <p className="text-secondary-foreground leading-relaxed mt-3">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-primary">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
            <Clock3 className="w-10 h-10 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Cotiza tu cupo en dólares desde {city.name}
            </h2>
            <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-7 text-primary-foreground/90">
              Primero revisas cuánto podrías recibir en pesos chilenos, costo y condiciones. Si no te hace sentido, no tienes obligación de avanzar.
            </p>
            <Button
              variant="secondary"
              className="h-12 rounded-xl px-7 text-base font-bold"
              onClick={() => openWhatsApp(`seo_ciudad_${city.key}_final`, whatsappMessage)}
            >
              Cotizar por WhatsApp
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
