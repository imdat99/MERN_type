import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import itodo from '../../common/interface/todo.interface';


export interface TodoState<T> {
    data: {
        _id: string
        title: string
        tasks: itodo[]
    }[],
    Loading: boolean,
    error: string,
}
const initialState: TodoState<any> = {
    data: [
        {
            _id: 'READY',
            title: ' 📃 To do',
            tasks: []
        },
        {
            _id: 'PROCESSING',
            title: ' ✏️ In progress',
            tasks: []
        },
        {
            _id: 'COMPLETED',
            title: ' ✔️ Completed',
            tasks: []
        }
        ,
        {
            _id: 'SUSPEND',
            title: ' 🛑 suspend',
            tasks: []
        }
    ],
    Loading: true,
    error: ''
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        resetStore: () => initialState,
        changeStatus: (state, action: PayloadAction<any>) => {
            state.data = action.payload
        },
        setTodo: (state, action: PayloadAction<any>) => {
            state.data = state.data.map(data => ({ ...data, tasks: [...action.payload.filter((e: any) => e.status === data._id)] }))
            state.Loading = false
        },
        addTodo: (state, action: PayloadAction<any>) => {
            state.data = state.data.map(data => ({ ...data, tasks: [...data.tasks, ...action.payload.filter((e: any) => e.status === data._id)] }))
        },
        updateTodo: (state, action: PayloadAction<any>) => {
            state.data = state.data.map(data =>
                ({ ...data, tasks: [...data.tasks.filter((e: any) => e._id !== action.payload._id), ...[action.payload].filter((e: any) => e.status === data._id)] })
            )
        },
        deleteTodo: (state, action: PayloadAction<any>) => {
            state.data = state.data.map(data =>
                ({ ...data, tasks: [...data.tasks.filter((e: any) => e._id !== action.payload._id)] })
            )
        },
    }
})

// Action creators are generated for each case reducer function
export const { resetStore, changeStatus, addTodo, updateTodo, deleteTodo, setTodo } = todoSlice.actions

const todoReducer = todoSlice.reducer
export default todoReducer