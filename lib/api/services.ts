import type { Service } from '@/types';
import { API_URL, type FetchOpts } from './_internal';

export const services = {
  async list(opts?: FetchOpts): Promise<Service[]> {
    const res = await fetch(`${API_URL}/api/services`, {
      next: { revalidate: 3600 },
      signal: opts?.signal,
    });
    if (!res.ok) throw new Error(`Failed to fetch services (${res.status})`);
    return res.json();
  },
};
