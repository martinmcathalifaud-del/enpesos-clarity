import { ShieldCheck, KeyRound, MessageSquareOff, FileText, Wallet, UserCheck, FileCheck2 } from 'lucide-react';

const securityCards = [
  {
    icon: KeyRound,
    title: 'No pedimos claves bancarias',
    text: 'Nunca solicitamos acceso a tu banco ni contraseñas.',
  },
  {
    icon: MessageSquareOff,
    title: 'No pedimos CVV por WhatsApp',
    text: 'El pago se realiza por canales seguros, no por mensajes informales.',
  },
  {
    icon: FileText,
    title: 'Cotización escrita',
    text: 'Antes de avanzar, recibes el detalle referencial de la operación.',
  },
  {
    icon: Wallet,
    title: 'Cuenta bancaria propia',
    text: 'La transferencia se realiza a una cuenta chilena a nombre del cliente.',
  },
  {
    icon: UserCheck,
    title: 'Proceso asistido',
    text: 'Un ejecutivo guía la operación y valida la información necesaria.',
  },
  {
    icon: FileCheck2,
    title: 'Respaldo de operación',
    text: 'La operación queda documentada para mayor claridad y trazabilidad.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-light mb-4">
            <ShieldCheck className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Seguridad y respaldo en cada operación
          </h2>
          <p className="text-lg text-muted-foreground">
            En EnPesos cada cotización se revisa previamente, se informa por escrito y se acompaña con atención humana durante el proceso.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityCards.map((card, i) => (
            <div
              key={i}
              className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-primary-light mb-4">
                <card.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
