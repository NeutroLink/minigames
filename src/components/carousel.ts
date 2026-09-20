import { createElement } from '../app/dom';
import type { Game } from '../data/home-content';

function formatLikes(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : String(value);
}

function createCard(game: Game): HTMLElement {
  const image = createElement('img', {
    className: 'game-card__image',
    attributes: { src: game.image, alt: game.name, width: '288', height: '360', loading: 'lazy' },
  });

  const name = createElement('h3', { className: 'game-card__title', text: game.name });

  const rating = createElement('span', {
    className: 'game-card__rating',
    text: `★ ${game.rating.toFixed(1)}`,
  });

  const likes = createElement('span', {
    className: 'game-card__likes',
    text: `♥ ${formatLikes(game.likesCount)}`,
  });

  const meta = createElement('div', { className: 'game-card__meta', children: [rating, likes] });
  const info = createElement('div', { className: 'game-card__info', children: [name, meta] });

  return createElement('article', { className: 'game-card', children: [image, info] });
}

export function createCarousel(games: Game[]): HTMLElement {
  const heading = createElement('h2', { className: 'section__title', text: 'New Games' });

  const track = createElement('ul', {
    className: 'carousel__track',
    children: games.map((game) =>
      createElement('li', { className: 'carousel__slide', children: [createCard(game)] }),
    ),
  });

  const previous = createElement('button', {
    className: 'carousel__arrow',
    text: '‹',
    attributes: { type: 'button', 'aria-label': 'Previous games' },
  });

  const next = createElement('button', {
    className: 'carousel__arrow',
    text: '›',
    attributes: { type: 'button', 'aria-label': 'Next games' },
  });

  const controls = createElement('div', {
    className: 'carousel__controls',
    children: [previous, next],
  });
  const header = createElement('div', {
    className: 'section__header',
    children: [heading, controls],
  });
  const viewport = createElement('div', { className: 'carousel__viewport', children: [track] });
  const inner = createElement('div', { className: 'container', children: [header, viewport] });

  return createElement('section', { className: 'section carousel', children: [inner] });
}
