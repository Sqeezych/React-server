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
  const [todosForWiev, setTodosForWiev] = useState([]);
  const {isLoading, todosFromServer} = useRequestGetTodos(isRefresh, setTodosForWiev);
  const submitForm = useRequestSetTodo(todo, setTodo, refreshItems);
  const completeButton = useRequestUpdateTodo(refreshItems);
  const deleteButton = useRequestDeleteTodo(refreshItems);

  function refreshItems() {setIsRefresh(!isRefresh)};

  function inputOnChange({ target }) {
    let arr = [];
    setTodo(target.value);
    if (target.value !== '') {
      todosFromServer.forEach(elem => {
        if(elem.title.indexOf(target.value) !== -1) {
          console.log(target.value)
          console.log(elem.title)
          arr.push(elem)
        }
      });
      setTodosForWiev(arr);
    } else if (target.value === '') {
      setTodosForWiev(todosFromServer);
    }
    
  }
 
  return (
    <div className="container">
        <h1>Мой список дел</h1>
        <form className="taskForm" onSubmit={submitForm}>
            <input 
            type="text" 
            value={todo} 
            className="newTask" 
            onChange={inputOnChange}
            placeholder="Добавьте новое дело..." />
            <button type="submit">Добавить</button>
        </form>
        
        <div className="taskList">
          {isLoading && <div className='loader'></div>}
          {todosForWiev.length < 1 ? <div className="taskItem">Нет данных для отображения</div> : todosForWiev.map((elem) => {
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