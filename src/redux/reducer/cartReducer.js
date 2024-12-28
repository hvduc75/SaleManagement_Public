import { GET_CART_SUCCESS, USER_LOGOUT_SUCCESS, GET_LIST_PRODUCTS_SUCCESS } from '../action/types';

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    cart: {
        products: [],
    },
    cartId: '',
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                cart: {
                    products: action.payload.DT.products || [],
                },
                cartId: action?.payload?.DT?.id,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                isLoading: false,
                isError: false,
                cart: {
                    products: [],
                },
                cartId: '',
            };
        case GET_LIST_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                cart: {
                    products: action?.payload,
                },
                cartId: state.cartId,
            };
        default:
            return state;
    }
};

export default cartReducer;
