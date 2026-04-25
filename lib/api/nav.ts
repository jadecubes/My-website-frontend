import type { NavLink } from '@/types';
import { API_URL, type FetchOpts } from './_internal';

export const nav = {
  async list(opts?: FetchOpts): Promise<NavLink[]> {
    const res = await fetch(`${API_URL}/api/nav`, {
      next: { revalidate: 60 },
      signal: opts?.signal,
    });
    if (!res.ok) throw new Error(`Failed to fetch nav links (${res.status})`);
    return res.json();
  },
};
