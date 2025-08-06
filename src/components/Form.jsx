import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSorted, selectTodo } from "../selectors";
import { debouncedFunction } from "../hooks";
import { useRequestSetTodo } from "../hooks";

export default function Form (props) {
    const isSorted = useSelector(selectIsSorted);
    const todo = useSelector(selectTodo);
    const isSortedRef = useRef(isSorted);
    const dispatch = useDispatch();

    const submitForm = useRequestSetTodo(todo, setTodo, props.refreshItems);

    function inputOnChange ({ target }) {
        setTodo(target.value);
        debouncedFunction(target.value, props.todosFromServer, props.setTodosForWiev);
    } 

    function sortButton() {
        setIsSorted(!isSorted);
        isSortedRef.current = !isSorted;

        if (isSortedRef.current) {
            props.todosForWiev.sort((a, b) => a.title.localeCompare(b.title, 'ru', {ignorePunctuation: true}));
        } else {
            props.setTodosForWiev(props.todosFromServer);
            setTodo('');
            props.refreshItems();
        }
    }

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