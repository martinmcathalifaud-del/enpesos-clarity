import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, FileText, Info, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

const MIN_MONTO = 100000;
const MAX_MONTO = 5000000;
const DEFAULT_MONTO = 800000;
const FALLBACK_DOLAR = 950;

const TASA_ANUAL_CMF = 0.32;
const PLAZO_MESES = 12;
const COMISION_AVANCE = 0.05;
const TASA_AVANCE_ANUAL = 0.5;

function formatCLP(value: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${attr}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, name);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

const relatedLinks = [
  { label: 'Cupo en dólares a pesos', href: '/cupo-en-dolares-a-pesos-chilenos' },
  { label: 'Simulador de pago de tarjeta', href: '/simulador-pago-tarjeta-credito' },
  { label: 'Formas de financiamiento para personas', href: '/formas-de-financiamiento-para-personas-chile' },
  { label: 'Cuánto recibo por mi cupo', href: '/cuanto-recibo-por-mi-cupo-en-dolares' },
  { label: 'Deuda en dólares de la tarjeta', href: '/como-pagar-deuda-en-dolares-tarjeta-credito' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
];

const faqs = [
  {
    question: '¿Por qué EnPesos muestra un rango y no un número exacto?',
    answer:
      'Porque el monto final depende de tu cupo internacional disponible, el banco o emisor de tu tarjeta y el tipo de cambio del día en que cotizas. Mostrar un número único sin conocer esas variables podría generar una expectativa que después no se cumple. La forma responsable de conocer tu monto exacto es pedir una cotización real por WhatsApp.',
  },
  {
    question: '¿Qué es el cupo internacional de mi tarjeta?',
    answer:
      'Es un monto en dólares que muchos bancos y emisores aprueban dentro de la misma tarjeta de crédito, pensado originalmente para compras en el extranjero o en sitios que facturan en dólares. Muchas personas lo usan poco porque no viajan seguido, y queda disponible sin utilizarse.',
  },
  {
    question: '¿Necesito tener buen historial crediticio para usar EnPesos?',
    answer:
      'EnPesos no realiza una evaluación crediticia como la de un crédito de consumo nuevo. Lo que se revisa es tu cupo internacional disponible en la tarjeta que ya tienes. Aun así, cada caso se evalúa individualmente y no se garantiza un resultado.',
  },
  {
    question: '¿Qué pasa con mi tarjeta después de usar EnPesos?',
    answer:
      'Si decides avanzar y la operación se confirma, puede generarse un cargo en tu tarjeta en dólares, según las condiciones de tu banco o emisor: fecha de facturación, tipo de cambio aplicado, pago mínimo e intereses si no pagas el total. EnPesos no define esas condiciones.',
  },
  {
    question: '¿Es lo mismo que un avance en efectivo?',
    answer:
      'No. Un avance en efectivo es un producto que entrega directamente tu banco, usando cupo de tu tarjeta nacional, con comisión y una de las tasas más altas del mercado desde el primer día. EnPesos ayuda a cotizar una operación distinta, sobre el cupo internacional en dólares que ya tienes aprobado.',
  },
  {
    question: '¿Puedo usar EnPesos si estoy en DICOM?',
    answer:
      'A diferencia de un crédito de consumo, EnPesos no exige estar fuera de DICOM como requisito para cotizar, porque no es una evaluación crediticia nueva. Aun así, cada caso se revisa individualmente y el resultado depende de tu cupo internacional disponible y de tu banco o emisor.',
  },
];

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Calculadora de Crédito y Liquidez Chile | Compara opciones | EnPesos',
    description:
      'Calcula cuánto recibirías con un crédito de consumo, avance en efectivo o usando tu cupo en dólares. Compara costos reales antes de decidir.',
    url: 'https://www.enpesos.cl/calculadora-credito',
    isPartOf: {
      '@type': 'WebSite',
      name: 'EnPesos.cl',
      url: 'https://www.enpesos.cl',
    },
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

export default function CalculadoraCredito() {
  const [montoCLP, setMontoCLP] = useState(DEFAULT_MONTO);
  const [dolarObservado, setDolarObservado] = useState(FALLBACK_DOLAR);
  const [dolarDisponible, setDolarDisponible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchDolar() {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) throw new Error('Respuesta no exitosa');
        const data = await response.json();
        const clp = data?.rates?.CLP;
        if (!cancelled && typeof clp === 'number' && clp > 0) {
          setDolarObservado(clp);
          setDolarDisponible(true);
        }
      } catch {
        if (!cancelled) {
          setDolarObservado(FALLBACK_DOLAR);
          setDolarDisponible(false);
        }
      }
    }

    fetchDolar();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.title = 'Calculadora de Crédito y Liquidez Chile | Compara opciones | EnPesos';
    upsertMeta(
      'description',
      'Calcula cuánto recibirías con un crédito de consumo, avance en efectivo o usando tu cupo en dólares. Compara costos reales antes de decidir.',
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.enpesos.cl/calculadora-credito');

    const scriptId = 'ld-json-calculadora-credito';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      script?.remove();
    };
  }, []);

  const resultado = useMemo(() => {
    const recibeMinimo = montoCLP * 0.75;
    const recibeMaximo = montoCLP * 0.82;
    const montoUSD = montoCLP / dolarObservado;

    const tasaMensual = TASA_ANUAL_CMF / 12;
    const factor = Math.pow(1 + tasaMensual, PLAZO_MESES);
    const cuotaMensual = (montoCLP * (tasaMensual * factor)) / (factor - 1);
    const costoTotalCredito = cuotaMensual * PLAZO_MESES - montoCLP;

    const montoNetoAvance = montoCLP * (1 - COMISION_AVANCE);

    return {
      recibeMinimo,
      recibeMaximo,
      montoUSD,
      cuotaMensual,
      costoTotalCredito,
      montoNetoAvance,
    };
  }, [montoCLP, dolarObservado]);

  const handleMontoChange = (value: number) => {
    if (Number.isNaN(value)) {
      setMontoCLP(MIN_MONTO);
      return;
    }
    setMontoCLP(Math.min(MAX_MONTO, Math.max(MIN_MONTO, value)));
  };

  const whatsappMessage = `Hola, usé la calculadora de EnPesos y quiero cotizar para recibir ${formatCLP(montoCLP)} en pesos`;

  return (
    <>
      <Header />

      <section className="hero-gradient border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 text-center">
          <span className="inline-flex items-center rounded-full bg-primary-light px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
            Calculadora
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Calculadora de crédito y liquidez — compara tus opciones
          </h1>
          <p className="mt-4 text-base sm:text-lg text-secondary-foreground leading-relaxed max-w-2xl mx-auto">
            Ingresa cuánto necesitas y compara qué podrías recibir usando tu cupo en dólares frente a un crédito de
            consumo o un avance en efectivo. Los tres resultados son estimaciones referenciales.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-xl lg:p-8">
            <label htmlFor="monto-credito" className="text-sm font-extrabold uppercase tracking-[0.12em] text-secondary-foreground">
              ¿Cuánto necesitas en pesos chilenos?
            </label>

            <div className="mt-4 flex items-center rounded-2xl border border-border bg-secondary px-4 py-3">
              <span className="text-2xl font-black text-secondary-foreground mr-2">$</span>
              <input
                id="monto-credito"
                type="number"
                min={MIN_MONTO}
                max={MAX_MONTO}
                step={10000}
                value={montoCLP}
                onChange={(event) => handleMontoChange(Number(event.target.value))}
                className="w-full bg-transparent text-2xl font-black text-foreground outline-none"
              />
              <span className="ml-2 shrink-0 text-sm font-bold text-secondary-foreground">CLP</span>
            </div>

            <input
              type="range"
              min={MIN_MONTO}
              max={MAX_MONTO}
              step={10000}
              value={montoCLP}
              onChange={(event) => handleMontoChange(Number(event.target.value))}
              className="mt-5 w-full accent-primary"
            />
            <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
              <span>{formatCLP(MIN_MONTO)}</span>
              <span>{formatCLP(MAX_MONTO)}</span>
            </div>

            {!dolarDisponible && (
              <p className="mt-4 text-xs font-semibold text-amber-700">
                Valor referencial — tipo de cambio no disponible en este momento.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="rounded-3xl border border-primary/30 bg-background p-6 sm:p-8 card-shadow">
            <span className="inline-flex items-center rounded-full bg-primary-light px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-primary">
              Con tu cupo en dólares
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl font-black text-foreground">
              Con ese monto, podrías recibir en tu cuenta:
            </h2>
            <p className="mt-3 text-3xl sm:text-4xl font-black text-primary">
              {formatCLP(resultado.recibeMinimo)} – {formatCLP(resultado.recibeMaximo)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Equivalente aproximado a USD {resultado.montoUSD.toLocaleString('es-CL', { maximumFractionDigits: 0 })}, con dólar
              de referencia {formatCLP(dolarObservado)}.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-secondary p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-secondary-foreground">Tiempo</p>
                <p className="mt-1 text-sm font-bold text-foreground">Minutos en horario laboral</p>
              </div>
              <div className="rounded-2xl bg-secondary p-4">
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-secondary-foreground">Requisito</p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  Tener cupo internacional disponible en tu tarjeta de crédito
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-950 leading-relaxed">
                Puede generarse un cargo en tu tarjeta en dólares, según las condiciones de tu banco o emisor.
              </p>
            </div>

            <Button
              className="mt-6 w-full h-12 rounded-xl font-bold button-shadow"
              onClick={() => openWhatsApp('calculadora_credito_resultado', whatsappMessage)}
            >
              Cotiza gratis y ve tu número exacto
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-secondary-foreground text-center">
            Cómo se compara con otras alternativas
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-foreground text-center">
            Crédito de consumo y avance en efectivo
          </h2>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="rounded-3xl border border-border bg-card p-6 sm:p-7 card-shadow">
              <h3 className="text-lg font-black text-foreground">Crédito de consumo</h3>
              <p className="mt-2 text-2xl font-black text-foreground">{formatCLP(montoCLP)}</p>
              <p className="text-xs text-muted-foreground">Recibes el monto exacto solicitado</p>

              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary-foreground">Cuota mensual estimada (12 meses)</span>
                  <span className="font-bold text-foreground">{formatCLP(resultado.cuotaMensual)}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="text-secondary-foreground">Costo total estimado</span>
                  <span className="font-bold text-foreground">{formatCLP(resultado.costoTotalCredito)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Tiempo</span>
                  <span className="font-bold text-foreground">1–3 días hábiles</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.1em] text-secondary-foreground">Contras</p>
              <ul className="mt-2 grid gap-1.5 text-sm text-secondary-foreground">
                <li>• Requiere no estar en DICOM</li>
                <li>• Requiere demostrar capacidad de pago</li>
                <li>• Debes presentar liquidaciones de sueldo o declaración de renta</li>
                <li>• Historial de conducta de pago es determinante</li>
                <li>• Proceso de evaluación crediticia con el banco</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-border bg-card p-6 sm:p-7 card-shadow">
              <h3 className="text-lg font-black text-foreground">Avance en efectivo</h3>
              <p className="mt-2 text-2xl font-black text-foreground">{formatCLP(resultado.montoNetoAvance)}</p>
              <p className="text-xs text-muted-foreground">Monto neto, tras comisión promedio de mercado (~5%)</p>

              <div className="mt-4 grid gap-2 text-sm">
                <div className="border-b border-border pb-2">
                  <span className="text-secondary-foreground">Costo: </span>
                  <span className="font-bold text-foreground">Tasa máxima convencional (referencial ~{Math.round(TASA_AVANCE_ANUAL * 100)}% anual)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-foreground">Tiempo</span>
                  <span className="font-bold text-foreground">Inmediato</span>
                </div>
              </div>

              <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.1em] text-secondary-foreground">Contras</p>
              <ul className="mt-2 grid gap-1.5 text-sm text-secondary-foreground">
                <li>• Es la alternativa más cara disponible</li>
                <li>• Requiere cupo disponible en tarjeta de crédito nacional</li>
                <li>• Reduce el cupo disponible para otras compras</li>
                <li>• Monto máximo limitado al cupo libre disponible</li>
                <li>• Interés desde el primer día, sin período de gracia</li>
              </ul>
            </article>
          </div>

          <div className="mt-6 flex gap-3 rounded-2xl border border-border bg-secondary p-4">
            <Info className="w-5 h-5 text-secondary-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-secondary-foreground leading-relaxed">
              Los valores de crédito de consumo y avance en efectivo son referenciales, basados en tasas promedio de
              mercado. El resultado de EnPesos es un rango estimado — el monto exacto depende de tu cupo disponible,
              banco emisor y tipo de cambio del día. Cotizar no obliga a avanzar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-secondary-foreground text-center">
            Preguntas frecuentes
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-foreground text-center">
            Dudas comunes sobre la calculadora
          </h2>

          <div className="mt-8 grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-border bg-background p-5 open:card-shadow">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-foreground">
                  {faq.question}
                  <span className="text-primary text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-secondary-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="rounded-3xl bg-primary p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-primary-foreground">
              ¿Listo para ver tu número exacto?
            </h2>
            <p className="mt-3 text-primary-foreground/90 max-w-xl mx-auto">
              Escríbenos por WhatsApp y cotiza tu caso con costo claro antes de decidir. Cotizar no te obliga a
              avanzar.
            </p>
            <Button
              variant="secondary"
              className="mt-6 h-12 rounded-xl px-8 font-bold button-shadow"
              onClick={() => openWhatsApp('calculadora_credito_cta_final', whatsappMessage)}
            >
              Cotiza gratis por WhatsApp
              <MessageCircle className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-card p-7 sm:p-10">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Guías relacionadas</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedLinks.map((link) => (
                <a key={link.href} href={link.href} className="rounded-2xl border border-border bg-background p-5 hover:border-primary/40 hover:bg-primary-light transition-colors">
                  <p className="font-extrabold text-foreground">{link.label}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
