import { PoweroffOutlined } from "@ant-design/icons"
import { Button, message, PageHeader } from "antd"
import { useState } from "react"
import { useNavigate } from "react-router"
import AuthService from "../../api/service/authService"
import { useAppDispatch } from "../../store"
import { reset } from "../../store/accesstoken"
import ChangePass from "../changepassword/ChangePass"

const AcountHeader = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(false)
    const [isChangePass, setChangePass] = useState(false)
    const onCancel = () => {
        setChangePass(false)
    }
    const handleLogout = () => {
        setLoading(true)
        AuthService.logout()
            .then(
                () => {
                    message.info('Đã đăng xuất!')
                    dispatch(reset())
                }
            ).finally(() => setLoading(false))
    }
    return (
        <>
            <ChangePass
                visiable={isChangePass}
                onCancel={onCancel}
            />
            <div className="site-page-header-ghost-wrapper">
                <PageHeader
                    ghost={false}
                    onBack={() => navigate('/')}
                    title="Account"
                    subTitle="Account detail"
                    extra={[
                        <Button
                            key="2"
                            onClick={() => setChangePass(true)}
                        >
                            Change Password
                        </Button>,
                        <Button
                            key="1"
                            type="primary"
                            danger
                            icon={<PoweroffOutlined />}
                            loading={isLoading}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>,
                    ]}
                >
                </PageHeader>
            </div>
        </>
    )
}

export default AcountHeader