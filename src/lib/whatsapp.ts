const WHATSAPP_PHONE = '56974483779';
const STORAGE_KEY = 'enpesos_lead_source';
const STORAGE_DAYS = 30;

type LeadSourceData = {
  source: string;
  medium?: string;
  campaign?: string;
  content?: string;
  capturedAt: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const sourceLabels: Record<string, string> = {
  tiktok: 'TikTok',
  instagram: 'Instagram',
  facebook: 'Facebook',
  fb: 'Facebook',
  meta: 'Meta',
  google: 'Google',
  google_business_profile: 'Google',
  business_profile: 'Google',
  referido: 'un referido',
  referidos: 'un referido',
  whatsapp: 'WhatsApp',
  directo: 'la web de EnPesos',
};

function clean(value: string | null) {
  return value?.trim().toLowerCase() || '';
}

function isExpired(capturedAt: number) {
  return Date.now() - capturedAt > STORAGE_DAYS * 24 * 60 * 60 * 1000;
}

function readStoredSource(): LeadSourceData | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as LeadSourceData;
    if (!parsed?.source || isExpired(parsed.capturedAt)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeStoredSource(data: LeadSourceData) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Si el navegador bloquea storage, igual dejamos funcionar el link de WhatsApp.
  }
}

function sourceFromReferrer() {
  if (typeof document === 'undefined') return '';

  const referrer = document.referrer.toLowerCase();
  if (referrer.includes('tiktok')) return 'tiktok';
  if (referrer.includes('instagram')) return 'instagram';
  if (referrer.includes('facebook') || referrer.includes('fb.')) return 'facebook';
  if (referrer.includes('google')) return 'google';

  return '';
}

export function getLeadSourceData(): LeadSourceData {
  if (typeof window === 'undefined') {
    return { source: 'directo', capturedAt: Date.now() };
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = clean(params.get('utm_source'));
  const utmMedium = clean(params.get('utm_medium'));
  const utmCampaign = clean(params.get('utm_campaign'));
  const utmContent = clean(params.get('utm_content'));

  if (utmSource) {
    const data: LeadSourceData = {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
      content: utmContent,
      capturedAt: Date.now(),
    };

    writeStoredSource(data);
    return data;
  }

  const stored = readStoredSource();
  if (stored) return stored;

  const referrerSource = sourceFromReferrer();
  if (referrerSource) {
    const data: LeadSourceData = { source: referrerSource, capturedAt: Date.now() };
    writeStoredSource(data);
    return data;
  }

  return { source: 'directo', capturedAt: Date.now() };
}

export function getLeadSourceLabel() {
  const { source } = getLeadSourceData();
  return sourceLabels[source] || source;
}

export function getWhatsAppMessage() {
  const sourceLabel = getLeadSourceLabel();
  return `Hola, vengo desde ${sourceLabel} y quiero cotizar mi cupo internacional.`;
}

export function getWhatsAppUrl() {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(getWhatsAppMessage())}`;
}

export function trackWhatsAppClick(location: string) {
  const leadData = getLeadSourceData();
  const eventPayload = {
    event: 'click_whatsapp',
    lead_source: leadData.source,
    lead_medium: leadData.medium || '',
    lead_campaign: leadData.campaign || '',
    lead_content: leadData.content || '',
    button_location: location,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'click_whatsapp', eventPayload);
  }
}

export function openWhatsApp(location: string) {
  trackWhatsAppClick(location);
  window.open(getWhatsAppUrl(), '_blank', 'noopener,noreferrer');
}
