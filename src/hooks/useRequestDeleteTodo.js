export function useRequestDeleteTodo(refreshItems) {

  function deleteButton({ target }) {
    const url = "http://localhost:3000/todos" + '/' + Number(target.id)
    fetch(url, {
      method: "DELETE",
    })
      .then(rowResponse => rowResponse.json())
      .then(response => console.log('Дело удалено'))
    refreshItems()
  }
  
  return deleteButton

}