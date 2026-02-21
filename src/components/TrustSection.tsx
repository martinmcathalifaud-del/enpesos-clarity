import { ShieldCheck, UserCheck, MessageCircle, ClipboardCheck } from 'lucide-react';

const trustPoints = [
  { icon: UserCheck, text: 'Validación de identidad del titular antes de operar' },
  { icon: ShieldCheck, text: 'Transferencia solo al titular de la tarjeta (mismo RUT)' },
  { icon: ClipboardCheck, text: 'Confirmación manual con un ejecutivo antes de cada operación' },
  { icon: MessageCircle, text: 'Comunicación directa por WhatsApp durante todo el proceso' },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">
          Confianza y seguridad en cada operación
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {trustPoints.map((point, i) => (
            <div key={i} className="flex items-start space-x-4 bg-card rounded-xl p-5 card-shadow">
              <point.icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-foreground">{point.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
