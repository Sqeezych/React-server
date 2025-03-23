import { useState } from 'react';
import './hooks/useRequestGetTodos'
import './App.css';
import { 
  useRequestGetTodos,
  useRequestDeleteTodo,
  useRequestSetTodo,
  useRequestUpdateTodo
 } from './hooks';

export default function App() {

  const [isRefresh, setIsRefresh] = useState(false);
  const [todo, setTodo] = useState('');
  const {isLoading, todos} = useRequestGetTodos(isRefresh);
  const submitForm = useRequestSetTodo(todo, setTodo, refreshItems)
  const completeButton = useRequestUpdateTodo(refreshItems)
  const deleteButton = useRequestDeleteTodo(refreshItems)

  function refreshItems() {setIsRefresh(!isRefresh)};
 
  return (
    <div className="container">
        <h1>Мой список дел</h1>
        <form className="taskForm" onSubmit={submitForm}>
            <input 
            type="text" 
            value={todo} 
            className="newTask" 
            onChange={({ target }) => setTodo(target.value)}
            placeholder="Добавьте новое дело..." />
            <button type="submit">Добавить</button>
        </form>
        
        <div className="taskList">
          {isLoading && <div className='loader'></div>}
          {todos.map((elem) => {
            return <div className="taskItem" key={elem.id}>
              <p className={elem.completed ? "completed" : undefined}>{elem.title}</p>
              <button className='deleteBtn' id={elem.id} onClick={deleteButton}>Delete</button>
              <button className='completeBtn' id={elem.id} onClick={completeButton}>Done</button>
            </div>
          })}
        </div>
    </div>
  )
}