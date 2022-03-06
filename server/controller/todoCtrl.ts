import { Response } from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import returnRes from "../middleware/returnRes";
import { RequestCustom } from "../middleware/type";
import todos, { todo } from "../models/todos";


const todoCtrl = {
    getTodos: asyncWrapper(async (req: RequestCustom, res: Response) => {
        let todosData = await todos.find({ id: req.uId })
        const { limit, offset } = req
        todosData = todosData.filter((d, i) => {
            if (Number(limit) > 0 && Number(offset) > 0) return (i + 1 >= Number(offset) && i + 1 < (Number(offset) + Number(limit)))
            else if (Number(limit) > 0) return i < (Number(offset) + Number(limit))
            else return i >= Number(offset) - 1
        })
        console.log(todosData.length)
        // { results: todosData, fullUrl }
        returnRes.res200(res, { results: todosData })
    }),

    addTodo: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { title, desc, status } = req.body
        const newTodo = new todos({ id: req.uId, title, desc, status })
        await newTodo.save()
        returnRes.res200(res, { results: newTodo })
    }),

    updateTodos: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const { title, desc, status } = req.body
        const results = await todos.findByIdAndUpdate(
            { _id: req.params.todoId },
            { title, desc, status },
            { new: true }
        )
        returnRes.res200(res, { results })
    }),

    deleteTodos: asyncWrapper(async (req: RequestCustom, res: Response) => {
        const deleteTodo = await todos.findByIdAndDelete({ _id: req.params.todoId })
        if (!deleteTodo) return returnRes.res404(res)
        returnRes.res200(res, { results: deleteTodo })
    })
}

export default todoCtrl