import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import todoService from './api/service/todoService'
import { REFRESH_TOKEN_COOKIES } from './common/const/cookie.const'
import { useAppDispatch, useAppSelector } from './store'
import { setToken } from './store/accesstoken'
import { setUser } from './store/user'
import './App.css'
import AppLayout from './components/applayout/appLayout.component'
import LoginPage from './pages/login/login.page'
import TaskContainer from './components/todo_layout/todolayout.component'
import AddTodo from './components/todo_control/todoCtrl.component'
import AccountLayout from './components/account/accountlayout.component'
import Notfound from './pages/404/404.page'

function App() {
    // const [modal, setmodal] = useState(true)
    // const [Loading, setLoading] = useState(true)
    // const token = useAppSelector(state => state.token.value)
    // const user = useAppSelector(state => state.user)
    // const dispatch = useAppDispatch();
    // useEffect(() => {
    //   if (token === '' || token === null) {
    //     // push login
    //     useNavigate()('/login')
    //   }
    //   todoService.getProfile()
    //     .then((response) => {
    //       const { username, profile } = response.results
    //       dispatch(setUser({ username, profile }))
    //       setLoading(false)
    //     }).catch((e) => {
    //       Cookies.remove(REFRESH_TOKEN_COOKIES)
    //       dispatch(setToken(''))
    //       setLoading(false)
    //       // push login
    //       useNavigate()('/login')
    //     })
    // }, [token])
    // if (user.username !== '') {
    //   return (
    //     <></>
    //   )
    // }
    // return (
    //   <>
    //     {/* <AccountPage /> */}
    //     <AppLayout isAccount={true}>
    //       {/* <TaskContainer /> */}
    //       <AccountLayout />
    //     </AppLayout>
    //     {/* {modal ? <AddTodo /> : ''} */}
    //   </>

    // )
    // return (
    //     // <LoginPage />
    //     // <Notfound />
    // )
}

export default App
