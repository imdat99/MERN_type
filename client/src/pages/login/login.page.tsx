import { Form, Input, Button, Checkbox, message, Spin } from 'antd';
import { useState } from 'react';
import './login.css'
import { handleLogin, handleResgister } from './login.handle';


const LoginPage = () => {
    const [isLoading, setLoading] = useState(false)
    const [isReg, setisReg] = useState(false)
    const swapPage = () => {
        setisReg(!isReg)
    }

    const onFinish = (values: any) => {
        setLoading(true)
        if (!isReg) handleLogin({ ...values }).finally(() => setLoading(false))
        else handleResgister({ ...values }).finally(() => setLoading(false))
    };

    const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo);
        message.error('Không đăng nhập được, đ hiểu kiểu gì luôn :(')
    };

    return (
        <div className="loginContainer">
            <div className="loginContent">
                <Spin spinning={isLoading} tip="Loading..." size="large">
                    <div className="loginForm">

                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            {isReg ?
                                <Form.Item
                                    label="email"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                : ''}
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{ offset: 8, span: 16 }}
                                style={!isReg ? {} : { display: 'none' }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" className='loginBtn'>
                                    {!isReg ? 'Login' : 'Submit'}
                                </Button>
                                <Button htmlType="button" className='loginBtn' onClick={swapPage}>
                                    {!isReg ? 'Register' : 'Cancel'}
                                </Button>
                            </Form.Item>


                        </Form>
                    </div>
                </Spin>
            </div>
        </div>
    );
}

export default LoginPage