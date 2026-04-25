// Per-domain API namespaces. Import the namespace, not individual functions:
//   import { projects } from '@/lib/api';
//   const list = await projects.list();
//
// Each domain module owns its endpoints + any pure helpers operating on the
// same shape (e.g. projects.coverImage operates on a Project record).

export { projects } from './projects';
export { services } from './services';
export { contact } from './contact';
export { nav } from './nav';
export { siteSettings } from './siteSettings';
