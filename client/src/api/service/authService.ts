import axios from "axios"
import { CHANGEPASS_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT, REGISTER_ENDPOINT } from "../../common/const/endpoint.const"
import { REFRESH_TOKEN } from "../../common/const/refreshtoken.const"
import { LoginData, RegData } from "../../common/interface/user.interface"
import client from "../client"

const AuthService = {
    login: (data: LoginData): Promise<any> => {
        return client.post(LOGIN_ENDPOINT, data).then(res => res.data)
    },

    register: (data: RegData): Promise<any> => {
        return client.post(REGISTER_ENDPOINT, data).then(res => res.data)
    },

    logout: (): Promise<any> => {
        return axios.get(LOGOUT_ENDPOINT, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(REFRESH_TOKEN)}`
            }
        }).then(res => res.data)
    },

    passWord: (data: any): Promise<any> => {
        return client.post(CHANGEPASS_ENDPOINT, data).then(res => res.data)
    }
}

export default AuthService