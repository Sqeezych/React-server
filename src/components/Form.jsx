import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSorted, selectTodo, selectTodosForWiev, selectTodosFromServer } from "../selectors";
import { setTodo, setTodosForWiev, SORTING } from "../actions";
import { debouncedFunction } from "../debounce";
import { useRequestSetTodo } from "../hooks";

export default function Form () {
    
    const isSorted = useSelector(selectIsSorted);
    const todo = useSelector(selectTodo);
    const todosFromServer = useSelector(selectTodosFromServer);
    const todosForWiev = useSelector(selectTodosForWiev);
    const isSortedRef = useRef(isSorted);
    const timeoutRef = useRef(null);
    const dispatch = useDispatch();

    const submitForm = useRequestSetTodo();

    function inputOnChange ({ target }) {
        dispatch(setTodo(target.value));
        timeoutRef.current = debouncedFunction(target.value, todosFromServer, dispatch, setTodosForWiev);
    } 

    function sortButton() {

        dispatch(SORTING);
        isSortedRef.current = !isSorted;

        if (isSortedRef.current) {
            let sortedTodos = [...todosForWiev];
            sortedTodos.sort((a, b) => a.title.localeCompare(b.title, 'ru', { ignorePunctuation: true }));
            dispatch(setTodosForWiev(sortedTodos));
        } else {
            dispatch(setTodosForWiev(todosFromServer))
            dispatch(setTodo(''));
        }
    }

    return (
        <form className="taskForm" onSubmit={(e) => {
            submitForm(e);
            clearTimeout(timeoutRef.current);
        }}>
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