function factory(options) {
   const before = options.before
   const after = options.after
   return function decorator(fn) {
      return function proxy() {
         const proxyArgs = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
         const beforeArgs = Array.prototype.slice.call(proxyArgs)
         const callback = arguments[arguments.length - 1]
         beforeArgs.push(function() {
            const fnArgs = Array.prototype.slice.call(proxyArgs)
            fnArgs.push(function(result) {
               const afterArgs = Array.prototype.slice.call(proxyArgs)
               afterArgs.push(result)
               afterArgs.push(function() {
                  callback(result)
               })
               after.apply(null, afterArgs)
            })
            fn.apply(null, fnArgs)
         })
         before.apply(null, beforeArgs)
      }
   }
}

module.exports = factory
