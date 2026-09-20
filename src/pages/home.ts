import { createElement } from '../app/dom';
import { createCarousel } from '../components/carousel';
import { createDeveloperSection } from '../components/developer';
import { createHero } from '../components/hero';
import { createLeaderboard } from '../components/leaderboard';
import { leaderboard, newGames } from '../data/home-content';

export function renderHome(): HTMLElement {
  return createElement('div', {
    className: 'page',
    children: [
      createHero(),
      createCarousel(newGames),
      createLeaderboard(leaderboard),
      createDeveloperSection(),
    ],
  });
}
