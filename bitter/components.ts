import { Child, Component, Content } from './class';
import { createComponent } from './index'

export function p(content: Content, ...childs: Child[] ): Component {
  return createComponent('p', content, childs)
}
