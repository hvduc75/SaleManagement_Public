import axios from '../utils/axiosCustomize';

const fetchAllRole = () => {
    return axios.get('/api/v1/role/read');
};

const createAddRole = (data) => {
    return axios.post('/api/v1/role/create', data);
};

const updateRole = (id, url, description) => {
    return axios.put('/api/v1/role/update', { id, url, description });
};

const deleteRole = (roleId) => {
    return axios.delete(`/api/v1/role/delete?roleId=${roleId}`);
};

const fetchRolesByGroup = (groupId) => {
    return axios.get(`api/v1/role/by-group${groupId}`);
};

const assignRoleToGroup = (data) => {
    return axios.post('api/v1/role/assign-to-group', { data });
};

export { createAddRole, deleteRole, fetchAllRole, fetchRolesByGroup, assignRoleToGroup, updateRole };
