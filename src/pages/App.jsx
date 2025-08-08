import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTodosFromServer, setTodosForWiev, loading } from "../actions";
// import { useRequestGetTodos } from "../hooks";

import './App.css';

import Form from '../components/Form';
import TaskList from '../components/TaskList';
import Task from './Task';
import NotFound from './NotFound';


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(loading(true));
    fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then((data) => {
        dispatch(setTodosFromServer(data));
        dispatch(setTodosForWiev(data));
      })
      .finally(() => dispatch(loading(false)))
    
  }, [])

  // const [isRefresh, setIsRefresh] = useState(false);
  // const [todo, setTodo] = useState('');
  // const [todosForWiev, setTodosForWiev] = useState([]);
  // const [isSorted, setIsSorted] = useState(false);
  // const isSortedRef = useRef(isSorted);
  // const {isLoading, todosFromServer} = useRequestGetTodos(isRefresh, setTodosForWiev);
  // const submitForm = useRequestSetTodo(todo, setTodo, refreshItems);

  // function refreshItems() {setIsRefresh(!isRefresh)};

  // function inputOnChange ({ target }) {
  //   setTodo(target.value);
  //   debouncedFunction(target.value, todosFromServer, setTodosForWiev);
  // } 

  // function sortButton() {
  //   setIsSorted(!isSorted);
  //   isSortedRef.current = !isSorted;

  //   if(isSortedRef.current) {
  //     todosForWiev.sort((a, b) => a.title.localeCompare(b.title, 'ru', {ignorePunctuation: true}));
  //   } else {
  //     setTodosForWiev(todosFromServer);
  //     setTodo('');
  //     refreshItems();
  //   }
  // }
 
  return (
    <>
      <Routes>
        <Route path="/" element={
            <div className="container">
              <h1>Мой список дел</h1>
              <Form /> 
              <TaskList/>
            </div>
        } /> 
        <Route path="/task/:id" element={<Task />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  )
}