export default function deleteButton(target) {

    const url = "http://localhost:3000/todos" + '/' + Number(target.target.id)

    fetch(url, {
      method: "DELETE",
    })

    refreshItems()
}