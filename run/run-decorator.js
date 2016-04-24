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

const fn1 = function(x, y, done) {
   setTimeout(function() {
      const result = (x + y)
      console.log('+', x, y, result)
      done(result)
   }, 150)
}

const fn2 = function(x, y, done) {
   setTimeout(function() {
      const result = (x - y)
      console.log('-', x, y, result)
      done(result)
   }, 150)
}

const decorate = factory({
   before: before,
   after: after
})

const decorated1 = decorate(fn1)
const decorated2 = decorate(fn2)

decorated1(11, 19, function(result) {
   console.log('THE END', result)
})

decorated2(11, 19, function(result) {
   console.log('THE END', result)
})
