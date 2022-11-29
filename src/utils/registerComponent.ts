import Handlebars, { HelperOptions } from 'handlebars';
import Block from './Block';

export default function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(Component.componentName, ({ hash, data }: HelperOptions) => {
    if (!data.root.children) {
      data.root.children = {};
    }

    const { children } = data.root;

    const component = new Component(hash);

    children[component.id] = component;

    return `<div data-id="id-${component.id}"></div>`;
  });
}

// export default registerComponent;