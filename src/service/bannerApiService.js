import axios from '../utils/axiosCustomize';

const getAllBanners = () => {
    return axios.get('/api/v1/get-all-banner');
};

const getAllBannersWithStatus = (status) => {
    return axios.get(`/api/v1/get-all-banner?status=${status}`);
}

const getBannerWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/get-all-banner?page=${page}&limit=${limit}`);
};

const postCreateNewBanner = (name, status, description, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('image', image);
    data.append('status', status);
    return axios.post('/api/v1/create-banner', data);
};

const putUpdateBanner = (id, name, status, description, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('description', description);
    data.append('image', image);
    data.append('status', status);
    return axios.put('/api/v1/update-banner', data);
};

const deleteBanner = (id) => {
    return axios.delete("/api/v1/delete-banner", {data: {id: id}})
};

export { postCreateNewBanner, getAllBanners, getBannerWithPaginate, putUpdateBanner, deleteBanner, getAllBannersWithStatus };
