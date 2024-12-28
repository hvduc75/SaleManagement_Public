import axios from '../utils/axiosCustomize';

const createNewOrder = (data) => {
    return axios.post(`/api/v1/order/create`, data);
};

const getOrdersByUserId = (userId, condition) => {
    return axios.get(`/api/v1/order/getOrdersByUserId?userId=${userId}&condition=${condition}`);
};

const getOrdersBySearchText = (userId, condition, searchText) => {
    return axios.get(
        `/api/v1/order/getOrderBySearchText?userId=${userId}&condition=${condition}&searchText=${searchText}`,
    );
};

const getOrderDetail = (orderId) => {
    return axios.get(`/api/v1/order/getOrderDetail?orderId=${orderId}`);
};

const getAllOrderPaginate = (page, limit, condition, date) => {
    return axios.get(
        `/api/v1/order/getAllOrderPaginate?page=${page}&limit=${limit}&condition=${condition}&date=${date}`,
    );
};

const getAllOrderByCondition = (page, limit, condition) => {
    return axios.get(`/api/v1/order/getAllOrderByCondition?page=${page}&limit=${limit}&condition=${condition}`);
};

const confirmOrder = (id) => {
    return axios.put(`/api/v1/order/confirmOrder`, { id });
};

const confirmDeliveredOrder = (id, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('image', image);
    return axios.put('/api/v1/order/ConfirmDeliveredOrder', data);
};

const cancelOrder = (id) => {
    return axios.put(`/api/v1/order/cancelOrder`, { id });
};

const getAllOrderInDay = () => {
    return axios.get('/api/v1/order/getAllOrderInDay');
};

const getWeeklyRevenue = (date) => {
    return axios.get(`/api/v1/order/getAllOrderInWeek?startDate=${date}`);
};

export {
    createNewOrder,
    getOrdersByUserId,
    getAllOrderPaginate,
    confirmOrder,
    getAllOrderInDay,
    getWeeklyRevenue,
    getAllOrderByCondition,
    getOrderDetail,
    confirmDeliveredOrder,
    cancelOrder,
    getOrdersBySearchText,
};
