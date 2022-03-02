import { Divider, List, Typography } from "antd"
import React, { FC } from "react"
import { RootState, useAppSelector } from "../store";

const data = [
    { title: "ahihi" },
    { title: "bhihi" }
]

const ListTodo: FC = () => {
    // const data = useAppSelector((state: RootState) => state.counter.value)
    const todoLoading = useAppSelector((state) => state.todo.current)
    console.log('List render');
    return (
        <>
            <Divider orientation="left">Default Size</Divider>
            <List style={{ minWidth: "500px" }}
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={todoLoading}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>[ITEMb]</Typography.Text> {item.title}
                    </List.Item>
                )}
            />
            <Divider orientation="left">Small Size</Divider>
        </>
    )
}

export default ListTodo
