export function debounce(func, delay) {

    let timeoutId = setTimeout(() => {
        func.apply(this);
      }, delay);
    
    return function() {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        func.apply(this);
      }, delay);
    };
  }