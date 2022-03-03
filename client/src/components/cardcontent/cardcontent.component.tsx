import { FC } from "react"
import './cardcontent.css'

interface Props {
    content: string
}
const CardContent: FC<Props> = ({ content }) => {
    return (
        <div className="CardContent">
            <span>{content}</span>
        </div>
    )
}

export default CardContent