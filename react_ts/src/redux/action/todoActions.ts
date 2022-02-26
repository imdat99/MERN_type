import { Dispatch } from "redux";
import { todo, ActionTodo, ActionTypes } from "../type";

export const addTodo = (todo: todo) => (dispatch: Dispatch<ActionTodo>) => {
    console.log(todo)
    dispatch({
        type: ActionTypes.ADD_TODO,
        payload: todo
    })
}