import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosFromServer, loading, setTodosForWiev } from "../actions";
import { selectIsRefresh } from "../selectors";

export const useRequestGetTodos = () => {
  const isRefresh = useSelector(selectIsRefresh);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(true));
    fetch("http://localhost:3000/todos")
      .then(response => response.json())
      .then((dataFromServer) => {
        dispatch(getTodosFromServer(dataFromServer));
        dispatch(setTodosForWiev(dataFromServer));
      })
    // dispatch(getTodosFromServer());
    dispatch(loading(false));
  }, [isRefresh])

}