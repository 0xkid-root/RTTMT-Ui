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
      {
        label: 'Transaction Monitoring',
        href: '#product',
      },
      {
        label: 'Risk Intelligence',
        href: '#features',
      },
      {
        label: 'Alert Management',
        href: '#features',
      },
      {
        label: 'Case Management',
        href: '#features',
      },
    ],
  },

  {
    title: 'Solutions',
    links: [
      {
        label: 'Fraud Operations',
        href: '#solutions',
      },
      {
        label: 'Risk Management',
        href: '#solutions',
      },
      {
        label: 'Financial Operations',
        href: '#solutions',
      },
      {
        label: 'Compliance',
        href: '#solutions',
      },
    ],
  },

  {
    title: 'Platform',
    links: [
      {
        label: 'Transaction Explorer',
        href: '#features',
      },
      {
        label: 'Live Monitoring',
        href: '#features',
      },
      {
        label: 'Risk Signals',
        href: '#features',
      },
      {
        label: 'Investigations',
        href: '#features',
      },
    ],
  },

  {
    title: 'Resources',
    links: [
      {
        label: 'Documentation',
        href: '#documentation',
      },
      {
        label: 'API Reference',
        href: '#api',
      },
      {
        label: 'Security',
        href: '#security',
      },
      {
        label: 'Request Demo',
        href: '#contact',
      },
    ],
  },
];