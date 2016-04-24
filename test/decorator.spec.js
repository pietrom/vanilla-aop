const factory = require('../src/index').decorator;

describe('decorator', function() {
   it('can decorate function', function(testDone) {
      const logs = [];
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
         expect(logs.length).toBe(4);
         expect(logs[0]).toBe('BEFORE 11, 19')
         expect(logs[1]).toBe('SUM 11, 19, 30')
         expect(logs[2]).toBe('AFTER 11, 19, 30')
         expect(logs[3]).toBe('THE END 30')
         testDone()
      })
   })

   it('can decorate function with arbitrary numbers count', function(testDone) {
      const logs = [];
      const before = function() {
         const done = arguments[arguments.length - 1]
         done()
      }
      const after = function() {
         const done = arguments[arguments.length - 1]
         done()
      }
      const multiSum = function(a, b, c, d, e, done) {
         const result = (a + b + c + d + e)
         logs.push('SUM ' + result)
         done(result)
      }

      const decorate = factory({ before: before, after: after })
      const decoratedSum = decorate(multiSum)

      decoratedSum(1, 2, 3, 4, 5, function(result) {
         logs.push('THE END ' + result)
         expect(logs.length).toBe(2);
         expect(logs[0]).toBe('SUM 15')
         expect(logs[1]).toBe('THE END 15')
         testDone()
      })
   })
})
