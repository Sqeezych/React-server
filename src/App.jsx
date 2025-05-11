import { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { 
  useRequestGetTodos,
  useRequestSetTodo,
  debounce
 } from './hooks';

import Form from './components/Form';
import TaskList from './components/TaskList';


export default function App() {

  const [isRefresh, setIsRefresh] = useState(false);
  const [todo, setTodo] = useState('');
  const [todosForWiev, setTodosForWiev] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const isSortedRef = useRef(isSorted);
  const {isLoading, todosFromServer} = useRequestGetTodos(isRefresh, setTodosForWiev);
  const submitForm = useRequestSetTodo(todo, setTodo, refreshItems);


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
    <>
      <div className="container">
          <h1>Мой список дел</h1>
          <Form 
            submitForm={submitForm} 
            todo={todo} 
            inputOnChange={inputOnChange}
            isSortedRef={isSortedRef}
            sortButton={sortButton}/> 
          
          <TaskList 
            isLoading={isLoading} 
            todosForWiev={todosForWiev} 
            todosFromServer={todosFromServer}
            refreshItems={refreshItems} />
      </div>
      {/* <Routes>
        <Route path='/' element={<MainPage />} /> 
        <Route path='' element={<MainPage />} /> 
        <Route path='' element={<MainPage />} /> 
      </Routes> */}
    </>
  )
}