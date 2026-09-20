import { createElement } from '../app/dom';
import type { LeaderboardRow } from '../data/home-content';

const columns = ['Rank', 'Player', 'Games played', 'Total score', 'Streak', 'Favorite game'];

function createHeadRow(): HTMLTableRowElement {
  return createElement('tr', {
    children: columns.map((label) =>
      createElement('th', { text: label, attributes: { scope: 'col' } }),
    ),
  });
}

function createBodyRow(row: LeaderboardRow): HTMLTableRowElement {
  const rank = createElement('th', {
    className: 'leaderboard__rank',
    text: `#${row.rank}`,
    attributes: { scope: 'row' },
  });

  const cells = [
    createElement('td', { text: row.playerName }),
    createElement('td', { text: String(row.gamesPlayed) }),
    createElement('td', { text: row.totalScore.toLocaleString('en-US') }),
    createElement('td', { text: `${row.streakDays} days` }),
    createElement('td', { text: row.favoriteGameName }),
  ];

  return createElement('tr', { children: [rank, ...cells] });
}

export function createLeaderboard(rows: LeaderboardRow[]): HTMLElement {
  const table = createElement('table', {
    className: 'leaderboard__table',
    children: [
      createElement('caption', { className: 'visually-hidden', text: 'Top players this week' }),
      createElement('thead', { children: [createHeadRow()] }),
      createElement('tbody', { children: rows.map((row) => createBodyRow(row)) }),
    ],
  });

  const heading = createElement('h2', {
    className: 'section__title',
    text: 'Top Players This Week',
  });
  const scroller = createElement('div', { className: 'leaderboard__scroller', children: [table] });
  const inner = createElement('div', { className: 'container', children: [heading, scroller] });

  return createElement('section', { className: 'section leaderboard', children: [inner] });
}
