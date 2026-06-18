import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Calculator, CreditCard, MessageCircle, Pencil, ShieldCheck } from 'lucide-react';
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
      warning: `Ese pago mensual no alcanza a disminuir la deuda: el interés estimado del primer mes sería ${formatCLP(firstMonthInterest)}. Sube el pago mensual o usa el pago referencial.`,
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

  const interestVsAmount = initialAmount > 0 ? (result.totalInterest / initialAmount) * 100 : 0;
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
                      <p className="text-sm text-muted-foreground mb-1">Costo financiero estimado</p>
                      <p className="text-2xl font-extrabold text-foreground">{result.doesNotAmortize ? 'No aplica' : formatCLP(result.totalInterest)}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-background p-4 mb-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total estimado pagado</p>
                        <p className="text-3xl font-extrabold text-foreground">{result.doesNotAmortize ? 'No aplica' : formatCLP(result.totalPaid)}</p>
                      </div>
                      <div className="text-sm text-secondary-foreground">
                        {result.doesNotAmortize ? 'Con este pago mensual, la deuda no disminuye en la simulación.' : <>Costo financiero equivalente a aprox. <strong>{interestVsAmount.toFixed(1)}%</strong> del monto simulado.</>}
                      </div>
                    </div>
                  </div>

                  {paymentMode === 'reference' && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 mb-5">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                        <p>Este escenario mantiene fijo el primer pago referencial ({formatCLP(referencePayment)}) durante todos los meses. Es una simplificación para entender el plazo.</p>
                      </div>
                    </div>
                  )}

                  {result.warning && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-950">
                      <div className="flex gap-3">
                        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
                        <p>{result.warning}</p>
                      </div>
                    </div>
                  )}
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
                        <>
                          {index === 12 && row.month > 13 && (
                            <tr key="separator" className="border-b border-border/70">
                              <td className="py-3 pr-4 text-muted-foreground" colSpan={4}>… meses intermedios omitidos para simplificar</td>
                            </tr>
                          )}
                          <tr key={row.month} className="border-b border-border/70">
                            <td className="py-3 pr-4 font-bold text-foreground">{row.month}</td>
                            <td className="py-3 pr-4 text-secondary-foreground">{formatCLP(row.payment)}</td>
                            <td className="py-3 pr-4 text-secondary-foreground">{formatCLP(row.principal)}</td>
                            <td className="py-3 pr-4 text-secondary-foreground">{formatCLP(row.balance)}</td>
                          </tr>
                        </>
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
            <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 text-center card-shadow">
              <CreditCard className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">¿Quieres mirar el monto neto antes de decidir?</h2>
              <p className="text-lg text-secondary-foreground leading-relaxed max-w-3xl mx-auto mb-7">Puedes cotizar por WhatsApp y revisar el monto estimado en pesos antes de avanzar. La simulación de pago posterior es solo una referencia para mirar el escenario completo.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button className="h-12 rounded-xl px-7 text-base font-bold button-shadow" onClick={() => openWhatsApp('simulador_pago_tarjeta_footer')}>
                  Cotizar por WhatsApp
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
