import { CheckCircle2, Phone, Plus, Camera, Mic } from 'lucide-react';

const customerMessage = 'Hola, tengo tarjeta de crédito con cupo internacional y me gustaría usar parte de ese cupo y recibir los pesos chilenos en mi cuenta.';

const replies = [
  '¡Hola! Claro, te ayudamos a evaluarlo.',
  'Cuéntanos el monto que quieres revisar y te explicamos cómo funciona.',
  'Revisamos tu caso, te explicamos el proceso y te enviamos una cotización clara con el monto estimado, costos y condiciones.',
];

function ChatBubble({ children, fromCustomer = false, time }: { children: string; fromCustomer?: boolean; time: string }) {
  return (
    <div className={`flex ${fromCustomer ? 'justify-end' : 'justify-start'} mb-3`}>
      {!fromCustomer && (
        <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-extrabold flex items-center justify-center mr-2 mt-1 shrink-0">
          En
        </div>
      )}
      <div
        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[13px] leading-snug shadow-sm ${
          fromCustomer
            ? 'bg-[#DDF8D7] text-foreground rounded-tr-sm'
            : 'bg-white text-foreground rounded-tl-sm border border-border/70'
        }`}
      >
        <p>{children}</p>
        <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-muted-foreground">
          <span>{time}</span>
          {fromCustomer && <CheckCircle2 className="w-3 h-3 text-primary" />}
        </div>
      </div>
    </div>
  );
}

export default function QuoteCalculator() {
  return (
    <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[330px] h-[330px] sm:w-[430px] sm:h-[430px] rounded-full bg-primary-light blur-0" />
      </div>

      <div className="relative w-[300px] sm:w-[360px] rounded-[2.6rem] border-[10px] border-[#121827] bg-[#121827] shadow-2xl">
        <div className="rounded-[2rem] overflow-hidden bg-[#F7F2EA]">
          <div className="h-7 bg-white flex items-center justify-between px-6 text-[11px] font-bold text-foreground">
            <span>11:30</span>
            <div className="flex items-center gap-1">
              <span className="w-4 h-2 rounded-sm border border-foreground/60" />
            </div>
          </div>

          <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-extrabold">
              En
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="font-bold text-foreground leading-none">EnPesos</p>
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">En línea</p>
            </div>
            <Phone className="w-5 h-5 text-foreground/70" />
          </div>

          <div className="relative px-3 py-4 min-h-[430px] bg-[radial-gradient(circle_at_top_left,hsl(var(--primary-light)),transparent_35%),linear-gradient(180deg,#fbf6ef,#f6efe5)]">
            <ChatBubble fromCustomer time="11:30">{customerMessage}</ChatBubble>
            {replies.map((reply, index) => (
              <ChatBubble key={reply} time={index === 2 ? '11:32' : '11:31'}>
                {reply}
              </ChatBubble>
            ))}
            <ChatBubble fromCustomer time="11:32">Perfecto, quedo atento.</ChatBubble>
          </div>

          <div className="bg-white px-3 py-3 flex items-center gap-2 border-t border-border">
            <Plus className="w-5 h-5 text-foreground/70" />
            <div className="flex-1 h-9 rounded-full border border-border bg-background" />
            <Camera className="w-5 h-5 text-foreground/70" />
            <Mic className="w-5 h-5 text-foreground/70" />
          </div>
        </div>
      </div>
    </div>
  );
}
