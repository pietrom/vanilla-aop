const factory = require('../src/decorator')

const before = function(x, y, done) {
   setTimeout(function() {
      console.log('BEFORE', x, y)
      done()
   }, 5)
}

const after = function(x, y, result, done) {
   setTimeout(function() {
      console.log('AFTER', x, y, result)
      done()
   }, 5)
}

const fn = function(x, y, done) {
   setTimeout(function() {
      const result = (x + y)
      console.log('+', x, y, result)
      done(result)
   }, 150)
}

const decorate = factory({
   before: before,
   after: after
})

const decorated = decorate(fn)

decorated(11, 19, function(result) {
   console.log('THE END', result)
})
