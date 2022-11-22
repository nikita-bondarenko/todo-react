import React, {useContext} from 'react';
import {Context} from "../../ctx/context";
import ListItem from "../list-item/ListItem";

/**
 * Список дел
 * @component
 */
const List = () => {

    const { todos} = useContext(Context)
    return (
       <ol>
           { todos.map(todo =>
               <ListItem data={todo} key={todo.id}></ListItem>
           )}
       </ol>
    );
};

export default List;