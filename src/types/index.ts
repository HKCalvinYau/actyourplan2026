export interface Service {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  descriptionZh: string;
  icon: string;
  features: string[];
  featuresZh: string[];
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleZh: string;
  excerpt: string;
  excerptZh: string;
  category: string;
  categoryZh: string;
  date: string;
  readTime: string;
  slug: string;
}

export interface NavItem {
  label: string;
  labelZh: string;
  href: string;
}

export type Language = 'en' | 'zh';
