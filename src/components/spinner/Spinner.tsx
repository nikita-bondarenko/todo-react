import React from 'react';
import styles from './Spinner.module.less'
import {Style} from "../../types/bricks";

/**
 * Крутилка
 */
const Spinner = ({className}: Style) => {
    return (
        <div className={[styles.spinner, className].join(' ')}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Spinner;