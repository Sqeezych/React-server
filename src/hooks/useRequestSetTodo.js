import { ref, push } from "firebase/database";
import { db } from '../firebase.js';

export const useRequestSetTodo = (todo, setTodo) => {
    
    function submitForm(event) {

        event.preventDefault();
        const todosDbRef = ref(db, "todos");

        if (!todo) {
            alert('Введено некорректное значение')
        } else {
            push(todosDbRef, {
                "title": todo.trim(),
                "completed": false
            })
                .then((response) => setTodo(''))
        }
    }

    return submitForm
}