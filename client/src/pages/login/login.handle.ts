import { message } from "antd"
//lib

import AuthService from "../../api/service/authService"
import { LoginData, RegData } from "../../common/interface/user.interface"
import store from "../../store"
import { setToken } from "../../store/accesstoken"


const handleLogin = async (loginData: LoginData) => {
    await AuthService.login(loginData)
        .then((response) => {
            message.success("Login succeeded!")
            store.dispatch(setToken(response.accesstoken))
        })
        .catch((e) => {
            message.error(e.response.data.msg);
            console.log(e.message)
        })
}

const handleResgister = async (regData: RegData) => {
    await AuthService.register(regData)
        .then((response) => {
            message.success("register succeeded!")
            store.dispatch(setToken(response.accesstoken))
        })
        .catch((e) => {
            message.error(e.response.data.msg);
            console.log(e.message)
        })
}

export { handleLogin, handleResgister }