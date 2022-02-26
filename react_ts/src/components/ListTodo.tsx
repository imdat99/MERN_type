import { List } from "antd"
import { FC } from "react"
import { RootState } from "../redux"
import { useAppSelector } from "../redux/hooks"
import { todo } from "../redux/type"



export const ListTodo: FC = () => {
    const data = useAppSelector((state: RootState) => state.todo)
    console.log('List render');
    return (
        <List
            size="small"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => <List.Item>{item.title}</List.Item>}
        />
    )
}
