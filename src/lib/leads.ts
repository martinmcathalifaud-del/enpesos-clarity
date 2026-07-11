export interface LeadPayload {
  monto: number;
  correo: string;
  telefono: string;
  origen: string;
}

export async function captureLead(payload: LeadPayload): Promise<boolean> {
  try {
    const response = await fetch('/api/capture-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.error('captureLead: request failed', error);
    return false;
  }
}
