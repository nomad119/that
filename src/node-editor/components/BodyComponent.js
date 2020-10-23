import { Component, Input } from 'rete'
import * as Socket from '../socket'
import {
  assignMaterialColor,
  assignMaterialGlossiness
} from '../helpers/color'

export class BodyComponent extends Component {
  constructor (car) {
    super('Body')
    this.car = car
  }

  builder (node) {
    const inp = new Input('color', 'Color', Socket.color)
    const inp2 = new Input('gloss', 'Glossiness', Socket.color)

    node.addInput(inp).addInput(inp2)
  }

  worker (node, inputs, outputs) {
    if (this.car.mainMaterial) {
      assignMaterialColor(this.car.mainMaterial, inputs.color[0])
      assignMaterialGlossiness(this.car.mainMaterial, inputs.gloss[0])
    }
  }
}
