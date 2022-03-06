import { TODO_ENDPOINT } from '../../common/const/endpoint.const'
import itodo from "../../common/interface/todo.interface";
import client from "../client";

const todoService = {
    //todo service
    getTodo: (): Promise<any> => {
        return client.get(TODO_ENDPOINT)
    },

    addTodo: (todo: itodo): Promise<any> => {
        return client.post(TODO_ENDPOINT, todo)
    },

    updateTodo: (todoId: string, updateData: itodo): Promise<any> => {
        return client.put(`${TODO_ENDPOINT}/${todoId}`, updateData)
    },

    deleteTodo: (todoId: string): Promise<any> => {
        return client.delete(`${TODO_ENDPOINT}/${todoId}`)
    }
}

export default todoService