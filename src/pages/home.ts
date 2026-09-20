import { createElement } from '../app/dom';

export function renderHome(): HTMLElement {
  return createElement('div', {
    children: [
      createElement('h1', { text: 'MiniGames' }),
      createElement('p', { text: 'Small games. Big fun.' }),
    ],
  });
}
