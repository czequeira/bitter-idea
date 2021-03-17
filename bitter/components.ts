import { Child, Component, Content, Fn } from './class';
import { createComponent } from './index'

export function p(content: Content, ...childs: Child[] ): Component {
  return createComponent('p', content, childs)
}

export function button(fn: Fn, ...childs: Child[]): Component {
  const button = createComponent('button', null, childs)
  button.addEvent('click', fn, 'click')
  return button
}
