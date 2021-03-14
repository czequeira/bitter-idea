export type Child = Component|string
export type Element = HTMLElement|Text
export type Content = string

// export class Bind {
//   name: string = null
//   value: any = null
//   subscribers: Component[] = []
//
//   constructor({ name, value }) {
//     this.name = name
//     this.value = value
//   }
//
//   setValue(value: any) {
//     this.value = value
//     this.subscribers.forEach(i => i.refresh())
//   }
//
//   subscribe(component: Component) {
//     this.subscribers.push(component)
//   }
// }
//
// export class Method {
//   name: string = null
//   fn: any = null
//   component: Component = null
//
//   constructor({ name, fn, component }) {
//     this.name = name
//     this.fn = fn
//     this.component = component
//   }
//
//   exec() {
//     return this.fn(this.component.getBinds().map((i) => i.value))
//   }
// }

export class App {
  private element: HTMLElement = null

  constructor(
    private childs: Component[] = [],
  ) {
    this.element = document.getElementById('app')
    this.element.append(...childs.map(c => c.getElement()))
  }
}

export class Component {
  private element: Element = null

  constructor(
    type: string = null,
    private content: Content = null,
    private childs: Component[] = [],
  ) {
    if (type) {
      this.element = document.createElement(type)
      if (typeof content === 'string') this.element.innerText = content
      this.element.append(...childs.map(child => child.getElement()))
    }
    else this.element = document.createTextNode(content)
  }

  setChilds(...childs: Component[]): void {
    this.childs = childs
  }

  getElement(): Element {
    return this.element
  }

  // addEvent(event: string, method: string) {
  //   this.element.addEventListener(event, () => this.exec(method))
  // }

  // exec(name: string) {
  //   const method = this.methods.find(i => i.name === name)
  //   return method.exec()
  // }

  // refresh() {
    // this.element.innerText = this.fn(this.binds.map(i => i.value))
  // }

  // build() {
  //   const element = document.createElement(this.type)
  //   this.element = element
  //
  //   if (this.content) element.innerText = this.content
  //
  //   element.append(...this.childs.map(child => child.build()))
  //   return element
  // }
}
