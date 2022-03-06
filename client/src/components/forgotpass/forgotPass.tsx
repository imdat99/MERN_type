import { Form, Input, Modal, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FORGOTPASS_ENDPOINT } from '../../common/const/endpoint.const';


interface props {
    visiable: boolean
    onCancel: () => void
}

const ForgotPass: React.FC<props> = ({ visiable, onCancel }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        return () => {
            form.resetFields();
        }
    }, [visiable])

    const [isLoading, setisLoading] = useState(false)
    const [Status, setStatus] = useState({
        success: true,
        msg: ''
    })
    const onSubmit = async (values: any) => {
        setisLoading(true)
        await axios.post(FORGOTPASS_ENDPOINT, values).
            then((res) => res.data)
            .then((response) => {
                setisLoading(false)
                setStatus(response)
            })
            .catch((e) => {
                setStatus(e.response.data)
            }).finally(() => setisLoading(false))
        // console.log(values);
    }
    return (
        <Modal
            visible={visiable}
            title='Forgot Password'
            confirmLoading={isLoading}
            cancelText='Cancel'
            okText='Submit'
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        onSubmit(values)
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                form={form}
                layout='horizontal'
                name="form_in_modal"
            // onChange={checkChange}
            >
                <Form.Item
                    name="username"
                    label="User name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Typography.Text type={Status.success ? 'success' : 'danger'}>
                    {Status.msg}
                </Typography.Text>
            </Form>
        </Modal>
    );
}

export default ForgotPass