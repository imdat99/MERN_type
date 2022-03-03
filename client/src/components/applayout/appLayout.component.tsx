import { Layout } from 'antd';
import { ReactChild, ReactChildren, FC } from 'react';
import AcountHeader from './accountheader.componet';
import AppHeader from './appheader.component';
import './layout.css'

const { Content, Footer } = Layout;

interface AppLayoutProps {
    children?: ReactChild | ReactChildren
    isAccount: boolean
}
const AppLayout: FC<AppLayoutProps> = ({ children, isAccount }) => {
    return (
        <Layout className="layout">
            {isAccount ? <AcountHeader /> : <AppHeader />}
            <Content style={{ padding: '0 50px' }} className="AppLayoutContent">
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default AppLayout