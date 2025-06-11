import { useContext } from "react";
import { AppContext } from "../context";
import TaskItem from "./TaskItem";

export default function TaskList () {
    const { isLoading, todosForWiev } = useContext(AppContext);

    return (
        <div className="taskList">
            {isLoading && <div className='loader'></div>}
            {todosForWiev.length < 1 ? <div className="taskItem">Нет данных для отображения</div> : todosForWiev.map((elem, id) => {
                return (
                    <TaskItem key={id} id={elem.id} elem={elem} />)
            })}
        </div>
    )
}