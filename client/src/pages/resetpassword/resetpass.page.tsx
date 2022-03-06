import { Form, Input, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//lib


import Notfound from '../404/404.page';
import LoadingPage from '../loading/loading.page';
import '../login/login.css'
import { checkToken, resetPass } from './resetpass.handle';
const ResetPass = () => {
    const navigate = useNavigate()
    const [isValid, setValid] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const [isLoadingBtn, setLoadingBtn] = useState(false)
    const params = useParams<{ token: string }>();
    const token = String(params.token).replace(/_/g, '.')
    useEffect(() => {
        const validToken = async () => {
            await checkToken(token).then(response => {
                if (response.success) {
                    setValid(true)
                }
            }).finally(() => { setLoading(false) })
        }
        validToken()
    }, [])

    const onFinish = async (values: any) => {
        setLoadingBtn(true)
        await resetPass(token, { password: values.password }).then(response => {
            message.success('Successed!')
            navigate('/')
        }).catch(e => {
            message.error(e.response.data.msg)
        }).finally(() => setLoadingBtn(false))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        isLoading && <LoadingPage /> ||
        (!isValid && <Notfound /> ||
            <div style={{
                width: '100%',
                height: '100vh',
                display: 'flex'
            }}>
                <div style={{ margin: 'auto', width: '400px' }}>

                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" loading={isLoadingBtn}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>)
    );
};

export default ResetPass
