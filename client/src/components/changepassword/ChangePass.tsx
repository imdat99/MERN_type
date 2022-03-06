import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react'
import handleChangePass from './changepass.handle';


interface props {
    visiable: boolean
    onCancel: () => void
}

const ChangePass: React.FC<props> = ({ visiable, onCancel }) => {
    const [form] = Form.useForm();
    const [isLoading, setisLoading] = useState(false)
    const onChangePass = async (values: any) => {
        setisLoading(true)
        await handleChangePass(values, onCancel)
            .finally(() => {
                setisLoading(false)
            })
    }
    return (
        <Modal
            visible={visiable}
            title='Change Password'
            confirmLoading={isLoading}
            cancelText='Cancel'
            okText='Submit'
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onChangePass(values)
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                layout='horizontal'
                name="form_in_modal"
                onFinish={() => { console.log(form.getFieldsValue()) }}
            // onChange={checkChange}
            >
                <Form.Item
                    name="oldpass"
                    label="Old Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your old password!',
                        },
                    ]}
                // hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
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
                            message: 'Please confirm your new password!',
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

            </Form>
        </Modal>
    );
}

export default ChangePass