import { useState, useEffect } from 'react'

export const useRequestGetTodos = (isRefresh) => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        setIsLoading(true)
        fetch("http://localhost:3000/todos")
          .then(response => response.json())
          .then(data => setTodos(data))
          .finally(() => setIsLoading(false))
    
    }, [isRefresh])

    return {
        isLoading,
        todos,
    }
}
