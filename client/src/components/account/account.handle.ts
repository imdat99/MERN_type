import { message } from "antd"
import AccountService from "../../api/service/accountService"
import store from "../../store"
import { UpdateProfile } from '../../store/user/'

export const updateProfile = async (data: any) => {
    await AccountService.updateProfile(data)
        .then((res) => {
            message.success('Successed!')
            store.dispatch(UpdateProfile(res.results))
        })
        .catch((e) => {
            message.error(e.message)
        })
}