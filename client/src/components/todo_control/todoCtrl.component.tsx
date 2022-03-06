import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import './todoCtrl.css'
import itodo from '../../common/interface/todo.interface';
import todoCtrl from './todoCtrl.handle';


interface todoCtrl {
    visible: boolean;
    defaultValue?: itodo;
    // onCreate: (values: Values) => void;
    onCancel: () => void;
}

const TodoCtrl: React.FC<todoCtrl> = ({
    visible,
    defaultValue,
    onCancel,
}) => {
    const [isDisable, setIsDisable] = useState(false)
    const [isLoading, setIsLoading] = useState({
        delete: false,
        submit: false,
    })
    const [form] = Form.useForm();
    const cancelhandle = () => {

        onCancel()
    }
    useEffect(() => {
        form.resetFields()
        form.setFieldsValue({
            title: defaultValue?.title ?? "",
            status: defaultValue?.status ?? "READY",
            desc: defaultValue?.desc ?? "",
        })
        if (Boolean(defaultValue?.title)) setIsDisable(true)
        return () => {
            setIsDisable(false)
            form.resetFields()
        }

    }, [defaultValue, visible])


    const handleSubmit = () => {
        form
            .validateFields()
            .then(values => {
                setIsLoading({ ...isLoading, submit: true })
                // form.resetFields();
                if (!defaultValue?.title) todoCtrl.add(values as itodo).finally(
                    () => {
                        setIsLoading({ ...isLoading, submit: false })
                        onCancel()
                    }
                )
                if (defaultValue?.title) todoCtrl.update(defaultValue._id as string, values as itodo).finally(
                    () => {
                        setIsLoading({ ...isLoading, submit: false })
                        onCancel()
                    }
                )
                console.log(values)
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    const handleDelete = () => {
        setIsLoading({ ...isLoading, delete: true })
        todoCtrl.delete(defaultValue?._id as string).finally(
            () => {
                setIsLoading({ ...isLoading, delete: false })
                onCancel()
            })
    }
    const checkChange = () => {
        if (defaultValue?.title) {
            setIsDisable(
                form.getFieldValue('title') === defaultValue?.title &&
                form.getFieldValue('desc') === defaultValue?.desc &&
                form.getFieldValue('status') === defaultValue?.status
            )
        }

    }
    return (
        <Modal
            visible={visible}
            title={defaultValue?.title || "Create a new todo"}
            onCancel={cancelhandle}
            // confirmLoading={true}
            footer={[
                <Button key="cancel" onClick={cancelhandle}>
                    cancel
                </Button>,
                defaultValue?.title &&
                <Button key="delete" type="primary" danger loading={isLoading.delete} onClick={handleDelete}>
                    Delete
                </Button> || '',
                <Button key="submit" type="primary" disabled={isDisable} loading={isLoading.submit} onClick={handleSubmit}>
                    {defaultValue?.title ? 'Update' : 'Submit'}
                </Button>,
            ]}

        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                onChange={checkChange}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input the title of collection!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="desc" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="status" >
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

export default TodoCtrl