import axios from 'axios'
import { REFRESH_TOKEN } from '../common/const/refreshtoken.const'
import { REFRESH_TOKEN_ENDPOINT } from '../common/const/endpoint.const'
import { setToken } from '../store/accesstoken'
import store from '../store/index'


// dotenv.config()

const headers = {
    crossDomain: true,
    Accept: "application/json; charset=utf-8",
    "content-type": "application/json"
}

const getAccessToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    if (refreshToken) {
        await axios.get(REFRESH_TOKEN_ENDPOINT, {
            withCredentials: true,
            headers: {
                "Authorization": `Bearer ${refreshToken}`
            }
        })
            .then(res => res.data)
            .then((res) => {
                localStorage.setItem(REFRESH_TOKEN, res.refreshToken)
                store.dispatch(setToken(res.accesstoken))
            })
            .catch(err => {
                if (err.response.status === 403) localStorage.remove(REFRESH_TOKEN)
            }
            )
    } else store.dispatch(setToken(''))
}

const client = axios.create({
    withCredentials: true,
    baseURL: "https://glacial-oasis-31254.herokuapp.com/api/v1",
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
        console.log(response)
        return response
    },
    async (error: any) => {
        const originalRequest = error.config
        if (error.response?.status === 401 || error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true
            await getAccessToken()
            const token = store.getState().token.value
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            if (token !== '') return client(originalRequest);
        }
        return Promise.reject(error)
    }
)


export default client