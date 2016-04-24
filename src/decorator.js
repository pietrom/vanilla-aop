function factory(options) {
   const before = options.before
   const after = options.after
   return function decorator(fn) {
      return function proxy(x, y, callback) {
         before(x, y, function() {
            fn(x, y, function(result) {
               after(x, y, result, function() {
                  callback(result)
               })
            })
         })
      }
   }
}

module.exports = factory
