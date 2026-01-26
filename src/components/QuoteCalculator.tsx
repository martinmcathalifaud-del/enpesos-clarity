import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WHATSAPP_URL = "https://wa.me/56974483779?text=Hola%20EnPesos%2C%20quiero%20cotizar%20una%20operaci%C3%B3n%20en%20USD%20y%20operar%20con%20acompa%C3%B1amiento.";

export default function QuoteCalculator() {
  const [amount, setAmount] = useState('500');
  const exchangeRate = 920;
  const commission = 3.5;
  const [result, setResult] = useState({ clp: 0, fee: 0, net: 0 });

  useEffect(() => {
    const numAmount = parseFloat(amount) || 0;
    const clpTotal = numAmount * exchangeRate;
    const feeAmount = clpTotal * (commission / 100);
    const netAmount = clpTotal - feeAmount;
    
    setResult({
      clp: clpTotal,
      fee: feeAmount,
      net: netAmount
    });
  }, [amount]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  const handleStartOperation = () => {
    window.open(WHATSAPP_URL, '_blank');
  };

  return (
    <div id="calculator" className="bg-card rounded-2xl card-shadow p-6 sm:p-8 border-2 border-border hover:card-shadow-hover transition-shadow duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h2 className="text-2xl font-bold text-foreground mb-2">Cotiza tu operación</h2>
      <p className="text-muted-foreground text-sm mb-6">Calcula cuánto recibirás en pesos</p>

      <div className="bg-primary-light rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Tipo de cambio hoy:</span>
          <span className="text-lg font-bold text-primary">${exchangeRate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Comisión:</span>
          <span className="text-sm font-semibold text-secondary-foreground">{commission}%</span>
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
          ¿Cuánto quieres convertir?
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
        <p className="text-xs text-muted-foreground mt-2">Mínimo: USD 200 - Máximo: USD 3.000</p>
      </div>

      <div className="bg-secondary rounded-lg p-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Conversión USD a CLP:</span>
          <span className="font-semibold text-foreground">{formatCurrency(result.clp)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Comisión ({commission}%):</span>
          <span className="font-semibold text-destructive">-{formatCurrency(result.fee)}</span>
        </div>
        <div className="border-t border-border pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">Recibirás:</span>
            <span className="text-2xl font-bold text-accent">{formatCurrency(result.net)}</span>
          </div>
        </div>
      </div>

      <Button 
        className="w-full py-6 text-lg font-bold button-shadow"
        onClick={handleStartOperation}
      >
        Iniciar operación
      </Button>
    </div>
  );
}
