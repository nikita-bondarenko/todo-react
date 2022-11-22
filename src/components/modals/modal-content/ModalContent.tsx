import React, {useContext, useEffect, useRef, useState} from 'react';
import ButtonClose from "../../buttons/close/ButtonClose";
import styles from './ModalContent.module.less'
import {ModalContentType} from "../../../types/modal";
import {Context} from "../../../ctx/context";

/**
 * Компонент для управления данными модального окна
 */
const ModalContent = ({init, onSubmit}: ModalContentType) => {
    const ref = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>()
    const [date, setDate] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [isInvalidForm, setIsInvalidForm] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>('')
    const {setChangingTodoId, changingTodoId} = useContext(Context)

    useEffect(() => {
        if (init) {
            init.fileName && setFileName(init.fileName)
            init.date && setDate(init.date)
            init.title && setTitle(init.title)
            init.description && setDescription(init.description)
        }
    }, [init])

    useEffect(() => {
        if (file) setFileName(file.name)
    }, [file])

    useEffect(() => {
        return () => {
            !!changingTodoId && setChangingTodoId('')
        }
    }, [])

    /**
     * Отправляет данные формы в родительский компонент или выводит пользователю ошибку, если данные не валидны
     */
    const submit = () => {
        if (!!title) {
            const id =(init && init.id) || Date.now().toString()
            const data = {
                title,
                ...(!!description ? {description} : {}),
                ...( file ? {fileName, filepath: id + '-' + file.name, file} : {}),
                ...(init && init.filepath && !file ? {fileName, filepath: init.filepath} : {}),
                ...(!!date ? {date} : {}),
                isDone: !!(init && init.isDone),
            id
        }
            onSubmit(data)
        } else {
            setIsInvalidForm(true)
        }
    }

    return (
        <form onSubmit={(e) => (e.preventDefault(), submit())} className={styles.form}>
            <label  htmlFor="">
                <span>Заголовок:</span>
                <input onChange={e => setTitle(e.target.value)} value={title} type="text"/>
                {isInvalidForm && <span className={"error"}>Поле обязательно для заполнения</span>}
            </label>
            <label  htmlFor="">
                <span>Описание:</span>
                <textarea rows={5} onChange={e => setDescription(e.target.value)} value={description}/>
            </label>
            <label  htmlFor="">
                <span>Дата завершения:</span>
                <input className={styles.form__date} value={date} onChange={e => setDate(e.target.value)} type="datetime-local"/>
            </label>
            <div className={styles.form__file}>
                {fileName && <div className={styles.form__file_name}> Файл: {fileName}</div>}
                <button type={"button"}
                        onClick={() => ref.current?.click()}>{!fileName ? 'Прикрепить файл' : "Заменить файл"}</button>

                <input onChange={e => e.target.files && setFile(e.target.files[0])} ref={ref} style={{display: 'none'}}
                       type="file"/>
                {!!fileName && <ButtonClose onClick={() => (setFile(null), setFileName(''))}
                              className={styles.form__delete_file}></ButtonClose>}
            </div>
            <button type={"submit"}  className={"submit"}>
                Сохранить
            </button>
            {isInvalidForm && <span className={"error"}>Не удалось сохранить изменения. Заполните необходимые поля!</span>}
        </form>
    );
};

export default ModalContent;