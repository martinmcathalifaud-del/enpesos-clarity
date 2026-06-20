import { useEffect } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

type CityKey = 'santiago' | 'las-condes' | 'providencia' | 'concepcion' | 'antofagasta';

type CityConfig = {
  key: CityKey;
  name: string;
  region: string;
  slug: string;
  searchName: string;
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
    intro: 'Si estás en Santiago y tienes tarjeta de crédito con cupo internacional disponible, puedes cotizar por WhatsApp una operación para evaluar cuánto podrías recibir en pesos chilenos antes de decidir.',
    localContext: 'En Santiago muchas personas comparan alternativas de liquidez rápida, avances bancarios y uso de tarjeta. La diferencia es que en EnPesos primero revisas una cotización clara y puedes preguntar antes de avanzar.',
  },
  'las-condes': {
    key: 'las-condes',
    name: 'Las Condes',
    region: 'Región Metropolitana',
    slug: 'cupo-en-dolares-las-condes',
    searchName: 'Las Condes',
    intro: 'Si estás en Las Condes y quieres evaluar tu cupo internacional disponible, puedes cotizar de forma remota por WhatsApp, sin entregar claves bancarias ni avanzar sin conocer antes el monto estimado.',
    localContext: 'Las Condes concentra muchos usuarios bancarizados, profesionales, emprendedores y personas con tarjetas de crédito. Por eso es clave comparar el neto estimado, costos y condiciones antes de tomar una decisión.',
  },
  providencia: {
    key: 'providencia',
    name: 'Providencia',
    region: 'Región Metropolitana',
    slug: 'cupo-en-dolares-providencia',
    searchName: 'Providencia',
    intro: 'Si estás en Providencia y tienes cupo internacional disponible, puedes escribirnos por WhatsApp para cotizar una alternativa asistida y revisar el monto estimado en pesos chilenos antes de decidir.',
    localContext: 'Providencia es una zona con alta actividad comercial y profesional. Si necesitas liquidez puntual, lo responsable es entender primero costos, plazos, banco, tarjeta y forma de pago posterior.',
  },
  concepcion: {
    key: 'concepcion',
    name: 'Concepción',
    region: 'Región del Biobío',
    slug: 'cupo-en-dolares-concepcion',
    searchName: 'Concepción',
    intro: 'Si estás en Concepción y buscas cotizar cupo en dólares a pesos chilenos, EnPesos atiende por WhatsApp para revisar tu caso de forma remota, clara y sin pedir claves bancarias.',
    localContext: 'La atención remota permite cotizar desde Concepción sin depender de una oficina presencial. Lo importante es revisar compatibilidad del banco, cupo disponible y condiciones antes de avanzar.',
  },
  antofagasta: {
    key: 'antofagasta',
    name: 'Antofagasta',
    region: 'Región de Antofagasta',
    slug: 'cupo-en-dolares-antofagasta',
    searchName: 'Antofagasta',
    intro: 'Si estás en Antofagasta y necesitas evaluar tu cupo internacional disponible, puedes cotizar por WhatsApp cuánto podrías recibir en pesos chilenos antes de decidir si avanzar.',
    localContext: 'En ciudades con alta actividad laboral y comercial como Antofagasta, muchas necesidades de liquidez son puntuales. La cotización previa ayuda a comparar sin asumir una operación a ciegas.',
  },
};

const cityList = Object.values(cities);

const processSteps = [
  {
    title: 'Nos escribes por WhatsApp',
    description: 'Indicas desde qué ciudad cotizas, banco, tarjeta y monto aproximado que quieres revisar.',
  },
  {
    title: 'Revisamos si el caso tiene sentido',
    description: 'Validamos información básica para estimar condiciones. Nunca pedimos claves bancarias, token ni acceso remoto.',
  },
  {
    title: 'Recibes una cotización clara',
    description: 'Antes de avanzar, ves monto estimado en pesos, costos considerados y condiciones relevantes.',
  },
  {
    title: 'Tú decides si continuar',
    description: 'Cotizar no te obliga a operar. Puedes comparar, preguntar y decidir con más información.',
  },
];

const safetyItems = [
  'No entregues claves bancarias, token, contraseñas ni códigos dinámicos.',
  'No aceptes acceso remoto a tu celular o computador.',
  'Pide siempre el monto neto estimado antes de avanzar.',
  'Confirma costos, condiciones y forma de pago posterior de tu tarjeta.',
  'Evita cualquier oferta que prometa resultados garantizados sin revisar tu caso.',
];

const faqs = [
  {
    question: '¿Puedo cotizar desde regiones?',
    answer: 'Sí. La atención de EnPesos es por WhatsApp, por lo que puedes cotizar de forma remota desde distintas ciudades de Chile. La compatibilidad se revisa caso a caso según banco, tarjeta, cupo disponible y condiciones.',
  },
  {
    question: '¿Necesito ir a una oficina?',
    answer: 'No. La cotización se realiza de forma remota por WhatsApp. El foco es que puedas revisar monto estimado, costos y condiciones antes de decidir.',
  },
  {
    question: '¿EnPesos pide claves bancarias?',
    answer: 'No. Nunca pedimos claves bancarias, token, contraseñas, acceso remoto ni control de tus cuentas. Si alguien te pide esa información, no la entregues.',
  },
  {
    question: '¿Cotizar me obliga a operar?',
    answer: 'No. Cotizar no te obliga a avanzar. La idea es que primero puedas entender el monto estimado en pesos chilenos, costos y condiciones.',
  },
  {
    question: '¿Es un préstamo o avance bancario?',
    answer: 'No. EnPesos no entrega préstamos ni avances bancarios. Entrega atención asistida para cotizar una operación usando cupo internacional disponible de una tarjeta de crédito.',
  },
];

interface CupoDolaresCiudadProps {
  cityKey: CityKey;
}

export default function CupoDolaresCiudad({ cityKey }: CupoDolaresCiudadProps) {
  const city = cities[cityKey];
  const canonicalUrl = `https://www.enpesos.cl/${city.slug}`;
  const title = `Cupo en dólares en ${city.searchName} | Cotiza por WhatsApp | EnPesos.cl`;
  const description = `Cotiza tu cupo en dólares en ${city.searchName}. Atención remota por WhatsApp para evaluar cupo internacional a pesos chilenos, sin claves bancarias y sin obligación de operar.`;
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
        name: `Cupo en dólares en ${city.searchName}`,
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
        '@type': 'Service',
        name: `Cotización de cupo en dólares en ${city.searchName}`,
        provider: {
          '@type': 'Organization',
          name: 'EnPesos.cl',
          url: 'https://www.enpesos.cl',
        },
        areaServed: {
          '@type': 'City',
          name: city.name,
        },
        serviceType: 'Atención asistida por WhatsApp para cotizar cupo internacional disponible',
        description,
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
            name: `Cupo en dólares en ${city.searchName}`,
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
  }, [canonicalUrl, city, description, title]);

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
                  Cupo en dólares en {city.searchName}: cotiza a pesos chilenos por WhatsApp
                </h1>
                <p className="text-xl text-secondary-foreground leading-relaxed mb-8 max-w-3xl">
                  {city.intro}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="h-12 rounded-xl px-7 text-base font-bold button-shadow"
                    onClick={() => openWhatsApp(`seo_ciudad_${city.key}_hero`, whatsappMessage)}
                  >
                    Cotizar desde {city.name}
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <a
                    href="/es-seguro-cambiar-cupo-en-dolares-a-pesos"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-3 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Revisar seguridad
                    <ShieldCheck className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <ShieldCheck className="w-10 h-10 text-primary mb-5" />
                <h2 className="text-2xl font-extrabold text-foreground mb-4">Atención remota, no presencial</h2>
                <p className="text-secondary-foreground leading-relaxed mb-5">
                  EnPesos atiende por WhatsApp. Esta página está pensada para personas en {city.name} que quieren cotizar de forma remota, con información clara y sin entregar datos sensibles.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Cotización previa antes de decidir.</span>
                  </li>
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Sin claves bancarias, token ni acceso remoto.</span>
                  </li>
                  <li className="flex gap-3 text-secondary-foreground">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>Atención humana por WhatsApp.</span>
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
                Cómo cotizar cupo internacional desde {city.name}
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
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Seguridad</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Qué revisar antes de usar tu cupo en dólares
                </h2>
                <p className="text-lg text-secondary-foreground leading-relaxed">
                  Que la atención sea remota no significa operar a ciegas. Antes de tomar una decisión, revisa estas señales básicas de seguridad.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <ul className="space-y-4">
                  {safetyItems.map((item) => (
                    <li key={item} className="flex gap-3 text-secondary-foreground">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/es-seguro-cambiar-cupo-en-dolares-a-pesos"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:underline underline-offset-4"
                >
                  Ver guía completa de seguridad
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <AlertTriangle className="w-10 h-10 text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-700 mb-3">Importante</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    No somos banco, casa de cambio ni prestamista
                  </h2>
                  <p className="text-secondary-foreground leading-relaxed">
                    EnPesos no entrega préstamos, no aumenta tu línea bancaria y no ofrece avances bancarios. La atención consiste en cotizar de forma asistida una operación usando cupo internacional disponible, para que puedas comparar antes de decidir.
                  </p>
                </div>
              </div>
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
                Dudas comunes sobre cupo en dólares en {city.searchName}
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
              Escríbenos por WhatsApp, revisamos tu caso y te entregamos una cotización clara. No estás obligado a operar.
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
