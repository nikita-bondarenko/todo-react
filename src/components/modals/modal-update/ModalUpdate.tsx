import React, {useContext, useEffect, useState} from 'react';
import ModalProto from "../modal-proto/ModalProto";
import ModalContent from "../modal-content/ModalContent";
import {Context} from "../../../ctx/context";
import {ModalForm} from "../../../types/modal";
import {useFirebase} from "../../../hooks/useFirebase";
import {Todo} from "../../../types/todo";

/**
 * Модальное окно для изменения дела
 */
const ModalUpdate = () => {

    const {isUpdateModalOpen, setUpdateModalOpen} = useContext(Context)
    const [formData, setFormData] = useState<ModalForm>()
    const {setTodos, changingTodoId, todos} = useContext(Context)
    const [initData, setInitData] = useState<Todo>()
    const {put, putQueue, delFile, delQueue} = useFirebase()

    useEffect(() => {
        if (formData) {
            if (initData && initData.filepath &&  ((initData.filepath && !formData.filepath) || initData.filepath !== formData.filepath)) delFile(initData.filepath)
            put(formData)
        }
    }, [formData])

    useEffect(() => {
        if (putQueue === 0 && delQueue === 0) {
            setUpdateModalOpen(false)
        }
        return () => {
            if (formData && putQueue === 1) {
                setTodos((todos: Todo[]) => {
                    const arr: Todo[] = JSON.parse(JSON.stringify(todos))
                    const currentTodo = arr.find(item => item.id === formData.id)
                    if (currentTodo) {
                        const index = arr.indexOf(currentTodo)
                        arr[index] = formData
                        return arr
                    }
                })
            }
        }
    }, [putQueue])

    useEffect(() => {
        setInitData(todos.find(item => item.id === changingTodoId))
    }, [changingTodoId])

    return (
        isUpdateModalOpen ? <ModalProto isLoading={putQueue > 0} isModalOpen={isUpdateModalOpen}
                                        closeModal={() => !putQueue && !delQueue && setUpdateModalOpen(false)}>
            <h2>Изменение дела</h2>
            <ModalContent onSubmit={data => setFormData(data)}
                          init={initData}></ModalContent>
        </ModalProto> : <></>
    );
};

export default ModalUpdate;