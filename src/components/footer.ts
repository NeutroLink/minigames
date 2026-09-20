import { createElement } from '../app/dom';
import { toHref } from '../app/paths';

const HOME_PATH = '/';

const exploreLinks = ['Home', 'Library', 'Categories', 'Tournaments'];
const companyLinks = ['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'];
const socialLinks = [
  { label: 'Share MiniGames', glyph: '⇗' },
  { label: 'MiniGames chat', glyph: '💬' },
  { label: 'MiniGames feed', glyph: '⌁' },
];

function createColumn(
  title: string,
  labels: string[],
  onNavigate: (path: string) => void,
): HTMLElement {
  const items = labels.map((label) => {
    const link = createElement('a', {
      className: 'footer__link',
      text: label,
      attributes: { href: toHref(HOME_PATH) },
    });

    link.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      onNavigate(HOME_PATH);
    });

    return createElement('li', { children: [link] });
  });

  return createElement('div', {
    className: 'footer__column',
    children: [
      createElement('h3', { className: 'footer__heading', text: title }),
      createElement('ul', { className: 'footer__list', children: items }),
    ],
  });
}

function createSocialColumn(onNavigate: (path: string) => void): HTMLElement {
  const items = socialLinks.map((social) => {
    const link = createElement('a', {
      className: 'footer__social',
      text: social.glyph,
      attributes: { href: toHref(HOME_PATH), 'aria-label': social.label },
    });

    link.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      onNavigate(HOME_PATH);
    });

    return createElement('li', { children: [link] });
  });

  return createElement('div', {
    className: 'footer__column',
    children: [
      createElement('h3', { className: 'footer__heading', text: 'Community' }),
      createElement('ul', { className: 'footer__socials', children: items }),
    ],
  });
}

function createBadgeLink(badge: string, label: string, href: string): HTMLElement {
  return createElement('a', {
    className: 'footer__badge-link',
    attributes: { href, target: '_blank', rel: 'noopener noreferrer' },
    children: [
      createElement('span', {
        className: 'footer__badge',
        text: badge,
        attributes: { 'aria-hidden': 'true' },
      }),
      createElement('span', { text: label }),
    ],
  });
}

export function createFooter(onNavigate: (path: string) => void): HTMLElement {
  const brand = createElement('div', {
    className: 'footer__brand',
    children: [
      createElement('p', { className: 'footer__logo', text: 'MiniGames' }),
      createElement('p', {
        className: 'footer__about',
        text: 'Take a short break and have fun. Hundreds of curated casual mini-games right in your web browser. No download required.',
      }),
    ],
  });

  const top = createElement('div', {
    className: 'footer__top',
    children: [
      brand,
      createColumn('Explore', exploreLinks, onNavigate),
      createColumn('Company', companyLinks, onNavigate),
      createSocialColumn(onNavigate),
    ],
  });

  const bottom = createElement('div', {
    className: 'footer__bottom',
    children: [
      createElement('p', {
        className: 'footer__copyright',
        text: '© 2026 MiniGames. All rights reserved.',
      }),
      createBadgeLink('RS', 'RS School', 'https://rs.school/courses/short-track'),
      createBadgeLink('</>', '@NeutroLink', 'https://github.com/NeutroLink'),
      createElement('p', { className: 'footer__copyright', text: 'Designed with love' }),
    ],
  });

  const inner = createElement('div', { className: 'container', children: [top, bottom] });

  return createElement('footer', { className: 'footer', children: [inner] });
}
