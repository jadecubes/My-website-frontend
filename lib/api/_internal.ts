// Shared by every per-domain module under lib/api/. Underscore-prefixed
// so it's clearly an internal helper not meant for direct consumption.

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export type FetchOpts = { signal?: AbortSignal };
