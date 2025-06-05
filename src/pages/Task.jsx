import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import NotFound from './NotFound';

import { 
    useRequestDeleteTodo,
    useRequestUpdateTodo,
} from '../hooks';

import styles from './Task.module.css';

export default function Task(props) {
    const [elem, setElem] = useState('');
    const params = useParams();
    const completeButton = useRequestUpdateTodo(props.refreshItems, elem);
    const deleteButton = useRequestDeleteTodo(props.refreshItems);
    
    useEffect(() => {
        fetch("http://localhost:3000/todos")
        .then(response => response.json())
        .then((data) => {
            for (let element of data) {
                if (element.id === Number(params.id)) {
                    setElem(element);
                }
            }
        })
    }, [props.isRefresh])

    return (
        <>  
            {elem.title ? 
            (<div className={styles.container}>
                <button className={styles.backToMain}><Link to='/'>На главную</Link></button>
                <p className={elem.completed ? styles.completed : ''}>{elem.title}</p>
                <div className={styles.buttonsDiv}>
                    <button className={styles.deleteBtn} id={params.id} onClick={deleteButton}>Удал.</button>
                    <button className={styles.completeBtn} id={params.id} onClick={completeButton}>Вып.</button>
                </div>
            </div>) : <NotFound />}
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