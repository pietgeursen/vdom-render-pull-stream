var h = require('virtual-dom/h')
var pull = require('pull-stream')
var conways = require('conways')

var classNames = require('classnames')

var main = document.querySelector('#container')
var vdomRenderStream = require('../')

function boards(size) {

  function spawnRandom(board){
    return board.map(function(row) {
      return row.map(function(cell) {
        return Math.random() > 0.7 
      })
    }) 
  }

  var board = conways.createBoard(size)
    board = spawnRandom(board)

    return  function read(abort, cb) {
      if(abort) return cb(true) 
        board = conways.nextBoard(board)
          cb(null, board.toJS())
    }
}

function render (board) {
  return h('#board',{}, 
    board.map(function(row){
      return h('.row', {}, 
        row.map(function(cell){
          return h('div', {className: classNames('cell', {alive: cell})})
        }))
    }))
}

var vdomSink = vdomRenderStream(render, main)
pull(boards(10), vdomSink)



