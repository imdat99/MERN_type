import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router';
import AcountHeader from './accountheader.componet';
import AppHeader from './appheader.component';
import './layout.css'

const { Content, Footer } = Layout;


const AppLayout = () => {
    const location = useLocation()
    const { pathname } = location
    return (
        <Layout className="layout">
            {pathname === '/dash/account' ? <AcountHeader /> : <AppHeader />}
            <Content className="AppLayoutContent">
                <Outlet />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default AppLayout