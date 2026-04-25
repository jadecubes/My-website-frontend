export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Media {
  id: number;
  collection_name: string;
  original_url: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: Category | null;
  is_published: boolean;
  sort_order: number;
  media: Media[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  sort_order: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  from: number | null;
  to: number | null;
  total: number;
}

export interface NavLink {
  id: number;
  label: string;
  href: string;
  sort_order: number;
  is_published: boolean;
}

export interface SiteSettings {
  site_name: string;
  tagline: string | null;
  footer_email: string | null;
  copyright: string | null;
}
