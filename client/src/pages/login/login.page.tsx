import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import ForgotPass from '../../components/forgotpass/forgotPass';
import './login.css'
import { handleLogin, handleResgister } from './login.handle';


const LoginPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [isForgot, setForgot] = useState(false)
    const [isReg, setisReg] = useState(false)
    const swapPage = () => {
        setisReg(!isReg)
    }
    const [form] = Form.useForm()
    useEffect(() => {
        form.resetFields()
        return () => {
            setLoading(false)
        }
    }, [isReg])

    const onFinish = (values: any) => {
        setLoading(true)
        console.log(values);
        if (!isReg) handleLogin({ ...values }).finally(() => setLoading(false))
        else handleResgister({ ...values }).finally(() => setLoading(false))
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error('Không đăng nhập được!')
    };

    const closeForgot = () => {
        setForgot(false)
    }

    return (
        <>
            <ForgotPass
                visiable={isForgot}
                onCancel={closeForgot}
            />
            <div className="loginContainer">
                <div className="loginContent">
                    <Spin spinning={isLoading} tip="Loading..." size="large">
                        <div className="loginForm">
                            <Form
                                form={form}
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                {isReg ?
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email!' }]}
                                    >
                                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                                    </Form.Item>
                                    : ''}
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                                <Form.Item style={!isReg ? {} : { display: 'none' }}>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>
                                    <Button
                                        type='link'
                                        size='small'
                                        className="login-form-forgot"
                                        onClick={() => setForgot(true)}
                                    >
                                        Forgot password
                                    </Button>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        {!isReg ? 'Login' : 'Submit'}
                                    </Button>
                                    Or <Button size='small' type='link' onClick={swapPage}>{!isReg ? 'register now!' : 'Login'}</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Spin>
                </div>
            </div>
        </>
    );
}

export default LoginPage