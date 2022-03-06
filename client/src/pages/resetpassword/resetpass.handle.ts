import axios from "axios";
import { CHECKTOKEN_ENDPOINT, RESETPASS_ENDPOINT } from "../../common/const/endpoint.const";

export const checkToken = async (token: string): Promise<any> => axios.get(CHECKTOKEN_ENDPOINT,
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
).then((res) => res.data)


export const resetPass = async (token: string, data: any): Promise<any> =>
    axios.put(RESETPASS_ENDPOINT, data,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    ).then((res) => res.data)