import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Calculator, CreditCard, HelpCircle, Info, MessageCircle, Pencil, ShieldCheck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/lib/whatsapp';

type PaymentMode = 'full' | 'reference' | 'fixed' | 'target';

type ScheduleRow = {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

type SimulationResult = {
  months: number;
  totalPaid: number;
  totalInterest: number;
  monthlyPayment: number;
  schedule: ScheduleRow[];
  warning: string;
  doesNotAmortize: boolean;
};

const quickAmounts = [500, 1000, 1500, 2000];

const paymentModes: Array<{ id: PaymentMode; title: string; description: string }> = [
  {
    id: 'reference',
    title: 'Mantener pago mensual referencial',
    description: 'Calcula un primer pago estimado y simula mantener ese mismo monto todos los meses.',
  },
  {
    id: 'fixed',
    title: 'Pago fijo mensual',
    description: 'Define tú cuánto podrías pagar cada mes.',
  },
  {
    id: 'target',
    title: 'Pagar en X meses',
    description: 'Calcula el pago mensual estimado para terminar en un plazo objetivo.',
  },
  {
    id: 'full',
    title: 'Pagar total facturado',
    description: 'Simula pagar todo en el primer vencimiento.',
  },
];

const deepDiveSections = [
  {
    heading: 'Qué simula exactamente esta herramienta',
    paragraphs: [
      'El simulador calcula, a partir de supuestos que tú defines, cuántos meses podrías tardar en pagar un monto de tarjeta si mantienes un pago mensual parecido al primero, defines un pago fijo o eliges un plazo objetivo. Usa un monto inicial en dólares convertido a pesos, un dólar de referencia y una tasa mensual, todos editables.',
      'No es una cotización ni un cálculo oficial de tu banco o emisor. Es una herramienta referencial para que veas el escenario completo de pago antes de decidir, no solo cuánto podrías recibir hoy.',
    ],
  },
  {
    heading: 'Para qué sirve entender los escenarios de pago posterior',
    paragraphs: [
      'Muchas personas miran solo el monto que podrían recibir hoy y no revisan cuánto tiempo o cuánto interés total podría tomar pagar después. Los distintos escenarios del simulador —pago referencial, pago fijo, plazo objetivo o pago total— muestran cómo cambia el tiempo y el costo total según la decisión de pago que tomes.',
      'Comparar escenarios antes de decidir ayuda a entender si tu presupuesto puede asumir el pago mensual estimado, sin comprometerte a un plazo que después no puedas cumplir.',
    ],
  },
  {
    heading: 'Cómo se relaciona esto con la deuda que puede generarse al usar cupo internacional',
    paragraphs: [
      'Si decides avanzar y cotizas una operación usando el cupo internacional disponible de tu tarjeta, y la operación se confirma, puede generarse un cargo o deuda posterior en tu tarjeta de crédito, según las condiciones de tu banco o emisor. El simulador te ayuda a estimar cómo podría verse ese pago en el tiempo, con distintos supuestos de tasa y pago mensual.',
      'El simulador no reemplaza la información oficial de tu banco o emisor sobre fecha de facturación, tipo de cambio, pago mínimo o intereses reales aplicados a tu tarjeta. Esos datos siempre debes confirmarlos directamente con tu banco o emisor.',
    ],
  },
  {
    heading: 'Qué supuestos puedes ajustar',
    paragraphs: [
      'Puedes cambiar el monto en dólares a simular, el dólar de referencia, el porcentaje de pago referencial y la tasa mensual estimada. Cada ajuste cambia el resultado, por lo que conviene probar más de un escenario antes de sacar conclusiones.',
      'El resultado siempre es una estimación con los supuestos que tú ingresaste, no una proyección exacta de lo que facturará tu banco o emisor.',
    ],
  },
  {
    heading: 'Qué hacer después de simular',
    paragraphs: [
      'Si el escenario simulado te ayuda a entender que podrías asumir el pago posterior, puedes solicitar una cotización real por WhatsApp para revisar cuánto podrías recibir en pesos, el costo y las condiciones antes de decidir. Cotizar no te obliga a avanzar.',
      'Si el escenario simulado muestra un pago que no podrías asumir, lo responsable es no avanzar con la operación y revisar otras alternativas.',
    ],
  },
];

const faqs = [
  {
    question: '¿Esta simulación es una cotización real?',
    answer: 'No. La simulación usa supuestos que tú defines, como dólar referencial y tasa mensual estimada. No reemplaza la información oficial de tu banco o emisor ni una cotización real de EnPesos.',
  },
  {
    question: '¿Qué escenarios puedo simular?',
    answer: 'Puedes simular mantener un pago mensual referencial, definir un pago fijo mensual, elegir un plazo objetivo en meses o pagar el total facturado de una vez.',
  },
  {
    question: '¿El simulador me dice cuánto voy a pagar de verdad?',
    answer: 'No exactamente. El resultado depende de los supuestos que ingreses. El pago, la tasa, el tipo de cambio y la fecha de facturación reales dependen de las condiciones de tu banco o emisor.',
  },
  {
    question: '¿Simular me obliga a cotizar con EnPesos?',
    answer: 'No. Puedes usar el simulador solo para entender escenarios de pago, sin que eso te obligue a pedir una cotización ni a avanzar con una operación.',
  },
  {
    question: '¿Qué pasa si uso mi cupo internacional y no pago el total facturado?',
    answer: 'Si no pagas el total facturado, pueden aplicarse pago mínimo, intereses u otros cargos definidos por tu banco o emisor, según las condiciones de tu tarjeta.',
  },
];

const formatCLP = (value: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const formatNumber = (value: number) =>
  new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));

function simulateFixedPayment(initialAmount: number, monthlyRate: number, monthlyPayment: number): SimulationResult {
  let balance = initialAmount;
  let totalPaid = 0;
  let totalInterest = 0;
  const schedule: ScheduleRow[] = [];
  const maxMonths = 360;

  if (initialAmount <= 0) {
    return { months: 0, totalPaid: 0, totalInterest: 0, monthlyPayment: 0, schedule, warning: '', doesNotAmortize: false };
  }

  if (monthlyPayment <= 0) {
    return {
      months: 0,
      totalPaid: 0,
      totalInterest: 0,
      monthlyPayment: 0,
      schedule,
      warning: 'Ingresa un pago mensual mayor a cero para poder simular.',
      doesNotAmortize: true,
    };
  }

  const firstMonthInterest = balance * monthlyRate;

  if (monthlyRate > 0 && monthlyPayment <= firstMonthInterest) {
    return {
      months: 0,
      totalPaid: 0,
      totalInterest: 0,
      monthlyPayment,
      schedule,
      warning: `Con estos supuestos, el interés estimado del primer mes sería ${formatCLP(firstMonthInterest)}. Tu pago mensual no alcanza a cubrir ese interés, por eso la deuda no baja. Prueba con un pago mayor o usa el pago referencial.`,
      doesNotAmortize: true,
    };
  }

  for (let month = 1; month <= maxMonths && balance > 1; month += 1) {
    const interest = balance * monthlyRate;
    const amountDue = balance + interest;
    const payment = Math.min(monthlyPayment, amountDue);
    const principal = Math.max(0, payment - interest);

    balance = Math.max(0, amountDue - payment);
    totalPaid += payment;
    totalInterest += interest;

    schedule.push({ month, payment, interest, principal, balance });
  }

  return {
    months: schedule.length,
    totalPaid,
    totalInterest,
    monthlyPayment,
    schedule,
    warning: schedule.length >= maxMonths ? 'La simulación superó 360 meses. Prueba aumentar el pago mensual.' : '',
    doesNotAmortize: false,
  };
}

function calculateTargetPayment(initialAmount: number, monthlyRate: number, targetMonths: number) {
  if (targetMonths <= 0) return 0;
  if (monthlyRate === 0) return initialAmount / targetMonths;
  return (initialAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -targetMonths));
}

export default function SimuladorPagoTarjeta() {
  const [usdAmount, setUsdAmount] = useState(1000);
  const [dollarRate, setDollarRate] = useState(950);
  const [referencePercent, setReferencePercent] = useState(5);
  const [monthlyRatePercent, setMonthlyRatePercent] = useState(2.8);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('reference');
  const [fixedPayment, setFixedPayment] = useState(100000);
  const [targetMonths, setTargetMonths] = useState(6);
  const [showAssumptions, setShowAssumptions] = useState(false);

  useEffect(() => {
    document.title = 'Simulador de pago de tarjeta de crédito | EnPesos.cl';

    const metaDescription = 'Simula cuánto podrías demorar en pagar una tarjeta si mantienes un pago mensual referencial, pagas un monto fijo o defines un plazo objetivo.';
    const canonicalUrl = 'https://www.enpesos.cl/simulador-pago-tarjeta-credito';

    const upsertMeta = (selector: string, attributes: Record<string, string>) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        element = selector.startsWith('link') ? document.createElement('link') : document.createElement('meta');
        document.head.appendChild(element);
      }
      Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    };

    upsertMeta('meta[name="description"]', { name: 'description', content: metaDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: 'Simulador de pago de tarjeta de crédito | EnPesos.cl' });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: metaDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });

    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Simulador de pago de tarjeta de crédito',
        description: metaDescription,
        url: canonicalUrl,
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

    let script = document.getElementById('ld-json-simulador-pago-tarjeta') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-json-simulador-pago-tarjeta';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      document.getElementById('ld-json-simulador-pago-tarjeta')?.remove();
    };
  }, []);

  const monthlyRate = Math.max(monthlyRatePercent, 0) / 100;
  const initialAmount = Math.max(usdAmount, 0) * Math.max(dollarRate, 0);
  const referencePayment = initialAmount * (Math.max(referencePercent, 0) / 100);

  const result = useMemo(() => {
    if (paymentMode === 'full') {
      return {
        months: initialAmount > 0 ? 1 : 0,
        totalPaid: initialAmount,
        totalInterest: 0,
        monthlyPayment: initialAmount,
        schedule: initialAmount > 0 ? [{ month: 1, payment: initialAmount, interest: 0, principal: initialAmount, balance: 0 }] : [],
        warning: '',
        doesNotAmortize: false,
      };
    }

    if (paymentMode === 'reference') {
      return simulateFixedPayment(initialAmount, monthlyRate, referencePayment);
    }

    if (paymentMode === 'target') {
      const payment = calculateTargetPayment(initialAmount, monthlyRate, Math.max(targetMonths, 1));
      return simulateFixedPayment(initialAmount, monthlyRate, payment);
    }

    return simulateFixedPayment(initialAmount, monthlyRate, Math.max(fixedPayment, 0));
  }, [fixedPayment, initialAmount, monthlyRate, paymentMode, referencePayment, targetMonths]);

  const displayedSchedule = result.schedule.length > 12
    ? [...result.schedule.slice(0, 12), result.schedule[result.schedule.length - 1]]
    : result.schedule;
  const timeLabel = result.doesNotAmortize ? 'No amortiza' : `${result.months} meses`;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section id="inicio" className="hero-gradient py-14 sm:py-18 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-14 items-start">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-4 py-2 text-sm font-bold text-primary mb-5">
                  <Calculator className="w-4 h-4" />
                  Herramienta referencial
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight mb-6">
                  Simula cuánto podrías demorar en pagar tu tarjeta
                </h1>

                <p className="text-lg sm:text-xl text-secondary-foreground leading-relaxed max-w-2xl mb-7">
                  No mires solo cuánto podrías recibir hoy. Simula qué pasa después si mantienes un pago mensual parecido al primer monto referencial, pagas un monto fijo o liquidas todo.
                </p>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 mb-7">
                  <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                    <p>
                      Esta calculadora usa supuestos referenciales. No replica exactamente tu cartola, pero ayuda a mirar el escenario completo antes de decidir.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#simulador"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-7 text-base font-bold text-primary-foreground button-shadow hover:bg-primary-hover transition-colors"
                  >
                    Usar simulador
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <Button variant="outline" className="h-12 rounded-xl px-7 text-base font-bold" onClick={() => openWhatsApp('simulador_pago_tarjeta_hero')}>
                    Cotizar por WhatsApp
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <aside className="rounded-3xl border border-border bg-background p-6 sm:p-8 card-shadow">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Escenario inicial</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-5">
                  Parte con un ejemplo simple y ajusta lo que quieras
                </h2>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-secondary p-4">
                    <p className="text-sm font-bold text-foreground mb-1">Monto de ejemplo</p>
                    <p className="text-sm text-secondary-foreground">Parte en USD 1.000 para ver rápido un caso típico. Puedes cambiarlo por el monto que quieres evaluar.</p>
                  </div>
                  <div className="rounded-2xl bg-primary-light p-4">
                    <p className="text-sm font-bold text-foreground mb-1">Pago mensual de referencia</p>
                    <p className="text-sm text-secondary-foreground">Estimamos un primer pago y simulamos mantenerlo todos los meses, para que el plazo sea fácil de entender.</p>
                  </div>
                  <div className="rounded-2xl bg-secondary p-4">
                    <p className="text-sm font-bold text-foreground mb-1">Supuestos editables</p>
                    <p className="text-sm text-secondary-foreground">Puedes ajustar dólar, porcentaje referencial y tasa mensual si quieres probar otro escenario.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="simulador" className="py-14 sm:py-18 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 card-shadow">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Simulador</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-6">Ingresa el monto y elige cómo pagarías</h2>

                <div className="space-y-7">
                  <div>
                    <label className="text-sm font-extrabold text-foreground mb-3 block">Monto a simular</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {quickAmounts.map((amount) => (
                        <button key={amount} type="button" onClick={() => setUsdAmount(amount)} className={`rounded-xl border px-3 py-3 text-sm font-extrabold transition-colors ${usdAmount === amount ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:border-primary/40'}`}>
                          USD {formatNumber(amount)}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                      <span className="text-sm font-bold text-muted-foreground">USD</span>
                      <input type="number" min="0" value={usdAmount} onChange={(event) => setUsdAmount(Number(event.target.value))} className="w-full bg-transparent text-lg font-extrabold text-foreground outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-extrabold text-foreground mb-3 block">Forma de pago</label>
                    <div className="grid gap-3">
                      {paymentModes.map((mode) => (
                        <button key={mode.id} type="button" onClick={() => setPaymentMode(mode.id)} className={`rounded-2xl border p-4 text-left transition-all ${paymentMode === mode.id ? 'border-primary bg-primary-light' : 'border-border bg-background hover:border-primary/40'}`}>
                          <span className="block text-base font-extrabold text-foreground mb-1">{mode.title}</span>
                          <span className="block text-sm text-secondary-foreground leading-relaxed">{mode.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMode === 'fixed' && (
                    <div>
                      <label className="text-sm font-extrabold text-foreground mb-3 block">Pago fijo mensual</label>
                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                        <span className="text-sm font-bold text-muted-foreground">CLP</span>
                        <input type="number" min="0" value={fixedPayment} onChange={(event) => setFixedPayment(Number(event.target.value))} className="w-full bg-transparent text-lg font-extrabold text-foreground outline-none" />
                      </div>
                      <button type="button" onClick={() => setFixedPayment(Math.round(referencePayment))} className="mt-2 text-xs font-extrabold text-primary hover:text-primary-hover transition-colors">
                        Usar pago referencial: {formatCLP(referencePayment)}
                      </button>
                    </div>
                  )}

                  {paymentMode === 'target' && (
                    <div>
                      <label className="text-sm font-extrabold text-foreground mb-3 block">Quiero terminar de pagar en</label>
                      <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                        <input type="number" min="1" value={targetMonths} onChange={(event) => setTargetMonths(Number(event.target.value))} className="w-full bg-transparent text-lg font-extrabold text-foreground outline-none" />
                        <span className="text-sm font-bold text-muted-foreground">meses</span>
                      </div>
                    </div>
                  )}

                  <button type="button" onClick={() => setShowAssumptions((current) => !current)} className="inline-flex items-center gap-2 text-sm font-extrabold text-primary hover:text-primary-hover transition-colors">
                    <Pencil className="w-4 h-4" />
                    {showAssumptions ? 'Ocultar supuestos' : 'Editar supuestos'}
                  </button>

                  {showAssumptions && (
                    <div className="grid sm:grid-cols-3 gap-3 rounded-3xl border border-border bg-background p-4">
                      <div>
                        <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground mb-2 block">Dólar ref.</label>
                        <input type="number" min="0" value={dollarRate} onChange={(event) => setDollarRate(Number(event.target.value))} className="w-full rounded-xl border border-border bg-card px-3 py-3 font-bold text-foreground outline-none focus:border-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground mb-2 block">Referencia %</label>
                        <input type="number" min="0" step="0.1" value={referencePercent} onChange={(event) => setReferencePercent(Number(event.target.value))} className="w-full rounded-xl border border-border bg-card px-3 py-3 font-bold text-foreground outline-none focus:border-primary" />
                      </div>
                      <div>
                        <label className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground mb-2 block">Tasa mensual %</label>
                        <input type="number" min="0" step="0.1" value={monthlyRatePercent} onChange={(event) => setMonthlyRatePercent(Number(event.target.value))} className="w-full rounded-xl border border-border bg-card px-3 py-3 font-bold text-foreground outline-none focus:border-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 card-shadow">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Resultado estimado</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-6">Escenario calculado</h2>

                  <div className="grid sm:grid-cols-2 gap-3 mb-5">
                    <div className="rounded-2xl bg-secondary p-4">
                      <p className="text-sm text-muted-foreground mb-1">Monto simulado</p>
                      <p className="text-2xl font-extrabold text-foreground">{formatCLP(initialAmount)}</p>
                    </div>
                    <div className="rounded-2xl bg-secondary p-4">
                      <p className="text-sm text-muted-foreground mb-1">Tiempo estimado</p>
                      <p className="text-2xl font-extrabold text-foreground">{timeLabel}</p>
                    </div>
                    <div className="rounded-2xl bg-primary-light p-4">
                      <p className="text-sm text-muted-foreground mb-1">Pago mensual usado</p>
                      <p className="text-2xl font-extrabold text-foreground">{formatCLP(result.monthlyPayment)}</p>
                    </div>
                    <div className="rounded-2xl bg-primary-light p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total estimado pagado</p>
                      <p className="text-2xl font-extrabold text-foreground">{result.doesNotAmortize ? 'No aplica' : formatCLP(result.totalPaid)}</p>
                    </div>
                  </div>

                  {!result.doesNotAmortize && (
                    <div className="rounded-2xl border border-primary/20 bg-background p-4 mb-4">
                      <div className="flex gap-3">
                        <Info className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <h3 className="font-extrabold text-foreground mb-2">Si financias el saldo de tu tarjeta</h3>
                          <p className="text-sm text-secondary-foreground leading-relaxed">
                            Si no pagas el total facturado y decides financiar el saldo de tu tarjeta, el interés estimado que podrías pagar es de aproximadamente <strong>{formatCLP(result.totalInterest)}</strong>, según los supuestos actuales.
                          </p>
                          <p className="mt-3 rounded-xl bg-primary-light px-3 py-2 text-xs font-bold text-secondary-foreground">
                            Importante: esto no es un cobro de EnPesos. Es una estimación referencial de intereses de tu tarjeta.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMode === 'reference' && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 mb-4">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                        <p>Este escenario mantiene fijo el primer pago referencial ({formatCLP(referencePayment)}) durante todos los meses. Es una simplificación para entender el plazo.</p>
                      </div>
                    </div>
                  )}

                  {result.warning && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-950 mb-4">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                        <p>{result.warning}</p>
                      </div>
                    </div>
                  )}

                  <Button className="h-13 w-full rounded-xl px-7 text-base sm:text-lg font-extrabold button-shadow" onClick={() => openWhatsApp('simulador_pago_tarjeta_resultado')}>
                    ¿Cuánto podrías recibir?
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <p className="mt-3 text-center text-sm text-secondary-foreground">Recibe una estimación antes de decidir.</p>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 sm:p-7">
                  <div className="flex items-start gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <div>
                      <h3 className="text-xl font-extrabold text-foreground mb-2">Supuestos usados</h3>
                      <p className="text-sm text-secondary-foreground leading-relaxed">Dólar referencial: {formatCLP(dollarRate)} · Pago referencial: {referencePercent}% del monto inicial ({formatCLP(referencePayment)}) · Tasa mensual: {monthlyRatePercent}%.</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">La simulación no es una cotización, no es información oficial del emisor y no reemplaza la revisión de tu cartola o contrato.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {displayedSchedule.length > 0 && (
          <section className="py-14 sm:py-18 bg-secondary">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl border border-border bg-background p-6 sm:p-7 card-shadow overflow-hidden">
                <div className="mb-6">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Detalle referencial</p>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Cómo va bajando la deuda</h2>
                  <p className="text-sm text-secondary-foreground mt-2">Mostramos los primeros 12 meses y, si el plazo es mayor, agregamos el mes final para ver cuándo queda en cero.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="py-3 pr-4 font-extrabold">Mes</th>
                        <th className="py-3 pr-4 font-extrabold">Pago mensual</th>
                        <th className="py-3 pr-4 font-extrabold">Disminuye deuda</th>
                        <th className="py-3 pr-4 font-extrabold">Saldo después</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedSchedule.map((row, index) => (
                        <tr key={row.month === result.schedule[result.schedule.length - 1]?.month && index > 0 ? `final-${row.month}` : row.month} className="border-b border-border/70">
                          <td className="py-3 pr-4 font-bold text-foreground">{index === displayedSchedule.length - 1 && result.schedule.length > 12 ? `${row.month} (final)` : row.month}</td>
                          <td className="py-3 pr-4 text-secondary-foreground">{formatCLP(row.payment)}</td>
                          <td className="py-3 pr-4 text-secondary-foreground">{formatCLP(row.principal)}</td>
                          <td className="py-3 pr-4 text-secondary-foreground">{formatCLP(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {result.schedule.length > 12 && <p className="text-xs text-muted-foreground mt-4">El resultado total considera la simulación completa, aunque el detalle muestre solo los primeros meses y el cierre.</p>}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">A fondo</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Cómo usar el simulador antes de cotizar</h2>
            </div>
            <div className="grid gap-5">
              {deepDiveSections.map((item) => (
                <article key={item.heading} className="rounded-3xl border border-border bg-background p-6 sm:p-7 card-shadow">
                  <h3 className="text-xl font-extrabold text-foreground mb-3">{item.heading}</h3>
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-secondary-foreground leading-relaxed mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-18 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <HelpCircle className="mx-auto mb-4 h-9 w-9 text-primary" />
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Preguntas frecuentes</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Dudas sobre el simulador de pago</h2>
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

        <section className="py-14 sm:py-18 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 text-center card-shadow">
              <CreditCard className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">¿Quieres mirar el monto neto antes de decidir?</h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto mb-7">Puedes cotizar por WhatsApp y revisar el monto estimado en pesos antes de avanzar. La simulación de pago posterior es solo una referencia para mirar el escenario completo.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('simulador_pago_tarjeta_footer')}>
                  ¿Cuánto podrías recibir?
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <a href="/como-pagar-deuda-en-dolares-tarjeta-credito" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-7 text-base font-bold text-foreground hover:border-primary/40 hover:text-primary transition-colors">Leer guía de pago posterior</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
