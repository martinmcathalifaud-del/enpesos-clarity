import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const buildWhatsAppUrl = (amount: string) => {
  const msg = encodeURIComponent(`Hola EnPesos, quiero solicitar una cotización para USD ${amount}.`);
  return `https://wa.me/56974483779?text=${msg}`;
};

export default function QuoteCalculator() {
  const [amount, setAmount] = useState('500');

  const handleStartOperation = () => {
    window.open(buildWhatsAppUrl(amount), '_blank');
  };

  return (
    <div id="calculator" className="bg-card rounded-2xl card-shadow p-6 sm:p-8 border-2 border-border hover:card-shadow-hover transition-shadow duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-2xl font-bold text-foreground mb-2">Cotiza tu operación</h2>
      <p className="text-muted-foreground text-sm mb-6">Solicita tu cotización directamente por WhatsApp</p>

      <div className="mb-6">
        <Label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
          Monto a cotizar (USD)
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg font-semibold">
            USD
          </span>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="200"
            max="3000"
            className="w-full pl-16 pr-4 py-6 text-2xl font-bold border-2 border-input rounded-lg focus:border-primary focus:ring-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">Mínimo: USD 200 · Máximo: USD 3.000</p>
      </div>

      <Button
        className="w-full py-6 text-lg font-bold button-shadow"
        onClick={handleStartOperation}
      >
        Solicitar cotización
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-3">
        La cotización se confirma por WhatsApp antes de operar.
      </p>
    </div>
  );
}
