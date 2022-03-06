
import { Skeleton } from 'antd'
import './todocontent.css'

const TodoSkeleton = () => {
    return (
        <div className="section_content">
            <div className='skeletonTodo'>
                <Skeleton.Button active={true} size={'large'} shape={'square'} block={true} />
            </div>
            <div className='skeletonTodo'>
                <Skeleton.Button active={true} size={'large'} shape={'square'} block={true} />
            </div>

            <div className='skeletonTodo'>
                <Skeleton.Button active={true} size={'large'} shape={'square'} block={true} />
            </div>

            <div className='skeletonTodo'>
                <Skeleton.Button active={true} size={'large'} shape={'square'} block={true} />
            </div>
        </div>
    )
}

export default TodoSkeleton