import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, Space } from 'antd';
import { ReactChild, ReactChildren, FC } from 'react';
import './layout.css'
const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
    children: ReactChild | ReactChildren
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return (
        <Layout className="layout">
            <Header>
                <Space align='center' size={'large'} className="headerSpace">
                    <div className="logo" />
                    <div className='userIcon'><UserOutlined className="icon_content" /></div>
                </Space>
            </Header>
            <Content style={{ padding: '0 50px' }} className="AppLayoutContent">
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default AppLayout