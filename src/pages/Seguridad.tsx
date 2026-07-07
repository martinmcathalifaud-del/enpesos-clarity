import { useEffect } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, FileCheck, LockKeyhole, ShieldCheck, UserCheck, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const CANONICAL_URL = 'https://www.enpesos.cl/seguridad';
const metaDescription = 'Conoce las reglas de seguridad de EnPesos. No pedimos claves bancarias ni CVV por WhatsApp. Revisa datos, titularidad y costos antes de decidir.';

const neverAsk = [
  'Clave bancaria o clave de internet.',
  'Token, coordenadas o codigos para entrar a tu banco.',
  'CVV por WhatsApp.',
  'Acceso remoto a tu celular o computador.',
  'Fotos completas de tu tarjeta por ambos lados.',
  'Contrasenas de correo, banco o aplicaciones financieras.',
];

const safetySignals = [
  'Cotizacion previa antes de decidir.',
  'Costo y condiciones explicados antes de avanzar.',
  'Titularidad de tarjeta y cuenta bancaria validada.',
  'Transferencia en pesos a cuenta bancaria del titular validado.',
  'Sin claves bancarias ni CVV por WhatsApp.',
  'Proceso detenido si algo no puede completarse.',
];

const alerts = [
  'Te piden claves, token, coordenadas o acceso remoto.',
  'Te prometen resultados garantizados.',
  'No explican costos ni condiciones antes de avanzar.',
  'Te presionan para decidir sin revisar la cotizacion.',
  'Te piden usar tarjeta o cuenta de otra persona.',
  'La oferta suena demasiado buena para ser real.',
];

const faqs = [
  { question: '¿EnPesos pide claves bancarias?', answer: 'No. EnPesos no pide claves bancarias, token, coordenadas ni acceso remoto.' },
  { question: '¿EnPesos pide CVV por WhatsApp?', answer: 'No pedimos CVV por WhatsApp. Si alguien te pide ese dato por ese canal, no avances.' },
  { question: '¿Que canales debo usar?', answer: 'Usa únicamente los canales enlazados desde enpesos.cl y nuestras redes oficiales.' },
  { question: '¿Como se valida la titularidad?', answer: 'El proceso debe considerar que la tarjeta y la cuenta bancaria correspondan al titular validado antes de avanzar.' },
  { question: '¿Que pasa si algo no puede completarse?', answer: 'Si una operacion no puede completarse, se detiene el proceso y se revisa el caso antes de cualquier siguiente paso.' },
];

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

export default function Seguridad() {
  useEffect(() => {
    document.title = 'Seguridad EnPesos | Datos que no pedimos y proceso claro';
    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Seguridad EnPesos' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: CANONICAL_URL });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: CANONICAL_URL });

    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebPage', '@id': `${CANONICAL_URL}#webpage`, url: CANONICAL_URL, name: 'Seguridad EnPesos', description: metaDescription, isPartOf: { '@type': 'WebSite', name: 'EnPesos.cl', url: 'https://www.enpesos.cl' } },
        { '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      ],
    };

    const scriptId = 'seguridad-schema';
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
              <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary">Seguridad EnPesos</p>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Seguridad en EnPesos: cotiza sin entregar claves bancarias
              </h1>
              <p className="mb-7 max-w-2xl text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                Antes de avanzar debes ver cuanto podrias recibir en pesos, el costo y las condiciones. EnPesos no pide claves bancarias ni CVV por WhatsApp.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('seguridad_hero')}>
                  Cotizar con informacion clara
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <a href="/como-funciona" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">Ver como funciona</a>
              </div>
            </div>
            <aside className="rounded-[2rem] border border-border bg-background p-6 shadow-xl lg:p-8">
              <ShieldCheck className="mb-5 h-10 w-10 text-primary" />
              <h2 className="mb-4 text-2xl font-black text-foreground">Canales oficiales</h2>
              <p className="mb-5 leading-relaxed text-secondary-foreground">Usa únicamente los canales enlazados desde enpesos.cl y nuestras redes oficiales.</p>
              <p className="rounded-2xl bg-secondary p-4 text-sm font-semibold text-secondary-foreground">Si algo no queda claro, detente y pregunta antes de avanzar.</p>
            </aside>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
              <LockKeyhole className="mb-5 h-9 w-9 text-primary" />
              <h2 className="mb-5 text-2xl font-black text-foreground">Datos que no pedimos</h2>
              <ul className="grid gap-3 text-secondary-foreground">
                {neverAsk.map((item) => <li key={item} className="flex gap-3"><XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />{item}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-card p-7 shadow-sm">
              <FileCheck className="mb-5 h-9 w-9 text-primary" />
              <h2 className="mb-5 text-2xl font-black text-foreground">Señales de un proceso claro</h2>
              <ul className="grid gap-3 text-secondary-foreground">
                {safetySignals.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <AlertTriangle className="mb-4 h-9 w-9 text-primary" />
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Señales de alerta antes de operar</h2>
              <p className="mt-4 text-lg leading-relaxed text-secondary-foreground">Un proceso claro permite preguntar, revisar y decidir. Si algo parece forzado o poco transparente, es mejor detenerse.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {alerts.map((item) => <article key={item} className="rounded-3xl border border-border bg-background p-5 shadow-sm"><AlertTriangle className="mb-4 h-6 w-6 text-amber-500" /><p className="font-bold leading-relaxed text-foreground">{item}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
              <UserCheck className="mb-5 h-8 w-8 text-primary" />
              <h2 className="mb-3 text-2xl font-black text-foreground">Titularidad</h2>
              <p className="leading-relaxed text-secondary-foreground">La tarjeta y la cuenta bancaria deben corresponder al titular validado antes de avanzar.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
              <FileCheck className="mb-5 h-8 w-8 text-primary" />
              <h2 className="mb-3 text-2xl font-black text-foreground">Condiciones claras</h2>
              <p className="leading-relaxed text-secondary-foreground">Antes de decidir, revisas cuanto podrias recibir en pesos, el costo y las condiciones.</p>
            </div>
            <div className="rounded-3xl border border-border bg-background p-7 shadow-sm">
              <ShieldCheck className="mb-5 h-8 w-8 text-primary" />
              <h2 className="mb-3 text-2xl font-black text-foreground">Limites del proceso</h2>
              <p className="leading-relaxed text-secondary-foreground">No prometemos aprobacion, plazos exactos ni resultados garantizados. Cada caso se revisa antes de avanzar.</p>
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">Preguntas de seguridad</h2>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="rounded-3xl border border-border bg-background p-6 shadow-sm">
                  <summary className="cursor-pointer list-none text-lg font-black text-foreground">{faq.question}</summary>
                  <p className="mt-4 leading-relaxed text-secondary-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
