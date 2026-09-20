// On GitHub Pages the site is served from /<repo>/, so the URL in the address bar
// carries a prefix the route table knows nothing about. These helpers translate
// between the two so routes stay written as plain '/library' everywhere.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function toHref(path: string): string {
  return `${BASE}${path}`;
}

export function currentPath(): string {
  const path = BASE === '' ? location.pathname : location.pathname.replace(BASE, '');

  return path === '' ? '/' : path;
}
