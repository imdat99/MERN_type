import { useState } from 'react'
import mockData from './fakedata'
import './task.css'
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"

const TaskContainer = () => {
    const [Data, setData] = useState(mockData)
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
            console.log(Data);
        }
        // const items = Array.from(todo)
        // const [ newOrder ] = items.splice(source.index, 1)
        // items.splice(destination.index, 0, newOrder)

        // setTodo(items)
    }
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="class1">
                {
                    Data.map((section) => (
                        <Droppable
                            key={section.id}
                            droppableId={String(section.id)}
                        >
                            {(provided) => (
                                <div className="class2"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <div className="section_ttitle">
                                        {section.title}
                                    </div>
                                    <div className="section_content">
                                        {section.tasks.map((task, index) => (
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
                                                            opacity: snapshot.isDragging ? '0.5' : '1'
                                                        }}
                                                    >
                                                        <p>
                                                            {task.title}
                                                        </p>
                                                    </div>
                                                )}
                                            </Draggable>
                                            // <p key={index}>
                                            //     {task.title}
                                            // </p>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                }
            </div>
        </DragDropContext>
    )
}

export default TaskContainer