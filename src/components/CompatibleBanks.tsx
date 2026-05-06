import { CreditCard, MessageCircle } from 'lucide-react';

const banks = [
  'BCI',
  'Banco de Chile',
  'Santander',
  'Scotiabank',
  'BancoEstado',
  'Itaú',
  'BICE',
  'Security',
  'Falabella',
  'Cencosud',
  'Ripley',
];

const WHATSAPP_URL =
  'https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20consultar%20si%20mi%20banco%20o%20tarjeta%20es%20compatible%20para%20operar.';

export default function CompatibleBanks() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-light mb-4">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Bancos y tarjetas compatibles
          </h2>
          <p className="text-lg text-muted-foreground">
            Revisamos operaciones de personas con tarjetas de crédito chilenas que tengan cupo internacional en dólares disponible.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 sm:p-8 card-shadow">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            {banks.map((bank) => (
              <span
                key={bank}
                className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm sm:text-base font-medium border border-border"
              >
                {bank}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-2">
            La compatibilidad depende del tipo de tarjeta, cupo internacional disponible y validación previa de la operación.
          </p>
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto italic">
            EnPesos no está afiliado, asociado ni patrocinado por estos bancos o emisores. La mención es solo referencial para orientar la consulta del usuario.
          </p>

          <div className="flex justify-center mt-8">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-6 py-3 rounded-lg button-shadow transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar mi banco por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
