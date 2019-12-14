
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

export function adjustDateToLimits(date, minDate, maxDate) {
  if (date.getTime() < minDate.getTime()) {
    date = minDate;
  }
  if (date.getTime() > maxDate.getTime()) {
    date = maxDate;
  }

  return (new Date(date));
}