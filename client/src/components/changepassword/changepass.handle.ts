import { message } from "antd"
import AuthService from "../../api/service/authService"



const handleChangePass = async (data: any, onCancel: any) => {
    await AuthService.passWord(data)
        .then(() => {
            onCancel()
            message.success('Successed!')
        })
        .catch((e) => {
            onCancel()
            message.error(e.message)
        })
}

export default handleChangePass