export const PipeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 14h6v-4h6V6h6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <rect x="2" y="12" width="8" height="6" rx="2" stroke="currentColor" strokeWidth={2} />
    <rect x="8" y="8" width="8" height="6" rx="2" stroke="currentColor" strokeWidth={2} />
  </svg>
);

export const JetIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 12h12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M10 9l5 3-5 3V9Z" fill="currentColor" />
    <path d="M18 10v4m3-3v2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);

export const VacuumIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx="8" cy="17" r="2.5" stroke="currentColor" strokeWidth={2} />
    <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth={2} />
    <path d="M4 17h10l5-6a3 3 0 0 0-2.4-4.8H11" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    <path d="M11 6v6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
  </svg>
);
