export function debounce(func, delay) {

    let timeout;
    
    return function (...args) { 
      clearTimeout(timeout);
      return timeout = setTimeout(() => func(args), delay);
    };
}

  export const debouncedFunction = debounce (([value, dataFromServer, dispatch, action]) => {
        let arr = [];
        if (value !== '') {
            dataFromServer.forEach((elem) => {
                if(elem.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                    arr.push(elem);
                }
            });
            dispatch(action(arr));
        } else if (value === '') {
            dispatch(action(dataFromServer));
        }}, 1000)

// const debouncedFunction = debounce (([value, dataFromServer, setter]) => {
//     let arr = [];
//     if (value !== '') {
//     dataFromServer.forEach((elem) => {
//         if(elem.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
//             arr.push(elem)
//         }
//     });
//     setter(arr);
//     } else if (value === '') {
//         setter(dataFromServer);
// }}, 1000)