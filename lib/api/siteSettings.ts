import type { SiteSettings } from '@/types';
import { API_URL, type FetchOpts } from './_internal';

export const siteSettings = {
  async get(opts?: FetchOpts): Promise<SiteSettings> {
    const res = await fetch(`${API_URL}/api/site-settings`, {
      next: { revalidate: 60 },
      signal: opts?.signal,
    });
    if (!res.ok) throw new Error(`Failed to fetch site settings (${res.status})`);
    return res.json();
  },
};
