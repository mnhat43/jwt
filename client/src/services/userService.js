import axios from "../setup/axios";

const registerNewUser = (email, phone, username, password) => {
    return axios.post('/api/v1/register', {
        email, phone, username, password
    })
}

const loginUser = (valueLogin, password) => {
    return axios.post('/api/v1/login', {
        valueLogin, password
    })
}

const fetchAllUser = (page, limit) => {
    return axios.get(`/api/v1/user/read?page=${page}&limit=${limit}`);
}

const deleteUser = (id) => {
    return axios.delete(`/api/v1/user/delete?id=${id}`);
}

const fetchGroup = () => {
    return axios.get(`/api/v1/group/read`);
}

const createNewUser = (data) => {
    return axios.post(`/api/v1/user/create`, { ...data });
}

const updateUser = (data) => {
    return axios.post(`/api/v1/user/update`, { ...data });
}

const getUserAccount = () => {
    return axios.get(`/api/v1/account`);
}

const logoutUser = () => {
    return axios.post(`/api/v1/logout`);
}

export { registerNewUser, loginUser, fetchAllUser, deleteUser, fetchGroup, createNewUser, updateUser, getUserAccount, logoutUser };