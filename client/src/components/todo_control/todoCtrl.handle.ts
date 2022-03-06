import { message } from "antd"
import todoService from "../../api/service/todoService"
import itodo from "../../common/interface/todo.interface"
import store from "../../store"
import { addTodo, deleteTodo, setTodo, updateTodo } from "../../store/todo/todoSlide"

const todoCtrl = {
    getAll: async () => {
        await todoService.getTodo()
            .then((res) => {
                return res.data
            })
            .then((respose) => {
                store.dispatch(setTodo(respose.results))
            }).catch((e) => {
                console.log(e)
            })
    },
    add: async (todo: itodo) => {
        await todoService.addTodo(todo)
            .then((res) => {
                return res.data
            })
            .then((respose) => {
                message.success("Succeeded!")
                store.dispatch(addTodo([respose.results]))
            }).catch((e) => {
                message.error(e.message)
                console.log(e)
            })
    },
    update: async (id: string, data: itodo) => {
        await todoService.updateTodo(id, data)
            .then((res) => {
                return res.data
            })
            .then((respose) => {
                message.success("Succeeded!")
                store.dispatch(updateTodo(respose.results))
            }).catch((e) => {
                message.error(e.message)
                console.log(e)
            })
    },
    delete: async (id: string) => {
        await todoService.deleteTodo(id)
            .then((res) => {
                return res.data
            })
            .then((respose) => {
                message.success("deleted!")
                store.dispatch(deleteTodo(respose.results))
            }).catch((e) => {
                message.error(e.message)
                console.log(e)
            })
    }
}

export default todoCtrl