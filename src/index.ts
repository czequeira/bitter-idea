import { createApp } from '../bitter/index'
import { p, button } from '../bitter/components'

const app = createApp([])
const count = app.createBind('count', 0)

const c1 = p(() => `count: ${count.getValue()}`)
const bn = button(() => count.setValue(parseInt(count.getValue()) + 1), '+1')

count.subscribe(c1)

app.setChilds(c1, bn)

