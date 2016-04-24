const factory = require('../src/decorator.js');

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
})
