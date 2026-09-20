import { renderCommunity } from '../pages/community';
import { renderHome } from '../pages/home';
import { renderLibrary } from '../pages/library';
import { renderTournaments } from '../pages/tournaments';

export interface Route {
  path: string;
  title: string;
  render: () => HTMLElement;
}

export const routes: Route[] = [
  { path: '/', title: 'Home', render: renderHome },
  { path: '/library', title: 'Library', render: renderLibrary },
  { path: '/tournaments', title: 'Tournaments', render: renderTournaments },
  { path: '/community', title: 'Community', render: renderCommunity },
];
