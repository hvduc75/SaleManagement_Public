import axios from '../utils/axiosCustomize';

const getCartByUserId = (userId) => {
    return axios.get(`/api/v1/cart/read?userId=${userId}`);
};

const getProductsByCartId = (cartId) => {
    return axios.get(`/api/v1/cart/getAllProductByCartId?cartId=${cartId}`);
};

// const getAllProductByCheckbox = (cartId) => {
//     return axios.get(`/api/v1/cart/getAllProductByCheckbox?cartId=${cartId}`);
// };

const addToCart = (cartId, productId, quantity) => {
    return axios.post(`/api/v1/cart/add-to-cart`, { cartId, productId, quantity });
};

const updateQuantity = (cartId, productId, quantity) => {
    return axios.put(`/api/v1/cart/update-quantity`, { cartId, productId, quantity });
};

const updateIsChecked = (cartId, productId, isChecked) => {
    return axios.put(`/api/v1/cart/update-isChecked`, { cartId, productId, isChecked });
};

const deleteProductInCart = (cartId, productId) => {
    return axios.delete(`/api/v1/cart/delete-product`, {
        params: { cartId, productId },
    });
};

const deleteProductCarts = (data) => {
    return axios.delete(`/api/v1/cart/delete-cart-product`, { params: { data } });
};

export {
    getCartByUserId,
    addToCart,
    getProductsByCartId,
    updateQuantity,
    deleteProductInCart,
    updateIsChecked,
    // getAllProductByCheckbox,
    deleteProductCarts,
};
