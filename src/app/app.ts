import { createElement, clearElement } from './dom';
import { createAuthDialog } from '../components/auth-dialog';
import { createFooter } from '../components/footer';
import { createHeader } from '../components/header';
import { createMobileMenu } from '../components/mobile-menu';
import { Router } from './router';
import { routes } from './routes';

export function renderApp(root: HTMLElement): void {
  const chrome = createElement('div');
  const outlet = createElement('main');
  const footerHost = createElement('div');
  const authDialog = createAuthDialog();

  const navigate = (target: string): void => {
    router.navigate(target);
  };

  const openAuth = (): void => {
    authDialog.open('login');
  };

  const renderChrome = (path: string): void => {
    const menu = createMobileMenu({ routes, onNavigate: navigate, onAuth: openAuth });

    clearElement(chrome);
    chrome.append(
      createHeader({
        routes,
        currentPath: path,
        onNavigate: navigate,
        onAuth: openAuth,
        onBurger: menu.open,
      }),
      menu.element,
    );

    clearElement(footerHost);
    footerHost.append(createFooter(navigate));
  };

  const router = new Router(outlet, routes, renderChrome);

  root.append(chrome, outlet, footerHost, authDialog.element);
  router.start();
}
