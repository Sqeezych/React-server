export default function Form (props) {

    return (
        <form className="taskForm" onSubmit={props.submitForm}>
            <input 
              type="text" 
              value={props.todo} 
              className="newTask" 
              onChange={props.inputOnChange}
              placeholder="Добавьте новое дело..." />
            <button className="submitButton" type="submit">Добавить</button>
            <button className={props.isSortedRef.current ? "sortButton active" : "sortButton"} onClick={props.sortButton} type="button">Сортировать</button>
        </form>
    )
}