import { createElement } from '../app/dom';

export type AuthMode = 'login' | 'register';

export interface AuthDialog {
  element: HTMLDialogElement;
  open: (mode?: AuthMode) => void;
  close: () => void;
}

interface FieldOptions {
  id: string;
  label: string;
  type: string;
  autocomplete: string;
}

function createField(options: FieldOptions): HTMLElement {
  const input = createElement('input', {
    className: 'field__input',
    attributes: {
      id: options.id,
      name: options.id,
      type: options.type,
      autocomplete: options.autocomplete,
      required: '',
    },
  });

  const label = createElement('label', {
    className: 'field__label',
    text: options.label,
    attributes: { for: options.id },
  });

  return createElement('p', { className: 'field', children: [label, input] });
}

function createForm(mode: AuthMode, onSwitch: (mode: AuthMode) => void): HTMLFormElement {
  const isLogin = mode === 'login';

  const fields: HTMLElement[] = isLogin
    ? [
        createField({ id: 'login-email', label: 'Email', type: 'email', autocomplete: 'email' }),
        createField({
          id: 'login-password',
          label: 'Password',
          type: 'password',
          autocomplete: 'current-password',
        }),
      ]
    : [
        createField({
          id: 'register-name',
          label: 'Nickname',
          type: 'text',
          autocomplete: 'nickname',
        }),
        createField({ id: 'register-email', label: 'Email', type: 'email', autocomplete: 'email' }),
        createField({
          id: 'register-password',
          label: 'Password',
          type: 'password',
          autocomplete: 'new-password',
        }),
        createField({
          id: 'register-confirm',
          label: 'Confirm password',
          type: 'password',
          autocomplete: 'new-password',
        }),
      ];

  const submit = createElement('button', {
    className: 'button button--primary auth__submit',
    text: isLogin ? 'Log In' : 'Create Account',
    attributes: { type: 'submit' },
  });

  const inlineLink = createElement('button', {
    className: 'auth__inline-link',
    text: isLogin ? 'Register' : 'Log in',
    attributes: { type: 'button' },
  });

  inlineLink.addEventListener('click', () => {
    onSwitch(isLogin ? 'register' : 'login');
  });

  const hint = createElement('p', {
    className: 'auth__hint',
    children: [
      createElement('span', { text: isLogin ? 'No account yet? ' : 'Already registered? ' }),
      inlineLink,
    ],
  });

  const form = createElement('form', {
    className: 'auth__form',
    attributes: { novalidate: '' },
    children: [...fields, submit, hint],
  });

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
  });

  return form;
}

export function createAuthDialog(): AuthDialog {
  let mode: AuthMode = 'login';

  const element = createElement('dialog', { className: 'auth' });

  const closeButton = createElement('button', {
    className: 'auth__close',
    text: '×',
    attributes: { type: 'button', 'aria-label': 'Close dialog' },
  });

  const tabs = (['login', 'register'] as const).map((value) => {
    const tab = createElement('button', {
      className: 'auth__tab',
      text: value === 'login' ? 'Login' : 'Registration',
      attributes: { type: 'button', role: 'tab' },
    });

    tab.addEventListener('click', () => {
      render(value);
    });

    return { value, tab };
  });

  const tabList = createElement('div', {
    className: 'auth__tabs',
    attributes: { role: 'tablist', 'aria-label': 'Authentication mode' },
    children: tabs.map((item) => item.tab),
  });

  const body = createElement('div', { className: 'auth__body' });

  const inner = createElement('div', {
    className: 'auth__inner',
    children: [closeButton, tabList, body],
  });

  element.append(inner);

  function render(next: AuthMode): void {
    mode = next;

    for (const item of tabs) {
      item.tab.setAttribute('aria-selected', String(item.value === mode));
      item.tab.classList.toggle('is-active', item.value === mode);
    }

    body.replaceChildren(createForm(mode, render));
    body.classList.remove('is-entering');
    requestAnimationFrame(() => {
      body.classList.add('is-entering');
    });
  }

  function close(): void {
    element.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    setTimeout(() => {
      element.close();
    }, 200);
  }

  function open(next: AuthMode = 'login'): void {
    render(next);
    element.showModal();
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => {
      element.classList.add('is-open');
    });
  }

  closeButton.addEventListener('click', close);

  element.addEventListener('cancel', (event: Event) => {
    event.preventDefault();
    close();
  });

  element.addEventListener('click', (event: MouseEvent) => {
    if (event.target === element) {
      close();
    }
  });

  return { element, open, close };
}
