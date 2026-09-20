import { createElement } from '../app/dom';
import type { Route } from '../app/routes';

export function createNav(routes: Route[], onNavigate: (path: string) => void): HTMLElement {
  const links = routes.map((route) => {
    const link = createElement('a', {
      text: route.title,
      attributes: { href: route.path },
    });

    link.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      onNavigate(route.path);
    });

    return link;
  });

  return createElement('nav', { children: links });
}
