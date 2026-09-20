import { createElement } from '../app/dom';

export function renderLibrary(): HTMLElement {
  return createElement('h1', { text: 'Library' });
}
