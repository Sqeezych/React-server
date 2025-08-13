import { Routes, Route } from "react-router-dom";
import { useRequestGetTodos } from "../hooks";

import './App.css';

import Main from './Main';
import Task from './Task';
import NotFound from './NotFound';


export default function App() {
  useRequestGetTodos();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/task/:id" element={<Task />} /> 
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  )
}