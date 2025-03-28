export const useRequestSetTodo = (todo, setTodo, refreshItems) => {
    
    function submitForm(event) {

        event.preventDefault();

        if (!todo) {
            alert('Введено некорректное значение')
        } else {
            fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                  "title": todo.trim(),
                  "completed": false
                }),
            })
            .finally(() => {
                setTodo('');
                refreshItems();
            })
        }
    }

    return submitForm
}