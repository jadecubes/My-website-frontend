import { API_URL, type FetchOpts } from './_internal';

type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  body: string;
};

export const contact = {
  async send(data: ContactPayload, opts?: FetchOpts) {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: opts?.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Failed to send message (${res.status}): ${body}`);
    }
    return res.json();
  },
};
