import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export function useRequestDeleteTodo() {

  function deleteButton({ target }) {

    const todoDbRef = ref(db, "todos" + "/" + target.id)
    remove(todoDbRef)
      .then(response => console.log('Дело удалено'))
  }
  
  return deleteButton

}