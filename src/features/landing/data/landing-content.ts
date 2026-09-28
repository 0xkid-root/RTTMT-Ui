import { NavItem, FooterGroup } from '../types/landing';

export const MAIN_NAV: NavItem[] = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
];

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Product',
    links: [
      { label: 'Transaction Monitoring', href: '#' },
      { label: 'Risk Intelligence', href: '#' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Fraud Operations', href: '#' },
      { label: 'Risk Management', href: '#' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Live Monitoring', href: '#' },
      { label: 'Risk Signals', href: '#' },
      { label: 'Cases', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Demo', href: '#' },
    ],
  }
];