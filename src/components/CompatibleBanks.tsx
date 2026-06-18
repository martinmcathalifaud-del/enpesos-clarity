import { CreditCard, ShieldCheck } from 'lucide-react';

const banks = [
  { name: 'BancoEstado', className: 'text-red-600' },
  { name: 'Banco de Chile', className: 'font-serif text-blue-950' },
  { name: 'Santander', className: 'text-red-600' },
  { name: 'BCI', className: 'text-slate-800' },
  { name: 'Itaú', className: 'text-orange-600' },
  { name: 'Scotiabank', className: 'text-red-600' },
  { name: 'Banco Falabella', className: 'text-green-700' },
  { name: 'CMR Falabella', className: 'text-green-700' },
  { name: 'Banco Ripley', className: 'text-purple-700' },
  { name: 'Cencosud Scotiabank', className: 'text-red-700' },
  { name: 'Líder BCI', className: 'text-blue-700' },
  { name: 'Banco BICE', className: 'text-blue-900' },
  { name: 'Banco Security', className: 'text-slate-700' },
  { name: 'Consorcio', className: 'text-blue-800' },
  { name: 'Tenpo', className: 'text-violet-700' },
  { name: 'MACH BCI', className: 'text-blue-700' },
  { name: 'Mercado Pago', className: 'text-sky-700' },
  { name: 'VISA', className: 'text-blue-700 tracking-wide' },
  { name: 'Mastercard', className: 'text-slate-700' },
  { name: 'American Express', className: 'text-blue-800' },
];

export default function CompatibleBanks() {
  return (
    <section id="bancos" className="py-12 sm:py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-light mb-4">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Bancos y tarjetas que podemos revisar
          </h2>
          <p className="text-muted-foreground text-lg">
            Puedes consultar por tarjetas de crédito emitidas por bancos, casas comerciales, fintech y emisores digitales en Chile. La compatibilidad final depende de la validación del caso, el cupo internacional disponible y las condiciones de tu tarjeta.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 card-shadow">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {banks.map((bank) => (
              <div
                key={bank.name}
                className="h-16 rounded-2xl border border-border bg-background flex items-center justify-center px-3 text-center"
              >
                <span className={`text-sm sm:text-base font-extrabold ${bank.className}`}>{bank.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-center gap-2 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>La compatibilidad se confirma durante la cotización.</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-3xl">
              EnPesos no está afiliado, asociado ni patrocinado por estos bancos, emisores, fintech o marcas. La mención es referencial para orientar la consulta del usuario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
