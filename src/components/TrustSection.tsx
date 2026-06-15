import { FileCheck2, Headphones, HelpCircle, ShieldCheck, UserRoundCheck } from 'lucide-react';

const supportItems = [
  { icon: UserRoundCheck, label: 'Atención humana' },
  { icon: HelpCircle, label: 'Resolución de dudas' },
  { icon: FileCheck2, label: 'Cotización clara' },
  { icon: ShieldCheck, label: 'Acompañamiento durante el proceso' },
];

// Foto temporal. Después la puedes cambiar en Lovable o reemplazar por una imagen propia.
const supportPhotoUrl =
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85';

export default function TrustSection() {
  return (
    <section id="seguridad" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0 items-stretch rounded-3xl border border-border bg-card card-shadow overflow-hidden">
          
          {/* Bloque visual con foto */}
          <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] bg-primary-light overflow-hidden">
            <img
              src={supportPhotoUrl}
              alt="Ejecutiva de EnPesos atendiendo a un cliente"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-white/78 via-white/26 to-transparent" />

            <div className="absolute inset-x-5 bottom-5 sm:left-8 sm:right-auto sm:bottom-8 w-auto sm:w-[390px] rounded-3xl bg-white/95 backdrop-blur border border-border p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                  <Headphones className="w-7 h-7" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Ejecutivo EnPesos</p>
                  <h3 className="text-xl font-extrabold text-foreground">
                    Atención asistida
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm sm:text-base text-secondary-foreground leading-relaxed">
                  Revisamos tu caso y resolvemos tus dudas antes de avanzar.
                </div>

                <div className="rounded-2xl rounded-tr-sm bg-primary text-primary-foreground px-4 py-3 text-sm sm:text-base sm:ml-8 leading-relaxed">
                  Te enviamos una cotización clara por escrito.
                </div>
              </div>
            </div>
          </div>

          {/* Bloque de texto */}
          <div className="p-6 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-5 tracking-tight leading-tight">
              Atención humana durante el proceso
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8 sm:mb-10">
              Un ejecutivo te orienta, revisa tu caso, responde tus dudas, te entrega una cotización clara y te acompaña durante la coordinación del proceso.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {supportItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-background px-5 py-4 min-h-[82px]"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-light flex shrink-0 items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>

                  <span className="font-bold text-foreground leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}