import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getTodos } from './todoReducer'
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'

// export const getTodos = createAsyncThunk('todo/getTodos', async (params: string) => {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
//     return response.data
// })

export interface TodoState<T> {
    current: T[],
    loadding: boolean,
    error: string,
}
const initialState: TodoState<any> = {
    current: [],
    loadding: false,
    error: ''
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.loadding = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loadding = false
                state.current = [...state.current, ...action.payload]
            })
            .addCase(getTodos.rejected, (state) => {
                state.loadding = false
            })
    }
})

// Action creators are generated for each case reducer function
// export const { } = todoSlice.actions

const todoReducer = todoSlice.reducer
export default todoReducer