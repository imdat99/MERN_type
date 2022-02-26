import { AnyAction, applyMiddleware, createStore, Dispatch } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { ActionTodo } from "./type";

const middleWare = [thunk]

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = Dispatch<ActionTodo | AnyAction>