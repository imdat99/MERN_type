import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface accessTokenState {
    value: string,
    expires: string,
}

const initialState: accessTokenState = {
    value: '',
    expires: '2d'
}

export const tokenSlice = createSlice({
    name: 'accessToken',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions

const tokenReducer = tokenSlice.reducer
export default tokenReducer