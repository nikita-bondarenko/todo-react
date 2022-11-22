import {useState} from "react";
import {deleteObject, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../index";
import {deleteDoc, doc, setDoc} from "firebase/firestore/lite";
import {collectionName} from "../config";
import {ModalForm} from "../types/modal";

type UseFirebase = {
    /**
     * Добавляет или редактирует дело и прикрепленные файлы в firebase
     */
    put: (data?: ModalForm ) => void,
    /**
     * Удаляет дело из базы данных
     */
    del: (data?: ModalForm) => void,
    /**
     * Удаляет файл из firebase storage
     */
    delFile: (filepath: string) => void,
    /**
     * Хранит колличество операций в стеке вызова финкции "put"
     */
    putQueue: number,
    /**
     * Хранит колличество операций в стеке вызова финкции "del"
     */
    delQueue: number,
}

/**
 * Хук для работы с firebase
 *
 * @return {{
 *      put: (data?: ModalForm ) => void,
 *  del: (data?: ModalForm) => void,
 *  delFile: (filepath: string) => void,
 * putQueue: number,
 * delQueue: number,
 * }} Функции для работы с firebase и переменные, хранящие колличество операций в стеке вызова
 */
export const useFirebase = (): UseFirebase => {

    const [putQueue, setPutQueue] = useState(0)
    const [delQueue, setDelQueue] = useState(0)


    const put = (data?: ModalForm) => {
        if (!data) return
        setPutQueue(data.file ? 2 : 1)
        if (data && data.file) {
            const storageRef = ref(storage, data.filepath);
            uploadBytes(storageRef, data.file).then(() => setPutQueue(q => q - 1))
            delete data.file
        }
        setDoc(doc(db, collectionName, data.id), data).then(() => setPutQueue(q => q - 1))
    }

    const del = (data?: ModalForm) => {
        if (!data) return
        setDelQueue(1)
        data.fileName && delFile(data.filepath || '')
        deleteDoc(doc(db, collectionName, data.id)).then(() => setDelQueue(q => q - 1))
    }

    function delFile(filepath: string) {
        setDelQueue(q => q + 1)
        deleteObject(ref(storage, filepath)).then(() => setDelQueue(q => q - 1))
    }

    return {
        put,
        del,
        putQueue,
        delQueue,
        delFile
    }
}