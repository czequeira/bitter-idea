import { createComponent, componentToFunction } from './index'

const P = createComponent({ type: 'p' })
const p = componentToFunction(P)

