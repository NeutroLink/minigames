import './styles/main.scss';
import { renderApp } from './app/app';
const root = document.querySelector<HTMLElement>('#app');
if (root) {
  renderApp(root);
}
