import axios from "../setup/axios";

const createRoles = (roles) => {
    return axios.post(`/api/v1/role/create`, [...roles]);
}

const fetchAllRole = () => {
    return axios.get(`/api/v1/role/read`);
}

const deleteRoles = (id) => {
    return axios.delete(`/api/v1/role/delete?id=${id}`);
}

const fetchRolesByGroup = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`);
}

const assignRoleToGroup = (data) => {
    return axios.post(`/api/v1/role/assign-to-group`, { data });
}

export { createRoles, fetchAllRole, deleteRoles, fetchRolesByGroup, assignRoleToGroup }