interface ElementOptions {
  className?: string;
  text?: string;
  attributes?: Record<string, string>;
  children?: Node[];
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions = {},
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (options.className !== undefined) {
    element.className = options.className;
  }

  if (options.text !== undefined) {
    element.textContent = options.text;
  }

  if (options.attributes !== undefined) {
    for (const [name, value] of Object.entries(options.attributes)) {
      element.setAttribute(name, value);
    }
  }

  if (options.children !== undefined) {
    element.append(...options.children);
  }

  return element;
}

export function clearElement(element: HTMLElement): void {
  element.replaceChildren();
}
