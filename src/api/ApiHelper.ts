import axios, {AxiosRequestConfig} from "axios";

const BASE_URL = (process.env.NODE_ENV === "test") ? "http://127.0.0.1:3001" : "https://code-2gether.herokuapp.com";

export default class ApiHelper {
    /*
        *Helper class for the frontend to work with the backend api endpoints
        *Very little error checking is done here, as the frontend and backend
        *will be hosted on the same server... aka 'Should be fine.'
    */
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
        const url = `${BASE_URL}/api/room`;
        return await this.request({url, data: {token}, method: 'post'});
    }

    static async checkRoomName(room: string) {
        const url = `${BASE_URL}/api/room/${room}`;
        return await this.request({url});
    }

    static async checkUserName(room: string, name: string) {
        const url = `${BASE_URL}/api/room/${room}/user/${name}`;
        return await this.request({url});
    }
}
