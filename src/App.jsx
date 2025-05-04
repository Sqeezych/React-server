import { useState, useRef } from 'react';
import './App.css';
import Form from './components/Form';
import TaskList from './components/TaksItem';

import { 
  useRequestGetTodos,
  // useRequestDeleteTodo,
  useRequestSetTodo,
  // useRequestUpdateTodo,
  debounce
 } from './hooks';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todosForWiev, setTodosForWiev] = useState({});
  const [isSorted, setIsSorted] = useState(false);
  const isSortedRef = useRef(isSorted);
  const {isLoading, todosFromServer} = useRequestGetTodos(setTodosForWiev);
  const submitForm = useRequestSetTodo(todo, setTodo);
  // const completeButton = useRequestUpdateTodo();
  // const deleteButton = useRequestDeleteTodo();

  function inputOnChange({ target }) {
    let arr = [];
    setTodo(target.value);
    debounce (() => {
      if (target.value !== '') {
        Object.entries(todosFromServer).forEach(([id, elem]) => {
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
      const entriesTodos = Object.entries(todosForWiev);
      entriesTodos.sort((a, b) => a[1].title.localeCompare(b[1].title, 'en', { ignorePunctuation: true }))
      const sortedTodos = Object.fromEntries(entriesTodos);
      setTodosForWiev(sortedTodos);
    } else {
      setTodosForWiev(todosFromServer);
      setTodo('');
    }

  }
 
  return (
    <div className="container">
        <h1>Мой список дел</h1>
        <Form 
          submitForm={submitForm} 
          todo={todo} 
          inputOnChange={inputOnChange}
          isSortedRef={isSortedRef}
          sortButton={sortButton} />
        
        <TaskList isLoading={isLoading} todosForWiev={todosForWiev} />
        {/* <div className="taskList">
          {isLoading && <div className='loader'></div>}
          {Object.entries(todosForWiev).length < 1 ? <div className="taskItem">Нет данных для отображения</div> : Object.entries(todosForWiev).map(([id, elem]) => {
            return <TaskItem key={id} id={id} elem={elem} deleteButton={deleteButton} completeButton={completeButton}/>
          })}
        </div> */}
    </div>
  )
}