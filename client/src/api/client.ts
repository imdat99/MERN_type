// import dotenv from 'dotenv'
import { bindActionCreators } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookie from 'js-cookie'
import { REFRESH_TOKEN_COOKIES } from '../common/const/cookie.const'
import { REFRESH_TOKEN_ENDPOINT } from '../common/const/endpoint.const'
import { setToken, tokenSlice } from '../store/accesstoken'
import store, { useAppDispatch, useAppSelector } from '../store/index'


// dotenv.config()

const headers = {
    Accept: "application/json; charset=utf-8",
    "content-type": "application/json"
}

const getAccessToken = async () => {
    const refreshToken = Cookie.get(REFRESH_TOKEN_COOKIES)
    if (refreshToken) {
        const response = await axios.get(REFRESH_TOKEN_ENDPOINT, { withCredentials: true })
            .then(res => res.data)
            .catch(err => null)
        store.dispatch(setToken(response?.accesstoken))
        return response.accesstoken
    }
}

const client = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/api/v1",
    headers,
})



client.interceptors.request.use(
    async (config: any) => {
        const token = store.getState().token.value
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config
    },
    (err) => Promise.reject(err)
)

client.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: any) => {
        const originalRequest = error.config
        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const token = await getAccessToken()
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return Promise.reject(error)
    }
)

export default client