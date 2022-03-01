import { TodoStatus } from '../const/todo.const'
export interface todo {
    _id?: string,
    id?: string,
    title?: String,
    desc?: String,
    status?: string,
    createdAt?: string,
    updatedAt?: string,
    __v?: string
}
