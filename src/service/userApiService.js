import axios from '../utils/axiosCustomize';

const getAllUsers = () => {
    return axios.get('/api/v1/get-all-user');
};

const getUserById = (userId) => {
    return axios.get(`/api/v1/get-user-by-id?userId=${userId}`);
};

const getUsersByWeek = (startDate) => {
    return axios.get(`/api/v1/get-All-User-By-Week?startDate=${startDate}`);
};

const getUserWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/get-All-User?page=${page}&limit=${limit}`);
};

const postCreateNewUser = (email, password, username, phone, address, groupId, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('phone', phone);
    data.append('address', address);
    data.append('image', image);
    data.append('groupId', groupId);
    return axios.post('/api/v1/create-user', data);
};

const putUpdateUser = (id, username, address, groupId, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('address', address);
    data.append('image', image);
    data.append('groupId', groupId);
    return axios.put('/api/v1/update-user', data);
};

const UpdateProfile = (id, username, gender, avatar, birthDay) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('gender', gender);
    data.append('avatar', avatar);
    data.append('birthDay', birthDay);
    return axios.put('/api/v1/update-profile', data);
};

const deleteUser = (id) => {
    return axios.delete("/api/v1/delete-user", {data: {id: id}})
};

export { postCreateNewUser, getAllUsers, getUserWithPaginate, putUpdateUser, deleteUser, UpdateProfile, getUserById, getUsersByWeek };
