import { useDispatch } from "react-redux";
import { IS_REFRESH } from "../actions";

export const useRequestUpdateTodo = (todo) => {
    const dispatch = useDispatch();
    
    function updateData(url, status) {
        fetch(url, {
                method: "PATCH",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({
                    "completed": status
                }),
            })
                .then(rowResponse => rowResponse.json())
                .finally(() => dispatch(IS_REFRESH))
    }

    function completeButton({ target }) {

        const url = "http://localhost:3000/todos" + '/' + Number(target.id)

        if (todo.completed) {
            updateData(url, false);
        } else {
            updateData(url, true);
        }
    }
    
    return completeButton
}