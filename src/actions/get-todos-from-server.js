// export const getTodosFromServer = () => {
//     return (dispatch) => {
//         fetch("http://localhost:3000/todos")
//             .then(response => response.json())
//             .then((dataFromServer) => {
//                 dispatch({
//                     type: "GET_TODOS_FROM_SERVER",
//                     payload: dataFromServer,
//                 })
//             })
//     }
// }

export const getTodosFromServer = (dataFromServer) => {
    return {
        type: "GET_TODOS_FROM_SERVER",
        payload: dataFromServer,
    }
}