import { 
    useRequestDeleteTodo,
    useRequestUpdateTodo,
} from '../hooks';

export default function TaskItem (props) {

    const completeButton = useRequestUpdateTodo();
    const deleteButton = useRequestDeleteTodo();

    return (
        <div className="taskItem">
            <p className={props.elem.completed ? "completed" : undefined}>{props.elem.title}</p>
            <button className='deleteBtn' id={props.id} onClick={deleteButton}>Delete</button>
            <button className='completeBtn' id={props.id} onClick={completeButton}>Done</button>
        </div>
    )
}