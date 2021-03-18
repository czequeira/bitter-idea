export type Child = Component|string
export type Element = HTMLElement|Text
export type Content = string|(() => string)
export type Fn = ((...args: any[]) => any)
export interface Binds {
  [name: string]: Bind
}
export interface Events {
  [name: string]: Event
}

export class Bind {
  subscribers: Component[] = []

  constructor(
    private name: string,
    private value: any = null
  ) {}

  setValue(value: any) {
    this.value = value
    this.subscribers.forEach(i => i.refresh())
  }

  getValue(): any {
    return this.value
  }

  subscribe(component: Component) {
    this.subscribers.push(component)
  }
}

export class Event {
  constructor(
    private name: string,
    private fn: Fn = null,
  ) {}

  setFn(fn: Fn): void {
    this.fn = fn
  }

  exec(...args: any[]): any {
    return this.fn(...args)
  }
}

// export class Method {
//   constructor(
//     private name: string,
//     private fn: Fn = null
//   ) {}
//
//   exec(): any {
//     return this.fn()
//   }
// }

export class App {
  private element: HTMLElement = null
  private binds: Binds = {}

  constructor(
    private childs: Component[] = [],
  ) {
    this.element = document.getElementById('app')
    this.element.append(...childs.map(c => c.getElement()))
  }

  setChilds(...childs: Component[]) {
    this.childs = childs
    this.element.append(...childs.map(c => c.getElement()))
  }

  createBind(name: string, value: any = null): Bind {
    const bind = new Bind(name, value)
    this.binds[name] = bind
    return bind
  }
}

export class Component {
  private element: Element = null
  private events: Events = {}

  constructor(
    type: string = null,
    private content: Content = null,
    private childs: Component[] = [],
  ) {
    let textContent: string = null
    if (typeof content === 'string') textContent = content
    else if (typeof content === 'function') textContent = content()
    if (type) {
      this.element = document.createElement(type)
      this.element.innerText = textContent
      this.element.append(...childs.map(child => child.getElement()))
    }
    else {
      this.element = document.createTextNode(textContent)
    }
  }

  setChilds(...childs: Component[]): void {
    this.childs = childs
  }

  getElement(): Element {
    return this.element
  }

  addEvent(name: string, fn: Fn) {
    const event = new Event(name, fn)
    this.element.addEventListener(name, (...args: any[]) => event.exec(...args))
  }

  // exec(name: string) {
  //   const method = this.methods.find(i => i.name === name)
  //   return method.exec()
  // }

  refresh() {
    let textContent: string = null
    if (typeof this.content === 'string') textContent = this.content
    else if (typeof this.content === 'function') textContent = this.content()

    if (this.element instanceof HTMLElement) this.element.innerText = textContent
    else if (this.element instanceof Text) this.element.textContent = textContent
  }

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
