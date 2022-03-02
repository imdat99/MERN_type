import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import countReducer from "./count/countSlide";
import todoReducer from "./todo/todoSlide";
import tokenReducer from "./accesstoken"
import userReducer from "./user";

const store = configureStore({
    reducer: {
        counter: countReducer,
        todo: todoReducer,
        token: tokenReducer,
        user: userReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()