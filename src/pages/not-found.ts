import { createElement } from '../app/dom';

export function renderNotFound(): HTMLElement {
  return createElement('h1', { text: 'Page not found' });
}
