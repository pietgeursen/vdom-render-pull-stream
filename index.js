var pull = require('pull-stream')

var vdom = {
  create: require('virtual-dom/create-element'),
  diff: require('virtual-dom/diff'),
  patch: require('virtual-dom/patch')
}
var mainLoop = require('main-loop')

module.exports = streamVdom

function streamVdom (render, element) {
  var loop = null
  var render = render
  var element = element
    
  function updateVdom(props)  {
    objectMode: true,
    write: function writeVdom (props, enc, cb) {
      if (loop === null) {
        loop = mainLoop(props, render, vdom)
        element.appendChild(loop.target)
      } else {
        loop.update(props)
      }
      process.nextTick(cb)
    }
  })

  return pull.drain(updateVdom, null)
}
