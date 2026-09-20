import { clearElement } from './dom';
import type { Route } from './routes';
import { renderNotFound } from '../pages/not-found';

export class Router {
  private readonly outlet: HTMLElement;

  private readonly routes: Route[];

  constructor(outlet: HTMLElement, routes: Route[]) {
    this.outlet = outlet;
    this.routes = routes;
  }

  private renderCurrent(): void {
    const route = this.routes.find((item) => item.path === location.pathname);

    document.title = route === undefined ? 'MiniGames' : `MiniGames — ${route.title}`;

    clearElement(this.outlet);
    this.outlet.append(route === undefined ? renderNotFound() : route.render());
  }

  public start(): void {
    addEventListener('popstate', () => {
      this.renderCurrent();
    });

    this.renderCurrent();
  }

  public navigate(path: string): void {
    if (path !== location.pathname) {
      history.pushState({}, '', path);
    }

    this.renderCurrent();
  }
}
