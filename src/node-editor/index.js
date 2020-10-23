import Rete from 'rete'
import VueRenderPlugin from 'rete-vue-render-plugin'
import ConnectionPlugin from 'rete-connection-plugin'
import AreaPlugin from 'rete-area-plugin'
import ContextMenuPlugin from 'rete-context-menu-plugin'
// import { TextControl } from './controls/TextControl.js'
import { ColorComponent } from './components/ColorComponent'
// import * as Socket from './sockets'
import { BodyComponent } from './components/BodyComponent'
import { WheelsComponent } from './components/WheelsComponent'
import { AddComponent } from './components/AddComponent'
import data from './data.json'

export default async function (container, configurator) {
  var components = [
    new ColorComponent(),
    new AddComponent(),
    new WheelsComponent(configurator.car),
    new BodyComponent(configurator.car)
  ]

  var editor = new Rete.NodeEditor('demo@0.1.0', container)
  editor.use(ConnectionPlugin)
  editor.use(VueRenderPlugin)
  editor.use(ContextMenuPlugin)
  editor.use(AreaPlugin)

  var engine = new Rete.Engine('demo@0.1.0')

  components.map((c) => {
    editor.register(c)
    engine.register(c)
  })

  editor.on(
    'process nodecreated noderemoved connectioncreated connectionremoved',
    async () => {
      await engine.abort()
      console.log('editor', editor)
      await engine.process(editor.toJSON())
    }
  )

  await editor.fromJSON(data)

  editor.view.resize()
  AreaPlugin.zoomAt(editor)
  setTimeout(() => editor.trigger('process'), 1000)
}
