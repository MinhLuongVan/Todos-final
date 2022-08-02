import { request } from "./request";
export const requestGetAllToDo = async () => {
    return await request.get('/');
};

export const requestGetAllToDoOwner = async () => {
    return await request.get('/td');
};

export const requestAddToDo = async (addToDo) => {
    return await request.post('/todo',addToDo);
};

export const requestUpdateToDo = async (updateTodo) => {
    return await request.put(`/${updateTodo._id}`,  
    updateTodo);
};

export const requestFindToDoUpdate = async (id) => {
    return await request.get(`/${id}`);
};

export const requestDeleteToDo = async (id) => {
    return await request.delete(`/${id}`);
};