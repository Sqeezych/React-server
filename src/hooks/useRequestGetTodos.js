import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from "../firebase.js";

export const useRequestGetTodos = (setTodosForWiev) => {
    const [todosFromServer, setTodosFromServer] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const todosDbRef = ref(db, "todos");
        return onValue(todosDbRef, (snapshot) => {
          const loadedTodos = snapshot.val() || {};
          setTodosFromServer(loadedTodos);
          setTodosForWiev(loadedTodos);
          setIsLoading(false);
        });    
    }, [])

    return {
        isLoading,
        todosFromServer,
    }
}
