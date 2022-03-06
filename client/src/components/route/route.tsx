import { Navigate } from 'react-router-dom';
//lib
import Notfound from '../../pages/404/404.page';
import LoginPage from '../../pages/login/login.page';
import ResetPass from '../../pages/resetpassword/resetpass.page';
import AccountLayout from '../account/accountlayout.component';
import AppLayout from '../applayout/appLayout.component';
import TodoLayout from '../todo_layout/todolayout.component';

const routes = (isLoggedIn: boolean) => [
    {
        path: '/',
        element: !isLoggedIn ? <Navigate to="/login" /> : <Navigate to="/dash" />,
    },
    {
        path: 'dash',
        element: isLoggedIn ? <AppLayout /> : <Navigate to="/login" />,
        children: [
            { path: '', element: <TodoLayout /> },
            { path: 'account', element: <AccountLayout /> },

        ],
    },
    {
        path: '/login',
        element: !isLoggedIn ? <LoginPage /> : <Navigate to="/dash" />,
    },
    {
        path: '/reset/:token',
        element: <ResetPass />,
    },
    {
        path: '*',
        element: <Notfound />
    }
];

export default routes;