import { createElement } from '../app/dom';

export function renderTournaments(): HTMLElement {
  return createElement('h1', { text: 'Tournaments' });
}
