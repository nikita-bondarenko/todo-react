import React, {useState} from 'react';
import styles from './ModalProto.module.less'
import {Modal} from "../../../types/modal";
import ButtonClose from "../../buttons/close/ButtonClose";
import Spinner from "../../spinner/Spinner";

/**
 * Компонент, который оборачивает элементы в модальное окно
 */
const ModalProto = ({isModalOpen, closeModal, children, isLoading}: Modal) => {
const [isOutContent, setIsOutContent] = useState(false) as [boolean, Function]

    return (
        <div onClick={() => closeModal()} className={[styles.modal, isOutContent &&  styles.modal_hover, isModalOpen ? styles.modal_open : styles.modal_hidden].join(' ')}>
            <div className={styles.modal__wrapper}>
                <div onClick={(e) => e.stopPropagation()} onMouseEnter={() => setIsOutContent(false)} onMouseLeave={() => setIsOutContent(true)} className={[styles.modal__body, isLoading && styles.modal__body_disable].join(' ')}>
                    {children}
                    <ButtonClose className={styles.modal__close} onClick={() => closeModal()}></ButtonClose>

                </div>
                {isLoading && <Spinner></Spinner>}
            </div>
        </div>
    );
};

export default ModalProto;