import axios from '../utils/axiosCustomize';

const getProductDetail = (productId) => {
    return axios.get(`/api/v1/product_detail/read?productId=${productId}`);
}

const postCreateProductDetail = (description, contentMarkdown, productId, action) => {
    return axios.post('/api/v1/product_detail/create-or-update', { description, contentMarkdown, productId, action });
};

export { postCreateProductDetail, getProductDetail };
