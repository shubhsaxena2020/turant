type P = { className?: string };
const base = (className = 'w-6 h-6') => ({
  className,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export const MicIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="9" y="2.5" width="6" height="12" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3.5M8.5 21.5h7" />
  </svg>
);
export const PhoneIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M5 3h3.5l1.8 4.6-2.3 1.5a11 11 0 0 0 6 6l1.5-2.3L20 14.5V18a2 2 0 0 1-2.2 2A16 16 0 0 1 3 5.2 2 2 0 0 1 5 3z" />
  </svg>
);
export const BackIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);
export const SpeakerIcon = ({ className, off }: P & { off?: boolean }) => (
  <svg {...base(className)}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    {off ? <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" /> : <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />}
  </svg>
);
export const PencilIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4 20h4L19 9l-4-4L4 16z M13.5 6.5l4 4" />
  </svg>
);
export const CopyIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="8" y="8" width="12" height="12" rx="2.5" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);
export const ShareIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M12 3v12M7.5 7.5L12 3l4.5 4.5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
  </svg>
);
export const CheckIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);
export const ListIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M8 6h12M8 12h12M8 18h12M3.5 6h.01M3.5 12h.01M3.5 18h.01" />
  </svg>
);
export const GlobeIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </svg>
);
export const KeyboardIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
    <path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M7.5 14h9" />
  </svg>
);
export const ExternalIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
  </svg>
);
export const PlayIcon = ({ className }: P) => (
  <svg {...base(className)}>
    <path d="M7 4.5v15l12-7.5z" />
  </svg>
);
export const WhatsAppIcon = ({ className }: P) => (
  <svg className={className ?? 'w-6 h-6'} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z" />
  </svg>
);
