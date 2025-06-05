import { useState, useRef } from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';
import { 
  useRequestGetTodos,
  useRequestSetTodo,
  debounce
 } from '../hooks';

import Form from '../components/Form';
import TaskList from '../components/TaskList';
import Task from './Task';
import NotFound from './NotFound';

const debouncedFunction = debounce (([value, dataFromServer, setter]) => {
      let arr = [];
      if (value !== '') {
        dataFromServer.forEach((elem) => {
          if(elem.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
            arr.push(elem)
          }
        });
        setter(arr);
      } else if (value === '') {
        setter(dataFromServer);
      }}, 1000)

export default function App() {

  const [isRefresh, setIsRefresh] = useState(false);
  const [todo, setTodo] = useState('');
  const [todosForWiev, setTodosForWiev] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const isSortedRef = useRef(isSorted);
  const {isLoading, todosFromServer} = useRequestGetTodos(isRefresh, setTodosForWiev);
  const submitForm = useRequestSetTodo(todo, setTodo, refreshItems);

  function refreshItems() {setIsRefresh(!isRefresh)};

  function inputOnChange ({ target }) {
    setTodo(target.value);
    debouncedFunction(target.value, todosFromServer, setTodosForWiev);
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
      <Routes>
        <Route path="/" element={
            <div className="container">
              <h1>Мой список дел</h1>
              <Form 
                submitForm={submitForm} 
                todo={todo} 
                todosForWiev={todosForWiev}
                todosFromServer={todosFromServer}
                inputOnChange={inputOnChange}
                isSortedRef={isSortedRef}
                sortButton={sortButton}/> 
            
              <TaskList 
                isLoading={isLoading} 
                todosForWiev={todosForWiev} 
                todosFromServer={todosFromServer}
                refreshItems={refreshItems} />
            </div>
        } /> 
        <Route path="/task/:id" element={<Task isRefresh={isRefresh} refreshItems={refreshItems} />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  )
}

// function MainPage () {
//     return (
//       <div className="container">
//         <h1>Мой список дел</h1>
//         <Form 
//           submitForm={submitForm} 
//           todo={todo} 
//           todosForWiev={todosForWiev}
//           todosFromServer={todosFromServer}
//           isSortedRef={isSortedRef}
//           sortButton={sortButton}/> 
//           inputOnChange={inputOnChange}
            
//         <TaskList 
//           todosForWiev={todosForWiev} 
//           todosFromServer={todosFromServer}
//           refreshItems={refreshItems} />
//           isLoading={isLoading} 
//       </div>
//     )
//   }