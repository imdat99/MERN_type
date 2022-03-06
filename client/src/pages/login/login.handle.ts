import { message } from "antd"
//lib

import AuthService from "../../api/service/authService"
import { REFRESH_TOKEN } from "../../common/const/refreshtoken.const"
import { LoginData, RegData } from "../../common/interface/user.interface"
import store from "../../store"
import { setToken } from "../../store/accesstoken"


const handleLogin = async (loginData: LoginData) => {
    await AuthService.login(loginData)
        .then((response) => {
            message.success("Login succeeded!")
            localStorage.setItem(REFRESH_TOKEN, response.refreshToken)
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
            localStorage.setItem(REFRESH_TOKEN, response.refreshToken)
            store.dispatch(setToken(response.accesstoken))
        })
        .catch((e) => {
            message.error(e.response.data.msg);
            console.log(e.message)
        })
}

export { handleLogin, handleResgister }