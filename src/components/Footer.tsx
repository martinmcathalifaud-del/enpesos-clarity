import logo from '@/assets/logo-enpesos.png';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20cotizar%20por%20WhatsApp.";

const links = [
  { label: 'Cómo funciona', href: '#calculator' },
  { label: 'Seguridad', href: '#seguridad' },
  { label: 'Bancos compatibles', href: '#bancos' },
  { label: 'Preguntas frecuentes', href: '#faq' },
  { label: 'Términos y Condiciones', href: '#' },
  { label: 'Política de Privacidad', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-muted py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="bg-background rounded-lg inline-flex p-3 mb-4">
              <img src={logo} alt="EnPesos.cl" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Más pesos en tu cuenta. Operaciones internacionales asistidas con respaldo y atención humana.
            </p>
          </div>

          <div>
            <h4 className="text-background font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-muted-foreground hover:text-background transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-background font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>EnPesos.cl</li>
              <li>
                <a href="mailto:contacto@enpesos.cl" className="hover:text-background transition-colors">
                  contacto@enpesos.cl
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-muted-foreground/20 pt-6 space-y-2 text-sm text-muted-foreground">
          <p>EnPesos no ofrece préstamos, adelantos de efectivo ni financiamiento.</p>
          <p>EnPesos no es banco ni entidad financiera regulada.</p>
          <p>Las cuotas, si están disponibles, dependen exclusivamente del banco emisor de la tarjeta.</p>
          <p className="pt-4">© 2026 EnPesos.cl. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
