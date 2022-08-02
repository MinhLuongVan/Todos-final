import axios from 'axios'
import Cookies from 'js-cookie'
const accessToken = Cookies.get("token");

export const authRequest = axios.create({
    baseURL : 'http://localhost:8000/i1/auth',
    headers : {
        withCredentials: true,
        headers: { "Access-Control-Allow-Credentials": true },
    }
});

export const request = axios.create({
    baseURL: "http://localhost:8000/td1/list",
    headers: {
      token: `Bearer ${accessToken}`,
    },
});

export const userRequest = axios.create({
    baseURL: "http://localhost:8000/i1/user",
    headers: {
      token: `Bearer ${accessToken}`,
    },
});