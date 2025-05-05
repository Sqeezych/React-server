import { useState, useRef } from 'react';
import './App.css';
import Form from './components/Form';
import TaskList from './components/TaskList';

import { 
  useRequestGetTodos,
  useRequestSetTodo,
  debounce
 } from './hooks';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todosForWiev, setTodosForWiev] = useState({});
  const [isSorted, setIsSorted] = useState(false);
  const isSortedRef = useRef(isSorted);
  const {isLoading, todosFromServer} = useRequestGetTodos(setTodosForWiev);
  const submitForm = useRequestSetTodo(todo, setTodo);

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
    </div>
  )
}