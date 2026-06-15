import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: '¿Es un préstamo?',
    a: 'No. EnPesos no es un préstamo nuevo ni una línea de crédito. Es una operación asistida para evaluar el uso de un cupo internacional disponible, con cotización previa y aceptación del cliente antes de avanzar.',
  },
  {
    q: '¿Piden mis claves bancarias?',
    a: 'No. Nunca pedimos claves bancarias. Tampoco pedimos CVV por WhatsApp. El proceso se coordina con acompañamiento y validaciones de seguridad.',
  },
  {
    q: '¿Cuándo conozco el costo?',
    a: 'Antes de operar. Te enviamos una cotización clara con el monto estimado, costos y condiciones. Tú decides si avanzar o no después de revisar esa información.',
  },
  {
    q: '¿Qué tarjetas pueden cotizar?',
    a: 'Principalmente tarjetas de crédito con cupo internacional disponible y uso internacional habilitado. La compatibilidad se confirma caso a caso durante la cotización.',
  },
  {
    q: '¿Cuánto tiempo toma la operación?',
    a: 'Depende de las validaciones y del procesamiento de la operación. Como referencia, una vez validado el caso, el proceso puede tomar entre 24 y 48 horas hábiles.',
  },
  {
    q: '¿Cómo me llega el dinero?',
    a: 'La transferencia se realiza a una cuenta bancaria chilena del titular validado. Por seguridad, no se realizan transferencias a cuentas de terceros.',
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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-10 text-center tracking-tight">
          Preguntas frecuentes
        </h2>

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
      </div>
    </section>
  );
}
