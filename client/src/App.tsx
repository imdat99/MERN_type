import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useRoutes } from 'react-router-dom';
//lib

import routes from './components/route/route';
import { REFRESH_TOKEN_COOKIES } from './common/const/cookie.const'
import { useAppDispatch, useAppSelector } from './store'
import { setUser } from './store/user'
import './App.css'
import AccountService from './api/service/accountService';


function App() {
  const navigate = useNavigate()
  const refreshToken = Cookies.get(REFRESH_TOKEN_COOKIES)
  const routing = useRoutes(routes(Boolean(refreshToken)));
  const auth = useAppSelector(s => s.token.value)
  const dispatch = useAppDispatch();
  console.log('app render');
  useEffect(() => {

    AccountService.getProfile()
      .then((response) => {
        dispatch(setUser(response.results))
      }).catch(() => {
        // navigate('/login')
      })
  }, [refreshToken, auth])
  return (
    <>
      {routing}
    </>
  )
}

export default App
