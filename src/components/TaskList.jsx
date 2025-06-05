import TaskItem from "./TaskItem";

export default function TaskList (props) {

    return (
        <div className="taskList">
            {props.isLoading && <div className='loader'></div>}
            {props.todosForWiev.length < 1 ? <div className="taskItem">Нет данных для отображения</div> : props.todosForWiev.map((elem, id) => {
                return (
                    <TaskItem 
                        key={id} 
                        id={elem.id} 
                        elem={elem} 
                    />)
            })}
        </div>
    )
}