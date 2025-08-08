export const loading = (status) => {
    return {
        type: "LOADING",
        payload: status,
    }
}