import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => setTodos(data));
  }, []);

  function onImputChange ({ target }) {
    setTodo(target.value)
  }
  
  return (
    <>
      <div className={'todoList'}>
        <div className={'todoHeader'}>TODO LIST</div>
        <input className={'todoInput'} value={todo} onChange={onImputChange} type="text" />
        {todos.map((e) => <div className={'todoItem'} key={e.id}>User №{e.userId} - {e.title}</div>)}
      </div>
    </>
  )
}