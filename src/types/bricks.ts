import React, {ComponentElement, ReactNode} from "react";

export type Click = {
    /**
     * закрывает модальное окно
     */
    onClick?: (e: React.MouseEvent) => void
}

export type Style = {
    /**
     * Объект стилей
     */
    style?: {
        [key: string] : string
    },
    /**
     * Строка стилей
     */
    className?: string
}

export type Child = {
    /**
     * Вложенный компонент
     */
    children: ReactNode | ComponentElement<any, any>
}

