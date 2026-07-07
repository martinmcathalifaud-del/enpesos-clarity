import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: '¿Es un préstamo?',
    a: 'No. EnPesos no entrega préstamos ni crea una línea de crédito nueva. Te ayuda a cotizar cuántos pesos chilenos podrías recibir usando cupo internacional disponible de tu tarjeta.',
  },
  {
    q: '¿Piden mis claves bancarias?',
    a: 'No. EnPesos no pide claves bancarias, token, coordenadas ni acceso remoto. Tampoco pedimos CVV por WhatsApp.',
  },
  {
    q: '¿Cotizar me obliga a avanzar?',
    a: 'No. La cotización sirve para revisar monto estimado, costo y condiciones antes de decidir. Si no te conviene, no tienes obligación de continuar.',
  },
  {
    q: '¿Qué pasa con la deuda de la tarjeta?',
    a: 'Al usar el cupo internacional, puede generarse un cargo o deuda en tu tarjeta de crédito, según las condiciones de tu banco o emisor.',
  },
  {
    q: '¿Cómo recibo los pesos?',
    a: 'Si decides avanzar y la operación se confirma, recibes una transferencia en pesos chilenos en una cuenta bancaria del titular validado.',
  },
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="preguntas-frecuentes" className="py-16 sm:py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground">Resuelve lo esencial antes de pedir una cotización.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="bg-card rounded-2xl border border-border overflow-hidden transition-all duration-200 hover:border-primary/30"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-5 py-4 flex justify-between items-center hover:bg-primary-light/60 transition-colors"
              >
                <span className="flex items-center gap-3 font-bold text-foreground text-left pr-4">
                  <span className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4 text-primary" />
                  </span>
                  {faq.q}
                </span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-72' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 text-muted-foreground border-t border-border pt-4 leading-relaxed">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/preguntas-frecuentes" className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-5 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary">
            Ver todas las preguntas frecuentes
          </a>
        </div>
      </div>
    </section>
  );
}
