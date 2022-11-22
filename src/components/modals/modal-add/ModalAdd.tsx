import React, {useContext, useEffect, useState} from 'react';
import ModalProto from "../modal-proto/ModalProto";
import ModalContent from "../modal-content/ModalContent";
import {ModalForm} from "../../../types/modal";
import {Context} from "../../../ctx/context";
import {Todo} from "../../../types/todo";
import {useFirebase} from "../../../hooks/useFirebase";

/**
 * Модальное окно для добавления дела
 */
const ModalAdd = () => {

    const {isAddModalOpen, setIsAddModalOpen} = useContext(Context)

    const [formData, setFormData] = useState<ModalForm>()
    const {setTodos} = useContext(Context)
    const {put, putQueue} = useFirebase()

    useEffect(() => {
      formData && put(formData)
    }, [formData])

    useEffect(() => {
        if (putQueue === 0) setIsAddModalOpen(false)
        return () => {
            if (!formData) return
            putQueue === 1 && setTodos((todos: Todo[]) => [...todos, formData])
        }
    }, [putQueue])


    return (
        isAddModalOpen ? <ModalProto isLoading={putQueue > 0} isModalOpen={isAddModalOpen}
                                     closeModal={() =>!putQueue && setIsAddModalOpen(false)}>
            <h2>Добавление дела</h2>
            <ModalContent onSubmit={data => setFormData(data)}></ModalContent>
        </ModalProto> : <></>
    );
};

export default ModalAdd;