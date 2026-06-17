import { MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, trackWhatsAppClick } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl()}
      onClick={() => trackWhatsAppClick('floating_button')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 bg-[#25D366] hover:bg-[#20BD5A] text-white p-3 sm:p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
