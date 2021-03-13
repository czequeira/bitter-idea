import { createApp, createComponent, createBind } from '../bitter/index'

const count = createBind({ name: 'count', initial: 0 })

const paragraph = createComponent({ content: 'initial value', type: 'p' })
paragraph.setFunction((count: number) => `count: ${count}`)
paragraph.bind(count) // esto tiene que hacerlo interno el framework

const button = createComponent({ type: 'button', content: '+1' })
button.addMethod('plusOne', () => count.setValue(count.value + 1))

const App = createComponent({ childs: [paragraph, button] })

createApp(App)

button.addEvent('click', 'plusOne')
