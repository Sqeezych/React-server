import styles from './NotFound.module.css';
import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <button className={styles.backToMain}><Link to='/'>На главную</Link></button>
            <p>Страница не найдена</p>
        </div>
    )
}