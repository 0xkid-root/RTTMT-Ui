export interface LandingFeatureProps {
  children?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: NavItem[];
}
