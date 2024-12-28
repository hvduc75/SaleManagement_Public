import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT_SUCCESS,
    UPDATE_ACCESS_TOKEN_SUCCESS,
    GET_USER_INFOR_SUCCESS,
    UPDATE_PROFILE_SUCCESS,
} from '../action/types';

const INITIAL_STATE = {
    isLoading: false,
    isError: false,
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        phone: '',
        image: '',
        role: '',
        email: '',
        id: '',
        gender: '',
        birthDay: '',
    },
    userInfor: {
        id: '',
        province: '',
        district: '',
        commune: '',
        address: '',
        typeAddress: '',
        isDefault: '',
    },
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.username,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email,
                    id: action?.payload?.DT?.id,
                    phone: action?.payload?.DT?.phone,
                    image: action?.payload?.DT?.avatar,
                    gender: action?.payload?.DT?.sex,
                    birthDay: action?.payload?.DT?.birthDay,
                },
                isAuthenticated: true,
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: '',
                },
                userInfor: {
                    id: '',
                    province: '',
                    district: '',
                    commune: '',
                    address: '',
                    typeAddress: '',
                    isDefault: '',
                },
                isAuthenticated: false,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                account: {
                    ...state.account,
                    image: action?.payload?.DT?.avatar,
                    username: action?.payload?.DT?.username,
                    gender: action?.payload?.DT?.sex,
                    birthDay: action?.payload?.DT?.birthDay,
                }
            }
        case UPDATE_ACCESS_TOKEN_SUCCESS:
            return {
                ...state,
                account: {
                    ...state.account,
                    access_token: action.payload,
                },
            };
        case GET_USER_INFOR_SUCCESS:
            return {
                ...state,
                userInfor: {
                    id: action?.payload?.DT?.id,
                    province: action?.payload?.DT?.province,
                    district: action?.payload?.DT?.district,
                    commune: action?.payload?.DT?.commune,
                    address: action?.payload?.DT?.address,
                    typeAddress: action?.payload?.DT?.typeAddress,
                    isDefault: action?.payload?.DT?.isDefault,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
