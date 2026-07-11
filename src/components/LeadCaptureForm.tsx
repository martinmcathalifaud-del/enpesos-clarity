import { useState, type FormEvent } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { openWhatsApp } from '@/lib/whatsapp';
import { captureLead } from '@/lib/leads';

type LeadOrigin = 'home_calculadora_lead' | 'seguridad_cta_final';

interface LeadCaptureFormProps {
  origen: LeadOrigin;
  title?: string;
  description?: string;
  submitLabel?: string;
  className?: string;
}

export default function LeadCaptureForm({
  origen,
  title,
  description,
  submitLabel = 'Evaluar mi cupo',
  className = '',
}: LeadCaptureFormProps) {
  const [monto, setMonto] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldId = (name: string) => `${name}-${origen}`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const montoNumber = Number(monto);
    if (!montoNumber || montoNumber <= 0 || !correo.trim() || !telefono.trim()) {
      setError('Completa los 3 campos para continuar.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    await captureLead({
      monto: montoNumber,
      correo: correo.trim(),
      telefono: telefono.trim(),
      origen,
    });

    setIsSubmitting(false);

    openWhatsApp(
      origen,
      `Hola, quiero evaluar mi cupo internacional disponible por USD ${montoNumber}. Mi correo es ${correo.trim()}.`,
    );
  };

  return (
    <form onSubmit={handleSubmit} className={`rounded-[2rem] border border-border bg-background p-6 shadow-xl sm:p-8 ${className}`}>
      {title && <h3 className="mb-2 text-2xl font-black text-foreground">{title}</h3>}
      {description && <p className="mb-6 text-sm leading-relaxed text-secondary-foreground">{description}</p>}

      <div className="space-y-4">
        <div>
          <Label htmlFor={fieldId('monto')}>Monto aproximado en dólares (USD)</Label>
          <Input
            id={fieldId('monto')}
            type="number"
            min="1"
            inputMode="numeric"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="Ej: 500"
            className="mt-1.5 h-12 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor={fieldId('correo')}>Tu correo electrónico</Label>
          <Input
            id={fieldId('correo')}
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tu@correo.cl"
            className="mt-1.5 h-12 rounded-xl"
          />
        </div>
        <div>
          <Label htmlFor={fieldId('telefono')}>Tu número de WhatsApp</Label>
          <Input
            id={fieldId('telefono')}
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="+56 9 1234 5678"
            className="mt-1.5 h-12 rounded-xl"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-semibold text-destructive">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="mt-6 h-12 w-full rounded-xl text-base font-bold button-shadow">
        <MessageCircle className="h-5 w-5" />
        {isSubmitting ? 'Enviando…' : submitLabel}
      </Button>

      <p className="mt-3 text-sm text-muted-foreground">
        No pedimos claves bancarias ni datos de tu tarjeta en este formulario.
      </p>
    </form>
  );
}
