var pull = require('pull-stream')
var mainLoop = require('main-loop')

var vdom = {
  create: require('virtual-dom/create-element'),
  diff: require('virtual-dom/diff'),
  patch: require('virtual-dom/patch')
}

module.exports = streamVdom

function streamVdom (render, element) {
  var loop = null
  var render = render
  var element = element
  
  function updateVdom(props)  {
    if (loop === null) {
      loop = mainLoop(props, render, vdom)
      element.appendChild(loop.target)
    } else {
      loop.update(props)
      return true
    }
    return true
  }

  return pull.drain(updateVdom, null)
}
