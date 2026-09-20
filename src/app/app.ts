import { createElement } from './dom';
import { createNav } from '../components/nav';
import { Router } from './router';
import { routes } from './routes';

export function renderApp(root: HTMLElement): void {
  const outlet = createElement('main');
  const router = new Router(outlet, routes);
  const nav = createNav(routes, (path) => {
    router.navigate(path);
  });

  root.append(createElement('header', { children: [nav] }), outlet);
  router.start();
}
