import { Socket } from 'rete'

const value = new Socket('Value')
const color = new Socket('Color')

value.combineWith(color)
color.combineWith(value)

export { value, color }
