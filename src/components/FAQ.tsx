import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: "¿Esto es un préstamo o adelanto de efectivo?",
    a: "No. EnPesos NO es un préstamo, adelanto de efectivo ni línea de crédito. Es un servicio de liquidación de una compra internacional: realizas una compra en USD con tu tarjeta a través de nuestra empresa constituida en Estados Unidos, y nosotros transferimos el equivalente en pesos chilenos al titular."
  },
  {
    q: "¿Por qué el cobro aparece en dólares en mi tarjeta?",
    a: "Porque estás realizando una compra internacional en USD a una empresa registrada en Estados Unidos (LLC). El cargo aparecerá en tu estado de cuenta como cualquier otra compra internacional que hagas con tu tarjeta (como Netflix, Amazon, Apple, etc.)."
  },
  {
    q: "¿Puedo pagar en cuotas?",
    a: "EnPesos NO ofrece ni gestiona planes de cuotas. Sin embargo, una vez que aparezca el cargo en tu tarjeta de crédito, puedes contactar directamente a tu banco emisor para solicitar que esa compra se convierta en cuotas, según las políticas y condiciones que tu banco tenga vigentes. Esto es independiente de EnPesos."
  },
  {
    q: "¿Es legal esta operación?",
    a: "EnPesos opera como facilitador de compras internacionales. No ofrecemos préstamos ni captación de fondos. La operación consiste en que realizas una compra internacional por un servicio, que posteriormente se liquida en pesos chilenos. Validamos la identidad del titular y transferimos únicamente a cuentas del mismo RUT para garantizar seguridad en cada operación."
  },
  {
    q: "¿Qué tarjetas funcionan?",
    a: "Aceptamos tarjetas de crédito Visa y Mastercard que tengan habilitado el uso internacional. Asegúrate de tener saldo disponible en tu línea de crédito antes de operar. No aceptamos tarjetas de débito ni tarjetas prepago."
  },
  {
    q: "¿En cuánto tiempo recibo los pesos?",
    a: "Una vez que validamos tu identidad y confirmamos el procesamiento exitoso del pago, transferimos los pesos chilenos a tu cuenta bancaria en un plazo de 24 a 48 horas hábiles. Te mantenemos informado por WhatsApp durante todo el proceso."
  },
  {
    q: "¿A quién transfieren los fondos?",
    a: "Por razones de seguridad y prevención de fraude, únicamente transferimos a cuentas bancarias registradas a nombre del titular de la tarjeta de crédito que realizó la compra. Ambos deben tener el mismo RUT. No realizamos transferencias a terceros bajo ninguna circunstancia."
  },
  {
    q: "¿Por qué necesitan mis datos personales?",
    a: "Necesitamos validar tu identidad para prevenir fraude, asegurar que la transferencia llegue a la persona correcta, y cumplir con nuestras políticas internas de seguridad. Toda tu información está protegida y no la compartimos con terceros."
  }
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
          Preguntas frecuentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-card rounded-lg border border-border overflow-hidden transition-all duration-200 hover:border-primary/30"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-secondary/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-left pr-4">{faq.q}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-muted-foreground border-t border-border pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/preguntas-frecuentes"
            className="text-primary font-semibold hover:underline underline-offset-4"
          >
            Ver todas las preguntas frecuentes →
          </a>
        </div>
      </div>
    </section>
  );
}
