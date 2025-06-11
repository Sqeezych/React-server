import { useContext } from 'react';
import { AppContext } from '../context';
import { useRequestDeleteTodo } from '../hooks';
import { useRequestUpdateTodo } from '../hooks';
import styles from './TaskItem.module.css';

export default function TaskItem (props) {

    const { refreshItems } = useContext(AppContext);

    const completeButton = useRequestUpdateTodo(refreshItems, props.elem);
    const deleteButton = useRequestDeleteTodo(refreshItems);

    return (
        <div className={styles.taskItem}>
            <p className={props.elem.completed ? styles.completed : undefined}>{props.elem.title}</p>
            <div className={styles.buttonsDiv}>
                <button className={styles.deleteBtn} id={props.id} onClick={deleteButton}>Удал.</button>
                <button className={styles.completeBtn} id={props.id} onClick={completeButton}>Вып.</button>
            </div>
        </div>
    )
}