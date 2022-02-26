import { Reducer } from "redux";
import { ActionTodo, ActionTypes, todo } from "../type";

const initialState: todo[] = [{
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false
}]

const todoReducer: Reducer<todo[], ActionTodo> = (state: todo[] = initialState, action: ActionTodo) => {
    switch (action.type) {
        case ActionTypes.ADD_TODO: {
            return [...state, action.payload]
        }
        case ActionTypes.EDIT_TODO: {
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo)
        }
        case ActionTypes.DELETE_TODO: {
            return state.filter(todo => todo.id !== action.payload.id)
        }
        default:
            return state
    }
}
export default todoReducer