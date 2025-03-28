export const useRequestUpdateTodo = (refreshItems) => {

    function completeButton({ target }) {

        const url = "http://localhost:3000/todos" + '/' + Number(target.id)

        fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
              "completed": true
            }),
        })
            .then(rowResponse => rowResponse.json())
            .then(answer => console.log('Дело выполнено'))
            .finally(() => refreshItems())
    }
    
    return completeButton
}