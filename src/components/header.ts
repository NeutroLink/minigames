import { createElement } from '../app/dom';
import { toHref } from '../app/paths';
import type { Route } from '../app/routes';

interface HeaderOptions {
  routes: Route[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onAuth: () => void;
  onBurger: () => void;
}

function createLogo(onNavigate: (path: string) => void): HTMLAnchorElement {
  const logo = createElement('a', {
    className: 'header__logo',
    text: 'MiniGames',
    attributes: { href: toHref('/'), 'aria-label': 'MiniGames home' },
  });

  logo.addEventListener('click', (event: MouseEvent) => {
    event.preventDefault();
    onNavigate('/');
  });

  return logo;
}

function createNavigation(options: HeaderOptions): HTMLElement {
  const items = options.routes.map((route) => {
    const link = createElement('a', {
      className: 'header__link',
      text: route.title,
      attributes: { href: toHref(route.path) },
    });

    if (route.path === options.currentPath) {
      link.setAttribute('aria-current', 'page');
    }

    link.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      options.onNavigate(route.path);
    });

    return createElement('li', { children: [link] });
  });

  const list = createElement('ul', { className: 'header__list', children: items });

  return createElement('nav', {
    className: 'header__nav',
    attributes: { 'aria-label': 'Main navigation' },
    children: [list],
  });
}

function createAuthButton(label: string, modifier: string, onAuth: () => void): HTMLButtonElement {
  const button = createElement('button', {
    className: `button button--${modifier}`,
    text: label,
    attributes: { type: 'button' },
  });

  button.addEventListener('click', onAuth);

  return button;
}

export function createHeader(options: HeaderOptions): HTMLElement {
  const burger = createElement('button', {
    className: 'header__burger',
    text: 'Menu',
    attributes: { type: 'button', 'aria-label': 'Open menu', 'aria-expanded': 'false' },
  });

  burger.addEventListener('click', options.onBurger);

  const actions = createElement('div', {
    className: 'header__actions',
    children: [
      createAuthButton('Log In', 'outlined', options.onAuth),
      createAuthButton('Sign Up', 'primary', options.onAuth),
    ],
  });

  const inner = createElement('div', {
    className: 'container header__inner',
    children: [createLogo(options.onNavigate), createNavigation(options), actions, burger],
  });

  return createElement('header', { className: 'header', children: [inner] });
}
