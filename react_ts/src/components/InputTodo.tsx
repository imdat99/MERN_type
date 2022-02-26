import { Form, Input, Button, Select } from 'antd';
import { FormInstance } from 'antd/es/form';
import { FC } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as actionCreators from '../redux/action/todoActions';
import { ActionTodo, todo } from '../redux/type';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface props {
    addData: (todo: todo) => (dispatch: Dispatch<ActionTodo>) => void
}
export const InputTodo: FC<props> = ({ addData }) => {
    const onFinish = (values: any) => {
        addData(values as todo)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    console.log('input render');
    return (
        <Form {...layout}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item name="id" label="id" rules={[{ required: true }]} >
                <Input />
            </Form.Item>
            <Form.Item name="userId" label="userId" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="title" label="title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="completed" label="Is completed" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a option"
                // onChange={this.onGenderChange}

                // allowClear
                >
                    <Option value="true">true</Option>
                    <Option value="false">false</Option>
                </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" >
                    Reset
                </Button>
                <Button type="link" htmlType="button" >
                    Fill form
                </Button>
            </Form.Item>
        </Form>
    )
}
