import { authRequest } from "./request";

export const requestRegister = async (registerForm) => {
    return await authRequest.post('/register', registerForm);
};
export const requestLogin = async (loginForm) => {
    return await authRequest.post('/login',loginForm,{ withCredentials:true });
};

