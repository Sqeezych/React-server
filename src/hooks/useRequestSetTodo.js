import { useDispatch, useSelector } from "react-redux";
import { selectTodo } from "../selectors";
import { setTodo, IS_REFRESH } from "../actions";

export const useRequestSetTodo = () => {
    const todo = useSelector(selectTodo);
    const dispatch = useDispatch();
    
    function submitForm(event) {

        event.preventDefault();

        if (!todo) {
            alert('Введено некорректное значение')
        } else {
            fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                  "title": todo.trim(),
                  "completed": false
                }),
            })
            .finally(() => {
                dispatch(setTodo(''));
                dispatch(IS_REFRESH);
            })
        }
    }

    return submitForm
}