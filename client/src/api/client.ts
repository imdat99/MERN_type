import dotenv from 'dotenv'
import { bindActionCreators } from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Cookie from 'js-cookie'
import { REFRESH_TOKEN_COOKIES } from '../common/const/cookie.const'
import { REFRESH_TOKEN_ENDPOINT } from '../common/const/endpoint.const'
import { tokenSlice } from '../store/accesstoken'
import { useAppDispatch, useAppSelector } from '../store/index'


dotenv.config()

const headers = {
    Accept: "application/json",
    "content-type": "application/json"
}

const getAccessToken = async () => {
    const dispatch = useAppDispatch()
    const { setToken } = bindActionCreators(tokenSlice.actions, dispatch)
    const refreshToken = Cookie.get(REFRESH_TOKEN_COOKIES)
    if (refreshToken) {
        const response = await axios.get(REFRESH_TOKEN_ENDPOINT, { withCredentials: true })
            .then(res => res.data)
            .catch(err => null)
        setToken(response?.accesstoken)
        return response.accesstoken
    }
}

const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1",
    headers,
})

client.interceptors.request.use(
    async (config: AxiosRequestConfig) => {
        const token = useAppSelector(state => state.token.value)
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config
    },
    (err) => Promise.reject(err)
)

client.interceptors.response.use(
    (response) => { return response },
    async (error: AxiosError) => {
        const originalRequest = error.config
        if (error?.response?.status === 401 && originalRequest._retry)
   }
)