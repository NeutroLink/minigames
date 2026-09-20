import { createElement } from '../app/dom';
import { toHref } from '../app/paths';
import type { Route } from '../app/routes';

export interface MobileMenu {
  element: HTMLElement;
  open: () => void;
  close: () => void;
}

interface MobileMenuOptions {
  routes: Route[];
  onNavigate: (path: string) => void;
  onAuth: () => void;
}

export function createMobileMenu(options: MobileMenuOptions): MobileMenu {
  let opener: HTMLElement | undefined;

  const closeButton = createElement('button', {
    className: 'mobile-menu__close',
    text: '×',
    attributes: { type: 'button', 'aria-label': 'Close menu' },
  });

  const items = options.routes.map((route) => {
    const link = createElement('a', {
      className: 'mobile-menu__link',
      text: route.title,
      attributes: { href: toHref(route.path) },
    });

    link.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      close();
      options.onNavigate(route.path);
    });

    return createElement('li', { children: [link] });
  });

  const navigation = createElement('nav', {
    className: 'mobile-menu__nav',
    attributes: { 'aria-label': 'Mobile navigation' },
    children: [createElement('ul', { className: 'mobile-menu__list', children: items })],
  });

  const authButtons = (['Log In', 'Sign Up'] as const).map((label, index) => {
    const button = createElement('button', {
      className: `button ${index === 0 ? 'button--outlined' : 'button--primary'} mobile-menu__button`,
      text: label,
      attributes: { type: 'button' },
    });

    button.addEventListener('click', () => {
      close();
      options.onAuth();
    });

    return button;
  });

  const element = createElement('div', {
    className: 'mobile-menu',
    attributes: { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Site menu', hidden: '' },
    children: [
      createElement('div', {
        className: 'container mobile-menu__inner',
        children: [
          closeButton,
          navigation,
          createElement('div', { className: 'mobile-menu__actions', children: authButtons }),
        ],
      }),
    ],
  });

  function onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      close();
    }
  }

  function open(): void {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    element.removeAttribute('hidden');
    document.body.classList.add('is-locked');
    // The class drives the slide-in transition, so it must land after the element is shown.
    requestAnimationFrame(() => {
      element.classList.add('is-open');
    });
    closeButton.focus();
    addEventListener('keydown', onKeyDown);
  }

  function close(): void {
    removeEventListener('keydown', onKeyDown);
    element.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    opener?.focus();

    // The task asks for an animated close, so the element stays in the flow until
    // the slide-out transition has run.
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.setAttribute('hidden', '');

      return;
    }

    element.addEventListener(
      'transitionend',
      () => {
        if (!element.classList.contains('is-open')) {
          element.setAttribute('hidden', '');
        }
      },
      { once: true },
    );
  }

  closeButton.addEventListener('click', close);

  return { element, open, close };
}
