import { Spin } from 'antd'

const LoadingPage = () => {
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            display: 'flex'
        }}>
            <div style={{ margin: 'auto' }}>
                <Spin tip='Loading...' size="large" /></div>
        </div>
    )
}

export default LoadingPage