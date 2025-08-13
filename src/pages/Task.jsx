import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectIsRefresh } from '../selectors';

import { 
    useRequestDeleteTodo,
    useRequestUpdateTodo,
} from '../hooks';
import NotFound from './NotFound';

import styles from './Task.module.css';

export default function Task() {
    const [todo, setTodo] = useState('');
    const params = useParams();
    const isRefresh = useSelector(selectIsRefresh);
    const completeButton = useRequestUpdateTodo(todo);
    const deleteButton = useRequestDeleteTodo();
    
    useEffect(() => {
        fetch(`http://localhost:3000/todos/${params.id}`)
            .then(response => response.json())
            .then(data => setTodo(data))
            .catch(error => console.log(error.message))
    }, [isRefresh])

    function createJSX () {
        return (<div className={styles.container}>
                <button className={styles.backToMain}><Link to='/'>На главную</Link></button>
                <p className={todo.completed ? styles.completed : ''}>{todo.title}</p>
                <div className={styles.buttonsDiv}>
                    <button className={styles.deleteBtn} id={params.id} onClick={deleteButton}>Удал.</button>
                    <button className={styles.completeBtn} id={params.id} onClick={completeButton}>Вып.</button>
                </div>
            </div>)
    }

    return (
        <>  
            {todo.title ? createJSX() : <NotFound />}
        </>
    )
}

{/* <div className={styles.container}>
                Страница не найдена
            </div>
            <div className={styles.container}>
                <p className={elem.completed ? styles.completed : ''}>{elem.title}</p>
                <button className={styles.deleteBtn} id={params.id} onClick={deleteButton}>Удал.</button>
                <button className={styles.completeBtn} id={params.id} onClick={completeButton}>Вып.</button>
            </div> */}

            // {elem.title ? 
            // (<div className={styles.container}>
            //     <button className={styles.backToMain}><Link to='/'>На главную</Link></button>
            //     <p className={elem.completed ? styles.completed : ''}>{elem.title}</p>
            //     <div className={styles.buttonsDiv}>
            //         <button className={styles.deleteBtn} id={params.id} onClick={deleteButton}>Удал.</button>
            //         <button className={styles.completeBtn} id={params.id} onClick={completeButton}>Вып.</button>
            //     </div>
            // </div>) : <NotFound />}

    // export default function Task() {
    // const [elem, setElem] = useState('');
    // const params = useParams();
    // const completeButton = useRequestUpdateTodo(elem);
    // const deleteButton = useRequestDeleteTodo();
    
    // useEffect(() => {
    //     fetch("http://localhost:3000/todos")
    //     .then(response => response.json())
    //     .then((data) => {
    //         for (let element of data) {
    //             if (element.id === Number(params.id)) {
    //                 setElem(element);
    //             }
    //         }
    //     })
    // }, [IS_REFRESH])