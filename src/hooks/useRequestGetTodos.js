import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTodosFromServer, setTodosForWiev, loading } from "../actions";

export const useRequestGetTodos = () => {
    // const [todosFromServer, setTodosFromServer] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(loading(true));
        fetch("http://localhost:3000/todos")
          .then(response => response.json())
          .then((data) => {
            dispatch(setTodosFromServer(data));
            dispatch(setTodosForWiev(data));
          })
          .finally(() => dispatch(loading(false)))
    
    }, [])
}

// useEffect(() => {

//         setIsLoading(true)
//         fetch("http://localhost:3000/todos")
//           .then(response => response.json())
//           .then((data) => {
//             setTodosFromServer(data);
//             setTodosForWiev(data);
//           })
//           .finally(() => setIsLoading(false))
    
//     }, [isRefresh])

//     return {
//         isLoading,
//         todosFromServer,
//     }