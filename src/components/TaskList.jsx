import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";

export default function TaskList () {
    const isLoading = useSelector(selectIsLoading);
    const todosForWiev = useSelector(selectTodosForWiev);

    return (
        <div className="taskList">
            {isLoading && <div className='loader'></div>}
            {todosForWiev.length < 1 ? <div className="taskItem">Нет данных для отображения</div> : todosForWiev.map((elem, id) => {
                return <TaskItem key={id} id={elem.id} elem={elem} />
            })}
        </div>
    )
}