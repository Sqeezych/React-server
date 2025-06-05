export const useRequestUpdateTodo = (refreshItems, elem) => {
    
    function updateData(url, status) {
        fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                "completed": status
                }),
            })
                .then(rowResponse => rowResponse.json())
                .finally(() => refreshItems())
    }

    function completeButton({ target }) {

        const url = "http://localhost:3000/todos" + '/' + Number(target.id)

        if(elem.completed) {
            updateData(url, false)
        } else {
            updateData(url, true)
        }
    }
    
    return completeButton
}