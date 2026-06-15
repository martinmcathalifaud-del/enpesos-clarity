import { CreditCard, ShieldCheck } from 'lucide-react';

const banks = [
  { name: 'Banco de Chile', className: 'font-serif text-blue-950' },
  { name: 'Santander', className: 'text-red-600' },
  { name: 'BCI', className: 'text-slate-800' },
  { name: 'Itaú', className: 'text-orange-600' },
  { name: 'Scotiabank', className: 'text-red-600' },
  { name: 'VISA', className: 'text-blue-700 tracking-wide' },
  { name: 'Mastercard', className: 'text-slate-700' },
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
            Bancos y tarjetas disponibles
          </h2>
          <p className="text-muted-foreground text-lg">
            Puedes cotizar con tarjetas de crédito emitidas por bancos y marcas compatibles. La disponibilidad final depende de validación del caso y condiciones de tu tarjeta.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 sm:p-7 card-shadow">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {banks.map((bank) => (
              <div
                key={bank.name}
                className="h-16 rounded-2xl border border-border bg-background flex items-center justify-center px-3 text-center"
              >
                <span className={`text-base sm:text-lg font-extrabold ${bank.className}`}>{bank.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col items-center gap-2 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>La compatibilidad se confirma durante la cotización.</span>
            </div>
            <p className="text-xs text-muted-foreground max-w-3xl">
              EnPesos no está afiliado, asociado ni patrocinado por estos bancos, emisores o marcas. La mención es referencial para orientar la consulta del usuario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
