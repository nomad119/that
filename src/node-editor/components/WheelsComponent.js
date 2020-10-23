import { Component, Input } from 'rete'
import * as Socket from '../socket'
import { assignMaterialColor } from '../helpers/color'

export class WheelsComponent extends Component {
  constructor (car) {
    super('Wheels')
    this.car = car
  }

  builder (node) {
    const inp = new Input('color', 'Color', Socket.color)

    node.addInput(inp)
  }

  worker (node, inputs, outputs) {
    if (this.car.wheelMaterial) { assignMaterialColor(this.car.wheelMaterial, inputs.color[0]) }
  }
}
