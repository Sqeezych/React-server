import { ref, update } from "firebase/database";
import { db } from "../firebase";

export const useRequestUpdateTodo = () => {

    function completeButton({ target }) {

        const todoDbRef = ref(db, "todos" + "/" + target.id);
        update(todoDbRef, {
            "completed": true,
        })
            .then((response) => console.log('Статус изменен'))
    }
    
    return completeButton
}