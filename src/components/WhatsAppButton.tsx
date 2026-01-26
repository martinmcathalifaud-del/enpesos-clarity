import { MessageCircle } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20cotizar%20una%20operaci%C3%B3n%20en%20USD%20y%20operar%20con%20acompa%C3%B1amiento.";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
}
