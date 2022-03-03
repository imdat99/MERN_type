import { useState } from 'react'
import { Card, Empty, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import CardContent from '../cardcontent/cardcontent.component'
import mockData from './fakedata'
import './todolayout.css'
import AddTodo from '../addtodo/addtodo.component';

interface data {
    id: string;
    title: string;
    tasks: {
        id: string;
        title: string;
    }[];
}

const TodoLayout = () => {
    const [Data, setData] = useState<data[]>(mockData)
    const [isAddtodo, setisAddtodo] = useState(false)
    const [DefaultValue, setDefaultValue] = useState('READY')
    const handleAddClick = (e: data) => {
        setisAddtodo(!isAddtodo)
        setDefaultValue(e.id)
        console.log(e);
    }
    const onDragEnd = (res: DropResult) => {

        const { source, destination } = res
        if (!destination) return
        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = Data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = Data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = Data[sourceColIndex]
            const destinationCol = Data[destinationColIndex]

            const sourceTask = [...sourceCol?.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            Data[sourceColIndex].tasks = sourceTask
            Data[destinationColIndex].tasks = destinationTask

            setData(Data)
        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <AddTodo
                defaultValue={DefaultValue}
                visible={isAddtodo}
                onCancel={() => {
                    setisAddtodo(false);
                }}
            />
            <Space size={25} align={'start'}>
                {
                    Data.map((section) => (
                        <Droppable
                            key={section.id}
                            droppableId={String(section.id)}
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <Card
                                        title={section.title}
                                        bordered={true}
                                        style={{ width: 300 }}
                                        actions={[
                                            <span key="add" onClick={() => handleAddClick(section)}><PlusOutlined /> Add new</span>
                                        ]}
                                    >
                                        <div className="section_content">
                                            {section.tasks.length !== 0 ? section.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={String(task.id)}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                opacity: snapshot.isDragging ? '0.6' : '1'
                                                            }}
                                                            className="draggableContent"
                                                        >
                                                            <CardContent content={task.title} />
                                                        </div>
                                                    )}
                                                </Draggable>

                                            ))
                                                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            }
                                            {provided.placeholder}
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </Space>
        </DragDropContext>
    )
}

export default TodoLayout