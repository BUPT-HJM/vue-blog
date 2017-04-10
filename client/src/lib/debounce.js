export default function(fn, time) {
  let timer
  return function() {
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, time || 300)
  }
}
