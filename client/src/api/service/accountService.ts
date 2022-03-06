import { LOGOUT_ENDPOINT, PROFILE_ENTPOINT } from "../../common/const/endpoint.const"
import client from "../client"

const AccountService = {
    //account service
    getProfile: (): Promise<any> => {
        return client.get(PROFILE_ENTPOINT).then(res => res.data)
    },

    updateProfile: (data: any): Promise<any> => {
        return client.put(PROFILE_ENTPOINT, data).then(res => res.data)
    },

    deleteAccount: (): Promise<any> => {
        return client.delete(LOGOUT_ENDPOINT).then(res => res.data)
    },
}

export default AccountService