type EventData = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackAuthorityEvent(name: string, data: EventData = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: name, ...data });
}

export function trackMetaEvent(name: string, data: EventData = {}, eventId?: string) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  const options = eventId ? { eventID: eventId } : undefined;
  if (name === "PageView" || name === "ViewContent" || name === "Lead") {
    window.fbq("track", name, data, options);
  } else {
    window.fbq("trackCustom", name, data, options);
  }
}