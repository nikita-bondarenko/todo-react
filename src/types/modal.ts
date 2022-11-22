import {Child} from "./bricks";

export type Modal = {
    /**
     * Отображает процесс отправки данных на сервер
     */
    isLoading:boolean,
    /**
     * Управляет состояние модального окна
     */
    isModalOpen: boolean,
    /**
     * Закрывает модальное окно
     */
    closeModal: () => void,
} & Child

export type ModalContentType = {
    /**
     * Передает данные формы в родительский компонент
     */
    onSubmit:(data: ModalForm) => void,
    /**
     * Изначальные данные формы
     */
    init?: ModalForm
}

export type ModalForm = {
    /**
     * Указывает выполненно ли дело
     */
    isDone: boolean;
    /**
     * Прикрепленный файл
     */
    file?: File | null,
    /**
     * Заголовок
     */
    title?: string,
    /**
     * Описание
     */
    description?: string,
    /**
     * Дата завершения
     */
    date?: string
    /**
     * Имя файла
     */
    fileName?: string,
    /**
     * Путь к файлу в firebase/storage
     */
    filepath?: string,
    /**
     * Уникальный ключ
     */
    id: string
}

export  type ChangeTodoManager = {
    /**
     * Уникальный ключ дело, которое нужно изменить
     */
    changingTodoId: string,
    /**
     * Устанавливает уникальный ключ дело, которое нужно изменить
     */
    setChangingTodoId: Function
}