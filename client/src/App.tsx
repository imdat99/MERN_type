import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import CallService from './api/callService'
import { REFRESH_TOKEN_COOKIES } from './common/const/cookie.const'
import { useAppDispatch, useAppSelector } from './store'
import { setToken } from './store/accesstoken'
import { setUser } from './store/user'
import './App.css'
import AppLayout from './components/layout'
import LoginPage from './pages/login/login.page'

function App() {
  // const [Loading, setLoading] = useState(true)
  // const token = useAppSelector(state => state.token.value)
  // const user = useAppSelector(state => state.user)
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   if (token === '' || token === null) {
  //     // push login
  //     useNavigate()('/login')
  //   }
  //   CallService.getProfile()
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
  //   <AppLayout >
  //     <div>ahihi</div>
  //   </AppLayout>
  // )
  return (
    <LoginPage />
  )
}

export default App
