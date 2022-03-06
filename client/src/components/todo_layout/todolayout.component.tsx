import { useEffect, useState } from 'react'
import { Card, Empty, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
//lib 

import './todolayout.css'
import TodoContent from '../todo_content/todocontent.component';
import TodoCtrl from '../todo_control/todoCtrl.component';
import itodo from '../../common/interface/todo.interface';
import { useAppDispatch, useAppSelector } from '../../store';
import { changeStatus } from '../../store/todo/todoSlide';
import todoCtrl from '../todo_control/todoCtrl.handle';
import TodoSkeleton from '../todo_content/todoSkeleton';


interface data {
    _id: string;
    title: string;
    tasks?: itodo[];
}
const TodoLayout = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        todoCtrl.getAll()
    }, [])
    const Data = useAppSelector(store => store.todo.data)
    const isLoading = useAppSelector(store => store.todo.Loading)
    const [isAddtodo, setisAddtodo] = useState(false)
    const [DefaultValue, setDefaultValue] = useState<itodo>({
        status: 'READY',
        _id: '',
        title: '',
        desc: '',
    })


    const handleAddClick = (e: data) => {
        setisAddtodo(!isAddtodo)
        setDefaultValue({
            status: e._id,
            _id: '',
            title: '',
            desc: '',
        })
        console.log(e);
    }

    const handleTodoClick = (task: itodo) => {
        setisAddtodo(!isAddtodo)
        setDefaultValue(task)
    }
    const onDragEnd = async (res: DropResult) => {
        let DragData = Data
        const { source, destination } = res
        if (!destination) return
        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = Data.findIndex(e => e._id === source.droppableId)
            const destinationColIndex = Data.findIndex(e => e._id === destination.droppableId)

            const sourceCol = Data[sourceColIndex]
            const destinationCol = Data[destinationColIndex]

            const sourceTask = [...sourceCol?.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            DragData = DragData.map(
                (data, index) => (sourceColIndex === index) ?
                    { ...data, tasks: sourceTask } : data)
            DragData = DragData.map(
                (data, index) => (destinationColIndex === index) ?
                    { ...data, tasks: destinationTask } : data)

            dispatch(changeStatus(DragData))

            await todoCtrl.update(res.draggableId as string, { status: destination?.droppableId } as itodo)

        }
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <TodoCtrl
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
                            key={section._id}
                            droppableId={String(section._id)}
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
                                        {isLoading ? <TodoSkeleton /> :
                                            <div className="section_content">
                                                {section.tasks.length !== 0 ? section.tasks.map((task: any, index: any) => (
                                                    <Draggable
                                                        key={task._id}
                                                        draggableId={String(task._id)}
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
                                                                <div onClick={() => { handleTodoClick(task) }}>
                                                                    <TodoContent content={task.title} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>

                                                ))
                                                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                                }
                                                {provided.placeholder}
                                            </div>
                                        }
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