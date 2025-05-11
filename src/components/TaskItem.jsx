import { NavLink } from 'react-router-dom';
import styles from './TaskItem.module.css';

import { 
    useRequestDeleteTodo,
    useRequestUpdateTodo,
} from '../hooks';

export default function TaskItem (props) {

    const completeButton = useRequestUpdateTodo(props.refreshItems, props.todosForWiev);
    const deleteButton = useRequestDeleteTodo(props.refreshItems);

    function setLengthOfString (string) {
        if (string.length > 18) {
            return string.slice(0, 17) + '...';
        }

        return string;
    }

    return (
        <div className={styles.taskItem}>
            <NavLink className={props.elem.completed ? styles.completed : undefined}>{setLengthOfString(props.elem.title)}</NavLink>
            <button className={styles.deleteBtn} id={props.id} onClick={deleteButton}>Удал.</button>
            <button className={styles.completeBtn} id={props.id} onClick={completeButton}>Вып.</button>
        </div>
    )
}