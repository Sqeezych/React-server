import { useState, useRef } from 'react';
import './hooks/useRequestGetTodos'
import './App.css';
import { 
  useRequestGetTodos,
  useRequestDeleteTodo,
  useRequestSetTodo,
  useRequestUpdateTodo,
  debounce
 } from './hooks';

export default function App() {

  const [isRefresh, setIsRefresh] = useState(false);
  const [todo, setTodo] = useState('');
  const [todosForWiev, setTodosForWiev] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const isSortedRef = useRef(isSorted);
  const {isLoading, todosFromServer} = useRequestGetTodos(isRefresh, setTodosForWiev);
  const submitForm = useRequestSetTodo(todo, setTodo, refreshItems);
  const completeButton = useRequestUpdateTodo(refreshItems);
  const deleteButton = useRequestDeleteTodo(refreshItems);

  function refreshItems() {setIsRefresh(!isRefresh)};

  function inputOnChange({ target }) {
    let arr = [];
    setTodo(target.value);
    debounce (() => {
      if (target.value !== '') {
        todosFromServer.forEach((elem) => {
          if(elem.title.toLowerCase().indexOf(target.value.toLowerCase()) !== -1) {
            arr.push(elem)
          }
        });
        setTodosForWiev(arr);
      } else if (target.value === '') {
        setTodosForWiev(todosFromServer);
      }}, 1500) 
  }

  function sortButton() {
    setIsSorted(!isSorted);
    isSortedRef.current = !isSorted;

    if(isSortedRef.current) {
      todosForWiev.sort((a, b) => a.title.localeCompare(b.title, 'ru', {ignorePunctuation: true}));
    } else {
      setTodosForWiev(todosFromServer);
      setTodo('');
      setIsRefresh(!isRefresh);
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
            <button className="submitButton" type="submit">Добавить</button>
            <button className={isSortedRef.current ? "sortButton active" : "sortButton"} onClick={sortButton} type="button">Сортировать</button>
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