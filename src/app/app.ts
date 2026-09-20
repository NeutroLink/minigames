import { createElement, clearElement } from './dom';
import { createFooter } from '../components/footer';
import { createHeader } from '../components/header';
import { Router } from './router';
import { routes } from './routes';

// The burger menu and the auth dialog arrive in the next task; the header only
// needs to render its controls for now.
function noop(): void {}

export function renderApp(root: HTMLElement): void {
  const chrome = createElement('div');
  const outlet = createElement('main');
  const footerHost = createElement('div');

  const navigate = (target: string): void => {
    router.navigate(target);
  };

  const renderChrome = (path: string): void => {
    clearElement(chrome);
    chrome.append(
      createHeader({ routes, currentPath: path, onNavigate: navigate, onAuth: noop, onBurger: noop }),
    );

    clearElement(footerHost);
    footerHost.append(createFooter(navigate));
  };

  const router = new Router(outlet, routes, renderChrome);

  root.append(chrome, outlet, footerHost);
  router.start();
}
