export const setTodosFromServer = (data) => {
    return {
        type: "SET_TODOS_FROM_SERVER",
        payload: data,
    }
}