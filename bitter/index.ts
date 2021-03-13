export function createApp(component: Component) {
  const app = document.getElementById('app')

  app.append(component.build())
}

class Bind {
  name: string = null
  value: any = null
  subscribers: Component[] = []

  constructor({ name, value }) {
    this.name = name
    this.value = value
  }

  setValue(value: any) {
    this.value = value
    this.subscribers.forEach(i => i.refresh())
  }

  subscribeComponent(component: Component) {
    this.subscribers.push(component)
  }
}

class Method {
  name: string = null
  fn: any = null
  component: Component = null

  constructor({ name, fn, component }) {
    this.name = name
    this.fn = fn
    this.component = component
  }

  exec() {
    return this.fn(this.component.binds.map((i) => i.value))
  }
}

export function createBind({ name, initial }) {
  return new Bind({ name, value: initial || null })
}

class Component {
  childs: Component[] = []
  type: string = null
  content: string = null
  binds: Bind[] = []
  fn: any = null
  methods: Method[] = []
  element = null

  constructor({ childs = [], type = null, content }) {
    this.childs = childs
    this.type = type
    this.content = content
  }

  setFunction(fn: any) {
    this.fn = fn
  }

  setChilds(...childs: Component[]) {
    this.childs = childs
  }

  setContent(content: any) {
    this.content = content
  }

  bind(bind: Bind) {
    this.binds.push(bind)
    bind.subscribeComponent(this)
  }

  addMethod(name: string, fn: any) {
    this.methods.push(new Method({ name, fn, component: this }))
  }

  addEvent(event: string, method: string) {
    this.element.addEventListener(event, () => this.exec(method))
  }

  exec(name: string) {
    const method = this.methods.find(i => i.name === name)
    return method.exec()
  }

  refresh() {
    this.element.innerText = this.fn(this.binds.map(i => i.value))
  }

  build() {
    const element = document.createElement(this.type)
    this.element = element

    if (this.content) element.innerText = this.content

    element.append(...this.childs.map(child => child.build()))
    return element
  }
}

export function componentToFunction(component: Component) {
  return function(...args: any[]) {
    const childs = args.map(arg => {
      if (arg instanceof Component) return arg
      return new Component({ content: arg })
    })

    const c = new Component(component)
    c.childs = childs
    return c
  }
}

export function createComponent(options: any) {
  return new Component(options)
}

