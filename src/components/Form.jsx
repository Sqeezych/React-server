import { useContext } from "react";
import { AppContext } from "../context";

export default function Form () {
    const { todo, submitForm, inputOnChange, isSortedRef, sortButton } = useContext(AppContext);

    return (
        <form className="taskForm" onSubmit={submitForm}>
            <input 
              type="text" 
              value={todo} 
              className="newTask" 
              onChange={inputOnChange}
              placeholder="Добавьте новое дело..." />
            <button className="submitButton" type="submit">Добавить</button>
            <button className={isSortedRef.current ? "sortButton active" : "sortButton"} onClick={sortButton} type="button">Сортировать</button>
        </form>
    )
}