import { FC } from "react"
import './todocontent.css'

interface Props {
    content: string
}
const TodoContent: FC<Props> = ({ content }) => {
    return (
        <div className="TodoContent" >
            <span>{content}</span>
        </div>
    )
}

export default TodoContent