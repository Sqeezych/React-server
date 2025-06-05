import { Link } from 'react-router-dom';
import styles from './TaskItem.module.css';

export default function TaskItem (props) {

    function setLengthOfString (string) {
        if (string.length > 26) {
            return string.slice(0, 25) + '...';
        }

        return string;
    }

    return (
        <div className={styles.taskItem}>
            <Link  to={`/task/${props.id}`} className={props.elem.completed ? styles.completed : undefined}>{setLengthOfString(props.elem.title)}</Link>
        </div>
    )
}