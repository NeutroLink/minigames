import './styles/main.scss';
import { renderApp } from './app/app';
import { createElement } from './app/dom';

const root = createElement('div', { attributes: { id: 'app' } });

document.body.append(root);
renderApp(root);
