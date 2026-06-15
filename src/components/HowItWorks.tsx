import { Calculator, ChevronRight, FileSearch, Handshake, LockKeyhole, MessageCircle } from 'lucide-react';

const steps = [
  {
    icon: MessageCircle,
    title: 'Nos escribes por WhatsApp',
  },
  {
    icon: FileSearch,
    title: 'Revisamos tu caso y te cotizamos',
  },
  {
    icon: Calculator,
    title: 'Te mostramos monto, costo y condiciones',
  },
  {
    icon: Handshake,
    title: 'Si aceptas, coordinamos la operación',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">Cómo funciona</h2>
        </div>

        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          {steps.map((step, index) => (
            <div key={step.title} className="contents">
              <div className="rounded-2xl border border-border bg-card p-6 text-center card-shadow hover:card-shadow-hover transition-shadow">
                <div className="inline-flex w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-extrabold items-center justify-center mb-4">
                  {index + 1}
                </div>
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-bold text-foreground leading-snug">{step.title}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center text-muted-foreground">
                  <ChevronRight className="w-7 h-7" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <LockKeyhole className="w-4 h-4" />
          <span>Siempre decides después de ver la cotización.</span>
        </div>
      </div>
    </section>
  );
}
