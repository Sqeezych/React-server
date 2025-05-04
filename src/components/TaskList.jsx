import TaskItem from "./TaksItem";

export default function TaskList (props) {

    return (
        <div className="taskList">
            {props.isLoading && <div className='loader'></div>}
            {Object.entries(props.todosForWiev).length < 1 ? <div className="taskItem">Нет данных для отображения</div> : Object.entries(props.todosForWiev).map(([id, elem]) => {
                console.log(elem, id);
                // return <TaskItem key={id} id={id} elem={elem} />
            })}
        </div>
    )
}