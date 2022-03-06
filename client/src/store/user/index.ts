import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import iprofile from '../../common/interface/profile.interface'
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
            state.profile = action.payload.profile
            state.username = action.payload.username
        },
        UpdateProfile: (state, action: PayloadAction<Partial<iUser>>) => {
            state.profile = action.payload as iprofile
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, UpdateProfile } = userSlice.actions

const userReducer = userSlice.reducer
export default userReducer