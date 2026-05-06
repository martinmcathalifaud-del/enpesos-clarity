const cases = [
  {
    title: 'Necesito pesos usando mi cupo internacional',
    text: 'Personas con tarjeta de crédito chilena y cupo en dólares disponible pueden cotizar una operación asistida para recibir CLP en su cuenta.',
  },
  {
    title: 'Quiero saber cuánto recibiría antes de avanzar',
    text: 'Antes de operar, el usuario recibe una cotización referencial y confirma el proceso con atención humana.',
  },
  {
    title: 'Busco un proceso claro y respaldado',
    text: 'La operación se revisa previamente, no requiere entregar claves bancarias y se realiza con transferencia a cuenta propia.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Casos típicos de uso
          </h2>
          <p className="text-muted-foreground">
            Algunas situaciones en las que una persona podría cotizar con EnPesos.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div key={i} className="bg-card rounded-xl p-6 card-shadow border border-border">
              <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
