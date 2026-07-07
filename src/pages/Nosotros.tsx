import { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Handshake, Mail, ShieldCheck, UserRoundCheck, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const CANONICAL_URL = 'https://www.enpesos.cl/nosotros';
const metaDescription = 'Conoce EnPesos, un servicio chileno que te ayuda a cotizar tu cupo en dolares a pesos chilenos con atencion humana, claridad y sin claves bancarias.';

const principles = [
  'Explicar el proceso antes de avanzar.',
  'Mostrar una cotizacion previa con costo y condiciones.',
  'No pedir claves bancarias ni CVV por WhatsApp.',
  'Validar titularidad antes de continuar.',
  'Hablar claro sobre el cargo o deuda posterior en la tarjeta.',
  'Detener el proceso si algo no puede completarse.',
];

const weDo = [
  'Ayudamos a cotizar cuantos pesos chilenos podrias recibir usando cupo internacional disponible.',
  'Acompanamos el proceso para que entiendas monto, costo y condiciones.',
  'Explicamos que puede generarse un cargo o deuda posterior en la tarjeta.',
  'Atendemos dudas antes de que decidas avanzar.',
];

const weDont = [
  'No somos banco.',
  'No entregamos prestamos.',
  'No aprobamos creditos ni aumentamos lineas.',
  'No somos casa de cambio.',
  'No representamos bancos, emisores ni marcas de tarjeta.',
];

const faqs = [
  { question: '¿Que es EnPesos?', answer: 'EnPesos es un servicio chileno que ayuda a cotizar cuantos pesos chilenos podrias recibir usando cupo en dolares de tu tarjeta.' },
  { question: '¿EnPesos es un banco?', answer: 'No. EnPesos no es banco ni entidad financiera regulada.' },
  { question: '¿EnPesos entrega prestamos?', answer: 'No. EnPesos no entrega prestamos ni creditos.' },
  { question: '¿Como trabaja EnPesos?', answer: 'Trabaja con cotizacion previa, atencion humana, costo claro antes de decidir y sin pedir claves bancarias.' },
  { question: '¿Que canales debo usar?', answer: 'Usa únicamente los canales enlazados desde enpesos.cl y nuestras redes oficiales.' },
];

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

export default function Nosotros() {
  useEffect(() => {
    document.title = 'Nosotros | EnPesos.cl';
    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Nosotros | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: CANONICAL_URL });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: CANONICAL_URL });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'AboutPage', '@id': `${CANONICAL_URL}#webpage`, url: CANONICAL_URL, name: 'Nosotros | EnPesos.cl', description: metaDescription, isPartOf: { '@type': 'WebSite', name: 'EnPesos.cl', url: 'https://www.enpesos.cl' } },
        { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      ],
    };

    const scriptId = 'nosotros-schema';
    document.getElementById(scriptId)?.remove();
    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => document.getElementById(scriptId)?.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="hero-gradient px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary">Nosotros</p>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Quiénes somos y cómo trabajamos en EnPesos
              </h1>
              <p className="mb-7 max-w-2xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                EnPesos es un servicio chileno que ayuda a cotizar cuantos pesos chilenos podrias recibir usando el cupo en dolares de tu tarjeta, con atencion humana, costo claro antes de decidir y sin claves bancarias.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('nosotros_hero')}>
                  Solicitar cotizacion
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <a href="/como-funciona" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">Ver como funciona</a>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <UserRoundCheck className="mb-5 h-10 w-10 text-primary" />
              <h2 className="mb-4 text-2xl font-black text-foreground">Canales de atencion</h2>
              <p className="mb-4 leading-relaxed text-secondary-foreground">Usa únicamente los canales enlazados desde enpesos.cl y nuestras redes oficiales.</p>
              <div className="flex items-center gap-3 rounded-2xl bg-secondary p-4 text-sm font-bold text-foreground">
                <Mail className="h-5 w-5 text-primary" />
                contacto@enpesos.cl
              </div>
            </aside>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Que hacemos y que no hacemos</h2>
              <p className="mt-4 text-lg leading-relaxed text-secondary-foreground">Esta pagina es de confianza institucional. Para una explicacion del servicio, tambien puedes revisar Que es EnPesos.</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
                <Handshake className="mb-5 h-9 w-9 text-primary" />
                <h3 className="mb-5 text-2xl font-black text-foreground">Lo que hacemos</h3>
                <ul className="grid gap-3 text-secondary-foreground">
                  {weDo.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{item}</li>)}
                </ul>
              </div>
              <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
                <XCircle className="mb-5 h-9 w-9 text-destructive" />
                <h3 className="mb-5 text-2xl font-black text-foreground">Lo que no hacemos</h3>
                <ul className="grid gap-3 text-secondary-foreground">
                  {weDont.map((item) => <li key={item} className="flex gap-3"><XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <ShieldCheck className="mb-4 h-9 w-9 text-primary" />
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Nuestros principios de trabajo</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {principles.map((item) => <article key={item} className="rounded-3xl border border-border bg-background p-6 shadow-sm"><CheckCircle2 className="mb-4 h-7 w-7 text-accent" /><p className="font-bold leading-relaxed text-foreground">{item}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Preguntas sobre EnPesos</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-black text-foreground">{faq.question}</summary>
                  <p className="mt-4 leading-relaxed text-secondary-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="/que-es-enpesos" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">Ver que es EnPesos</a>
              <a href="/seguridad" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-secondary px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">Ver seguridad</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
