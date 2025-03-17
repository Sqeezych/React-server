import { useState, useEffect } from 'react';
import './hooks/useRequestGetTodos'
import './App.css';

export default function App() {

  
  const [isRefresh, setIsRefresh] = useState(false)
  const [todo, setTodo] = useState('');
  // const [todos, setTodos] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  function refreshItems() {setIsRefresh(!isRefresh)}

  useRequestGetTodos(isRefresh)
  // useEffect(() => {

  //   setIsLoading(true)
  //   fetch("http://localhost:3000/todos")
  //     .then(response => response.json())
  //     .then(data => setTodos(data))
  //     .finally(() => setIsLoading(false))

  // }, [isRefresh])

  function onImputChange({ target }) {
    setTodo(target.value)
  }

  function submitForm (event) {
    event.preventDefault()
    
    if(todo) {
      fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          "title": todo,
          "completed": false
        }),
      })
      setTodo('')
      refreshItems()
    } else {
      alert('Неправильное наименование дела')
    }
    
  }

  // function deleteButton(target) {

  //   const url = "http://localhost:3000/todos" + '/' + Number(target.target.id)

  //   fetch(url, {
  //     method: "DELETE",
  //   })

  //   refreshItems()
  // }

  function completeButton(target) {

    const url = "http://localhost:3000/todos" + '/' + Number(target.target.id)
    
    fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        "completed": true
      }),
    })
      .then(rowResponse => rowResponse.json())
      .then(answer => console.log('Дело выполнено'))

    refreshItems()
  }
  
  return (
    <div className="container">
        <h1>Мой список дел</h1>
        <form className="taskForm" onSubmit={submitForm}>
            <input 
            type="text" 
            value={todo} 
            className="newTask" 
            onChange={onImputChange}
            placeholder="Добавьте новое дело..." />
            <button type="submit">Добавить</button>
        </form>
        
        <div className="taskList">
          {isLoading && <div className='loader'></div>}
          {todos.map((elem) => {
            return <div className="taskItem" key={elem.id}>
              <p className={elem.completed ? "completed" : undefined}>{elem.title}</p>
              <button className='deleteBtn' id={elem.id} onClick={Modules.deleteButton}>Delete</button>
              <button className='completeBtn' id={elem.id} onClick={completeButton}>Done</button>
            </div>
          })}
        </div>
    </div>
  )
}