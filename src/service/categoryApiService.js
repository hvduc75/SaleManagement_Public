import axios from '../utils/axiosCustomize';

const getAllCategories = () => {
    return axios.get('/api/v1/get-all-category');
};

const getAllCategoriesWithStatus = (hot) => {
    return axios.get(`/api/v1/get-all-banner?hot=${hot}`);
}

const getCategoryWithPaginate = (page, limit) => {
    return axios.get(`/api/v1/get-all-category?page=${page}&limit=${limit}`);
};

const postCreateNewCategory = (name, hot, description, image) => {
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('image', image);
    data.append('hot', hot);
    return axios.post('/api/v1/create-category', data);
};

const putUpdateCategory = (id, name, hot, description, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('name', name);
    data.append('description', description);
    data.append('image', image);
    data.append('hot', hot);
    return axios.put('/api/v1/update-category', data);
};

const deleteCategory = (id) => {
    return axios.delete("/api/v1/delete-category", {data: {id: id}})
};

export { postCreateNewCategory, getAllCategories, getCategoryWithPaginate, putUpdateCategory, deleteCategory, getAllCategoriesWithStatus };
