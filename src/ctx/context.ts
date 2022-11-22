import {createContext} from "react";
import {ModalManager, TodoManager} from "../types/context";
import {ChangeTodoManager} from "../types/modal";

/**
 * Глобальное хранилище состояния
 */
// @ts-ignore
export const Context = createContext<ModalManager & TodoManager & ChangeTodoManager>()