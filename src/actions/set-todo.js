export const setTodo = (todo) => {
    return {
        type: "SET_TODO",
        payload: todo,
    }
}