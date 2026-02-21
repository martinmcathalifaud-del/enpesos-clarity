const testimonials = [
  {
    name: 'Carolina M.',
    text: 'Operé por primera vez y todo fue muy transparente. Me explicaron cada paso por WhatsApp antes de confirmar.',
  },
  {
    name: 'Felipe R.',
    text: 'Necesitaba pesos rápido y en menos de 48 horas ya tenía la transferencia en mi cuenta. Muy profesional.',
  },
  {
    name: 'Javiera S.',
    text: 'Me gustó que validaran mi identidad y que solo transfieran al titular. Se nota que cuidan la seguridad.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground text-center mb-10">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-xl p-6 card-shadow border border-border">
              <p className="text-muted-foreground mb-4 italic">"{t.text}"</p>
              <p className="font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
