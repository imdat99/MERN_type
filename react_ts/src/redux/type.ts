import { AnyAction } from "redux";

export enum ActionTypes {
    ADD_TODO = 'ADD_TODO',
    EDIT_TODO = 'EDIT_TODO',
    DELETE_TODO = 'DELETE_TODO'
}

export interface todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}
interface addTodo extends AnyAction {
    type: ActionTypes.ADD_TODO
    payload: todo
}
interface editTodo extends AnyAction {
    type: ActionTypes.EDIT_TODO
    payload: todo
}
interface deleteTodo extends AnyAction {
    type: ActionTypes.DELETE_TODO
    payload: todo
}
export type ActionTodo = addTodo | editTodo | deleteTodo

