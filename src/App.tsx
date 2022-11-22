import React, {useEffect, useState} from 'react';
import './styles/App.less';
import ModalAdd from "./components/modals/modal-add/ModalAdd";
import {Context} from "./ctx/context";
import {collection, getDocs} from 'firebase/firestore/lite';
import {db} from "./index";
import {collectionName} from "./config";
import List from "./components/list/List";
import {Todo} from "./types/todo";
import ModalUpdate from "./components/modals/modal-update/ModalUpdate";
import Spinner from "./components/spinner/Spinner";

function App() {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false)
    const [changingTodoId, setChangingTodoId] = useState('')
    const [todos, setTodos] = useState<Todo[]>([])
    const [isTodosLoading, setIsTodosLoading] = useState(false)

    /**
     * Получает список дел с сервера
     */
    async function getTodos() {
        const todosCol = collection(db, collectionName);
        setIsTodosLoading(true)
        const todoSnapshot = await getDocs(todosCol).then().finally(() => setIsTodosLoading(false));
        const todoList = todoSnapshot.docs.map(doc => doc.data());
        // @ts-ignore
        setTodos(todoList)
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <Context.Provider value={{
            /**
             * Управляет состояние модального окна для создания дела
             */
            isAddModalOpen,
            /**
             * Управляет состянием свойства "isAddModalOpen"
             */
            setIsAddModalOpen,
            /**
             * Управляет состояние модального окна для изменения дела
             */
            isUpdateModalOpen,
            /**
             * Управляет состянием свойства "isUpdateModalOpen"
             */
            setUpdateModalOpen,
            /**
             * Список дел
             */
            todos,
            /**
             * Управляет состянием списка дел
             */
            setTodos,
            /**
             * Уникальный ключ дело, которое нужно изменить
             */
            changingTodoId,
            /**
             * Устанавливает уникальный ключ дело, которое нужно изменить
             */
            setChangingTodoId
        }}>
            <main>
                <h1> Todo-list</h1>
                <div className={'body'}>
                    <button className={"submit"} onClick={() => setIsAddModalOpen(true)}> Добавить дело</button>
                    <List></List>
                    <ModalAdd></ModalAdd>
                    <ModalUpdate></ModalUpdate>
                </div>
                {isTodosLoading && <Spinner className={"spinner__main"}></Spinner>}
            </main>

        </Context.Provider>
    );
}

export default App;
