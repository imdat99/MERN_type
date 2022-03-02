import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import iUser from '../../common/interface/user.interface'


const initialState: iUser = {
    username: '',
    profile: {
        _id: '',
        id: '',
        fullName: '',
        phoneNumber: '',
        dob: '',
        email: '',
        createdAt: ''
    }
}

export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<iUser>) => {
            state = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

const userReducer = userSlice.reducer
export default userReducer