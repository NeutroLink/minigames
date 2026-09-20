import { clearElement } from './dom';
import { currentPath, toHref } from './paths';
import type { Route } from './routes';
import { renderNotFound } from '../pages/not-found';

export class Router {
  private readonly outlet: HTMLElement;

  private readonly routes: Route[];

  private readonly onChange: (path: string) => void;

  constructor(outlet: HTMLElement, routes: Route[], onChange: (path: string) => void) {
    this.outlet = outlet;
    this.routes = routes;
    this.onChange = onChange;
  }

  private renderCurrent(): void {
    const path = currentPath();
    const route = this.routes.find((item) => item.path === path);

    document.title = route === undefined ? 'MiniGames' : `MiniGames — ${route.title}`;

    clearElement(this.outlet);
    this.outlet.append(route === undefined ? renderNotFound() : route.render());
    scrollTo({ top: 0 });
    this.onChange(path);
  }

  public start(): void {
    addEventListener('popstate', () => {
      this.renderCurrent();
    });

    this.renderCurrent();
  }

  public navigate(path: string): void {
    if (path !== currentPath()) {
      history.pushState({}, '', toHref(path));
    }

    this.renderCurrent();
  }
}
