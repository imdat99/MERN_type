import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import React from 'react'
import { Link } from 'react-router-dom'

const AppHeader = () => {
    return (
        <Header>
            <Space align='center' size={'large'} className="headerSpace">
                <div className="logo" />
                <div className='userIcon'>
                    <Link to='account'>
                        <Avatar size={40} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    </Link>
                </div>
            </Space>
        </Header>
    )
}

export default AppHeader