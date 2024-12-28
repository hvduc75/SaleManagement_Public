import axios from '../utils/axiosCustomize';

const getUserInforDefault = (userId) => {
    return axios.get(`/api/v1/user_infor/read?userId=${userId}`);
};

const postCreateNewUserInfor = (userName, phone, province, district, commune, address, typeAddress, isDefault, userId) => {
    return axios.post('/api/v1/user_infor/create', {userName, phone, province, district, commune, address, typeAddress, isDefault, userId});
};

const updateUserInfor = (userName, phone, province, district, commune, address, typeAddress, isDefault, userId, id, Selected) => {
    return axios.put('/api/v1/user_infor/updateUserInfo', {userName, phone, province, district, commune, address, typeAddress, isDefault, userId, id, Selected});
};

const getListUserInfo = (userId) => {
    return axios.get(`/api/v1/user_infor/getListUserInfo?userId=${userId}`);
};

export { postCreateNewUserInfor, getUserInforDefault, getListUserInfo, updateUserInfor};
