export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M16.5 3h-2.6v12.1a2.5 2.5 0 1 1-2.1-2.47V9.98a5.5 5.5 0 1 0 4.7 5.44V9.1a6.4 6.4 0 0 0 3.5 1.06V7.5a3.9 3.9 0 0 1-3.5-3.9V3z" />
    </svg>
  );
}
