import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsSorted, selectTodo, selectTodosForWiev, selectTodosFromServer } from "../selectors";
import { setTodo, setTodosForWiev } from "../actions";
import { debounce } from "../debounce";
import { useRequestSetTodo } from "../hooks";

const debouncedFunction = debounce (([value, dataFromServer, setter]) => {
    let arr = [];
    if (value !== '') {
    dataFromServer.forEach((elem) => {
        if(elem.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
            arr.push(elem)
        }
    });
    setter(arr);
    } else if (value === '') {
        setter(dataFromServer);
}}, 1000)

export default function Form () {
    
    const isSorted = useSelector(selectIsSorted);
    const todo = useSelector(selectTodo);
    const todosFromServer = useSelector(selectTodosFromServer);
    const todosForWiev = useSelector(selectTodosForWiev);

    const isSortedRef = useRef(isSorted);
    const dispatch = useDispatch();

    const submitForm = useRequestSetTodo();

    function inputOnChange ({ target }) {
        dispatch(setTodo(target.value));
        debouncedFunction(target.value, todosFromServer, todosForWiev);
    } 

    function sortButton() {

        // setIsSorted(!isSorted);
        dispatch(SORTING);
        isSortedRef.current = !isSorted;

        if (isSortedRef.current) {
            todosForWiev.sort((a, b) => a.title.localeCompare(b.title, 'ru', {ignorePunctuation: true}));
        } else {
            dispatch(setTodosForWiev(todosFromServer))
            dispatch(setTodo(''));
            // props.setTodosForWiev(props.todosFromServer);
            // props.refreshItems();
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