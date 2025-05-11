export const useRequestUpdateTodo = (refreshItems, todosForWiev) => {
    
    function updateData(url, status) {
        fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                "completed": status
                }),
            })
                .then(rowResponse => rowResponse.json())
                .then(answer => console.log('Дело выполнено'))
                .finally(() => refreshItems())
    }

    function completeButton({ target }) {

        const url = "http://localhost:3000/todos" + '/' + Number(target.id)

        if(todosForWiev.completed) {
            updateData(url, false)
        } else {
            updateData(url, true)
        }
    }
    
    return completeButton
}