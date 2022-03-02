import { message } from "antd"
import { useNavigate } from "react-router"
import client from "../../api/client"
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../../common/const/endpoint.const"
import { LoginData, RegData } from "../../common/interface/user.interface"
import store, { useAppDispatch } from "../../store"
import { setToken } from "../../store/accesstoken"


const handleLogin = async (loginData: LoginData) => {
    await client.post(
        LOGIN_ENDPOINT, loginData
    ).then(res => { return res.data })
        .then((response) => {
            message.success("Login succeeded!")
            store.dispatch(setToken(response.accesstoken))
        })
        .catch((e) => {
            message.error("Incorrect username or password");
            console.log(e)
        })
}

const handleResgister = async (regData: RegData) => {
    console.log(regData)
    await client.post(
        REGISTER_ENDPOINT, regData
    ).then(res => res.data)
        .then((response) => {
            message.success("register succeeded!")
            store.dispatch(setToken(response.accesstoken))
        })
        .catch((_) => {
            message.error("Username is Used!");
        })
}

export { handleLogin, handleResgister }