import { createElement } from '../app/dom';
import heroImage from '../assets/images/hero.jpg';

export function createHero(): HTMLElement {
  const title = createElement('h1', {
    className: 'hero__title',
    text: 'Take a Short Break & Have Fun',
    attributes: { id: 'hero-title' },
  });

  const text = createElement('p', {
    className: 'hero__text',
    text: 'Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.',
  });

  // Story 1 asks for the button's appearance only; its behaviour is a later task.
  const button = createElement('button', {
    className: 'button button--primary',
    text: 'Browse Library',
    attributes: { type: 'button' },
  });

  const card = createElement('div', { className: 'hero__card', children: [title, text, button] });

  const picture = createElement('img', {
    className: 'hero__image',
    attributes: { src: heroImage, alt: '', width: '1920', height: '627' },
  });

  const inner = createElement('div', { className: 'container hero__inner', children: [card] });

  return createElement('section', {
    className: 'hero',
    attributes: { 'aria-labelledby': 'hero-title' },
    children: [picture, inner],
  });
}
