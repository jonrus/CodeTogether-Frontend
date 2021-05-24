import axios, {AxiosRequestConfig} from "axios";

const BASE_URL = process.env.REACT_API_URL || "http://localhost:3001";

export default class ApiHelper {
    static async request({url, data = {}, method = "GET"}: AxiosRequestConfig) {
        const params = (method === "GET") ? data : {};
        try {
            return (await axios({url, method, data, params})).data;
        }
        catch (e) {
            console.error("API Error:", e.response);
            const msg = e.response.data.error.message;
            throw Array.isArray(msg) ? msg : [msg]
        }
    }

    static async logIn(username: string, password: string) {
        const url = `${BASE_URL}/api/token`;
        return await this.request({url, data: {username, password}, method: 'post'});
    }

    static async signUp(username: string, password: string) {
        const url = `${BASE_URL}/api/register`;
        return await this.request({url, data: {username, password}, method: 'post'});
    }

    static async getRoomName(token: string) {
        const url = `${BASE_URL}/api/new-room-name`;
        return await this.request({url, data: {token}, method: 'post'});
    }
}
