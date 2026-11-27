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
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") {
    // Pixel is set up by the root layout; page effects can run first, so retry once.
    setTimeout(() => typeof window.fbq === "function" && trackMetaEvent(name, data, eventId), 50);
    return;
  }
  const options = eventId ? { eventID: eventId } : undefined;
  if (["PageView", "ViewContent", "Lead", "CompleteRegistration", "InitiateCheckout", "Purchase", "Contact", "Schedule"].includes(name)) {
    window.fbq("track", name, data, options);
  } else {
    window.fbq("trackCustom", name, data, options);
  }
}