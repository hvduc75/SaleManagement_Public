import { GET_CART_SUCCESS, ADD_TO_CART_SUCCESS, GET_LIST_PRODUCTS_SUCCESS } from './types';

export const getCartId = (data) => {
    return {
        type: GET_CART_SUCCESS,
        payload: data,
    };
};

export const addToCartSuccess = (data) => {
    return {
        type: ADD_TO_CART_SUCCESS,
        payload: data,
    };
};

export const getListProductsSuccess = (data) => {
    return {
        type: GET_LIST_PRODUCTS_SUCCESS,
        payload: data,
    };
};