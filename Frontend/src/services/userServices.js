import { userRequest } from "./request";
import { authRequest } from "./request";
export const requestGetAllUsers = async () => {
    return await userRequest.get('/');
};

export const requestAddUser = async (addUser) => {
    return await authRequest.post('/register',addUser);
};

export const requestUpdateUser = async (updateUser) => {
    return await userRequest.put(`/${updateUser._id}`,  
    updateUser);
};

export const requestFindUserUpdate = async (id) => {
    return await userRequest.get(`/${id}`);
};

export const requestDeleteUser = async (id) => {
    return await userRequest.delete(`/${id}`);
};