import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_VERSION = '2025-09-03';
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_LEADS_DB_ID = process.env.NOTION_LEADS_DB_ID;

const VALID_ORIGINS = new Set(['home_calculadora_lead', 'seguridad_cta_final']);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  if (!NOTION_API_KEY || !NOTION_LEADS_DB_ID) {
    console.error('capture-lead: missing NOTION_API_KEY or NOTION_LEADS_DB_ID');
    return res.status(500).json({ error: 'server_misconfigured' });
  }

  const body = (req.body ?? {}) as {
    monto?: number | string;
    correo?: string;
    telefono?: string;
    origen?: string;
  };

  const montoNumber = typeof body.monto === 'string' ? Number(body.monto) : body.monto;
  const correo = typeof body.correo === 'string' ? body.correo.trim() : '';
  const telefono = typeof body.telefono === 'string' ? body.telefono.trim() : '';
  const origen = typeof body.origen === 'string' ? body.origen.trim() : '';

  if (
    typeof montoNumber !== 'number' || !Number.isFinite(montoNumber) || montoNumber <= 0 ||
    !isValidEmail(correo) ||
    !telefono
  ) {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  const originValue = VALID_ORIGINS.has(origen) ? origen : 'otro';

  try {
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { type: 'data_source_id', data_source_id: NOTION_LEADS_DB_ID },
        properties: {
          Nombre: { title: [{ text: { content: `Lead ${montoNumber} USD - ${correo}` } }] },
          Correo: { email: correo },
          Telefono: { phone_number: telefono },
          'Monto USD': { number: montoNumber },
          Origen: { select: { name: originValue } },
          'Abrio WhatsApp': { checkbox: false },
          Estado: { status: { name: 'Not started' } },
          Fecha: { date: { start: new Date().toISOString().slice(0, 10) } },
        },
      }),
    });

    if (!notionResponse.ok) {
      const errorBody = await notionResponse.text();
      console.error('capture-lead: Notion API error', notionResponse.status, errorBody);
      return res.status(502).json({ error: 'notion_error' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('capture-lead: unexpected error', error);
    return res.status(500).json({ error: 'unexpected_error' });
  }
}
