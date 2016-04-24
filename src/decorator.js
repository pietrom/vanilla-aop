function last(pseudoArray) {
   return pseudoArray[pseudoArray.length - 1]
}

function cloneArray(pseudoArray) {
   return Array.prototype.slice.call(pseudoArray)
}

function nop() {
   const done = last(arguments)
   done()
}

function factory(options) {
   const before = options.before || nop
   const after = options.after || nop
   return function decorator(fn) {
      return function proxy() {
         const proxyArgs = Array.prototype.slice.call(arguments, 0, arguments.length - 1)
         const beforeArgs = cloneArray(proxyArgs)
         const callback = last(arguments)
         beforeArgs.push(function() {
            const fnArgs = cloneArray(proxyArgs)
            fnArgs.push(function() {
               const results = arguments
               const afterArgs = cloneArray(proxyArgs)
               for(var i = 0; i < results.length; i++) {
                  afterArgs.push(results[i])
               }
               afterArgs.push(function() {
                  callback.apply(null, results)
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
