import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import './addtodo.css'
interface Values {
    title: string;
    description: string;
    status: string;
}

interface createTodo {
    visible: boolean;
    defaultValue?: string;
    // onCreate: (values: Values) => void;
    onCancel: () => void;
}

const AddTodo: React.FC<createTodo> = ({
    visible,
    defaultValue,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const cancelhandle = () => {

        onCancel()
    }
    useEffect(() => {
        form.resetFields()
        form.setFieldsValue({ status: defaultValue ?? "READY" })
    }, [defaultValue])
    console.log(defaultValue);
    return (
        <Modal
            visible={visible}
            title="Create a new todo"
            okText="Create"
            cancelText="Cancel"
            // confirmLoading={true}
            onCancel={cancelhandle}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        console.log(values)
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="status" label="Status">
                    <Radio.Group className='statusRadio.' buttonStyle="solid">
                        <Radio.Button value="READY">📃 To do</Radio.Button>
                        <Radio.Button value="PROCESSING">✏️ In progress</Radio.Button>
                        <Radio.Button value="COMPLETED">✔️ Completed</Radio.Button>
                        <Radio.Button value="SUSPEND">🛑 suspend</Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default AddTodo