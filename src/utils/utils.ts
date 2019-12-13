
export function throttle(func: Function, wait: number) {
  let stop = false; 
  
  return function(...args) {
    if (!stop) {
      func.apply(this, args);
      stop = true;
      setTimeout(function(){stop = false}, wait);
    }
  }
}