import { useState, useEffect } from 'react'

export const useRequestGetTodos = (isRefresh, setTodosForWiev) => {
    const [todosFromServer, setTodosFromServer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true)
        fetch("http://localhost:3000/todos")
          .then(response => response.json())
          .then((data) => {
            setTodosFromServer(data);
            setTodosForWiev(data);
          })
          .finally(() => setIsLoading(false))
    
    }, [isRefresh])

    return {
        isLoading,
        todosFromServer,
    }
}
