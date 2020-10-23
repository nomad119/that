import { Component, Output } from 'rete'
import { TextControl } from '../controls/TextControl.js'
import * as Socket from '../socket'

export class ColorComponent extends Component {
  constructor () {
    super('Color')
  }

  builder (node) {
    var out1 = new Output('color', 'Color', Socket.color)

    return node
      .addControl(new TextControl(this.editor, 'color'))
      .addOutput(out1)
  }

  worker (node, inputs, outputs) {
    outputs.color = node.data.color
  }
}
