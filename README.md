# vanilla-aop

Vanilla AOP for Node.js

## Basic usage
    const factory = require('vanilla-aop').decorator
    const before = function()
    const decorate = factory()const logs = [];
    const before = function(x, y, done) {
      setTimeout(function() {
          logs.push('BEFORE ' + x + ', ' + y)
          done()
      }, 5)
    }
    const after = function(x, y, result, done) {
      setTimeout(function() {
          logs.push('AFTER ' + x + ', ' + y + ', ' + result)
          done()
      }, 5)
    }
    const sum = function(x, y, done) {
      const result = (x + y)
      logs.push('SUM ' + x + ', ' + y + ', ' + result)
      done(result)
    }

    const decorate = factory({ before: before, after: after })
    const decoratedSum = decorate(sum)

    decoratedSum(11, 19, function(result) {
      logs.push('THE END ' + result)
      // logs.length === 0
      // logs[0] === 'BEFORE 11, 19'
      // logs[1] === 'SUM 11, 19, 30'
      // logs[1] === 'AFTER 11, 19, 30'
      // logs[2] === 'THE END 30'
    })
