import { createElement } from '../app/dom';
import developerImage from '../assets/images/hero.jpg';

export function createDeveloperSection(): HTMLElement {
  const illustration = createElement('img', {
    className: 'developer__image',
    attributes: { src: developerImage, alt: '', width: '640', height: '400', loading: 'lazy' },
  });

  const title = createElement('h2', {
    className: 'developer__title',
    text: 'Are You a Game Developer?',
  });

  const text = createElement('p', {
    className: 'developer__text',
    text: 'Want to see your game on MiniGames? We are looking for engaging mini-games to add to our platform. Submit your game and reach thousands of players.',
  });

  const button = createElement('button', {
    className: 'button button--primary',
    text: 'Submit Form',
    attributes: { type: 'button' },
  });

  const note = createElement('p', {
    className: 'developer__note',
    text: 'or contact us at developers@minigames.com',
  });

  const card = createElement('div', {
    className: 'developer__card',
    children: [title, text, button, note],
  });
  const inner = createElement('div', {
    className: 'container developer__inner',
    children: [illustration, card],
  });

  return createElement('section', { className: 'section developer', children: [inner] });
}
