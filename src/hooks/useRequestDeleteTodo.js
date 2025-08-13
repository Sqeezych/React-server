import { useDispatch } from "react-redux";
import { IS_REFRESH } from "../actions";

export function useRequestDeleteTodo() {
  const dispatch = useDispatch();

  function deleteButton({ target }) {    
    const url = "http://localhost:3000/todos" + '/' + Number(target.id);
    fetch(url, {
      method: "DELETE",
    })
      .then(rowResponse => rowResponse.json())
      .then(() => alert("Дело удалено"))
      .finally(() => dispatch(IS_REFRESH))
  }
  
  return deleteButton
}