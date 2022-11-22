import React, {useContext, useEffect, useState} from 'react';
import {ListItemProps} from "../../types/list";
import dayjs, {Dayjs} from "dayjs";
import {ref, getDownloadURL} from "firebase/storage";
import {Todo} from "../../types/todo";
import {storage} from "../../index";
import ButtonClose from "../buttons/close/ButtonClose";
import {Context} from "../../ctx/context";
import {useFirebase} from "../../hooks/useFirebase";
import styles from './ListItem.module.less'

/**
 * Дело. Выводит и изменяет данные о деле
 * @component
 */
const ListItem = ({data}: ListItemProps) => {
    const [time, setTime] = useState<Dayjs>()
    const [downloadUrl, setDownloadUrl] = useState<string>('')
    const [isDone, setIsDone] = useState<boolean>()
    const [isDelayed, setIsDelayed] = useState(false)
    const [now, setNow] = useState<Dayjs>()
    const {setTodos,  setUpdateModalOpen, setChangingTodoId} = useContext(Context)

    const {put, del, delQueue} = useFirebase()

    useEffect(() => {
        data && setIsDone(data.isDone)
        if (data.date) {
            setTime(dayjs(data.date))
        }
        if (data.filepath) {
            getDownloadURL(ref(storage, data.filepath)).then(url => {
                setDownloadUrl(url)
            })
        }

    }, [data])

    useEffect(() => {
        if (data && (data.isDone !== isDone) && typeof isDone === "boolean") {
            put({...data, isDone})
        }
    }, [isDone])

    useEffect(() => {
        time && now && setIsDelayed(time.valueOf() < now.valueOf())
    }, [now])

    useEffect(() => {
        const intervalId = setInterval(() => setNow(dayjs()), 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    useEffect(() => {
        delQueue && setTodos((todos: Todo[]) => todos.filter(item => item.id !== data.id))
    }, [delQueue])

    /**
     * Открывает модальное окно для редактирования данных дела
     */
    const openChangeModal = (): void => {
        setUpdateModalOpen(true)
        setChangingTodoId(data.id)
    }

    return (
        <li className={[styles.li, isDelayed && "danger", isDone && "success"].join(' ')}>
            <h2>{data.title}</h2>
            {data.description && <p className={styles.desc}>{data.description}</p>}
            <label className={styles.checkbox} htmlFor={data.id}>
                <input id={data.id} checked={isDone || false} onChange={e => setIsDone(e.target.checked)} type="checkbox"/>
                {isDone ? '- снять отметку' : '- отметить как выполненное' }
            </label>
            {time && <p>Необходимо завершить до: {time.format('MMMM D, YYYY h:mm A')} </p>}
            {isDelayed && !isDone && <span className={"error"} >Вы задержались с выполнение дела!</span>}
            {data.fileName && <div>
                <p>Прикрепленный файл: {data.fileName}</p>
                {!!downloadUrl && <a href={downloadUrl} target={"_blank"} download={data.fileName}>Скачать файл</a>}
            </div>}
            <div className={styles.bottom}>
                <button className={"submit"} onClick={() => openChangeModal()}>Изменить дело</button>

            </div>
            <ButtonClose className={styles.close} onClick={() => del(data)}></ButtonClose>
        </li>
    );
};

export default ListItem;