import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'

const AppHeader = () => {
    return (
        <Header>
            <Space align='center' size={'large'} className="headerSpace">
                <div className="logo" />
                <div className='userIcon'>
                    {/* <UserOutlined className="icon_content" /> */}
                    <Avatar size={40} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                </div>
            </Space>
        </Header>
    )
}

export default AppHeader