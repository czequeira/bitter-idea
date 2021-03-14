import { App, Child, Component, Content } from "./class"

export function createApp(components: Component[]): App {
  return new App(components)
}

export function createComponent(
  type?: string,
  content?: Content,
  childs: Child[] = [],
): Component {
  return new Component(type, content, childs.map((c) => {
    if (c instanceof Component) return c
    return new Component(null, c)
  }))
}

