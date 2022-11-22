import {ModalForm} from "./modal";
import {Todo} from "./todo";

export type ModalManager = {
   /**
    * Управляет состояние модального окна для создания дела
    */
   isAddModalOpen:boolean,
   /**
    * Управляет состянием свойства "isAddModalOpen"
    */
   setIsAddModalOpen: Function
   /**
    * Управляет состояние модального окна для изменения дела
    */
   isUpdateModalOpen:boolean,
   /**
    * Управляет состянием свойства "isUpdateModalOpen"
    */
   setUpdateModalOpen: Function,

}



export type TodoManager = {
   /**
    * Список дел
    */
   todos: Todo[],
   /**
    * Управляет состянием списка дел
    */
   setTodos: Function
}
