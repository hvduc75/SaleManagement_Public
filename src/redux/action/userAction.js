import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_ERROR,
    UPDATE_ACCESS_TOKEN_SUCCESS,
    GET_USER_INFOR_SUCCESS,
    UPDATE_PROFILE_SUCCESS
} from './types';

export const UserLoginRequest = () => {
    return {
        type: USER_LOGIN_REQUEST,
    };
};

export const UserLoginSuccess = (data) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data,
    };
};

export const UserLoginError = () => {
    return {
        type: USER_LOGIN_ERROR,
    };
};

export const UserLogoutRequest = () => {
    return {
        type: USER_LOGOUT_REQUEST,
    };
};

export const UserLogoutSuccess = () => {
    return {
        type: USER_LOGOUT_SUCCESS,
    };
};

export const UserLogoutError = () => {
    return {
        type: USER_LOGOUT_ERROR,
    };
};

export const UpdateAccessTokenSuccess = (data) => {
    return {
        type: UPDATE_ACCESS_TOKEN_SUCCESS,
        payload: data,
    };
}

export const GetUserInforSuccess = (data) => {
    return {
        type: GET_USER_INFOR_SUCCESS,
        payload: data
    }
}


export const UpdateProfileSuccess = (data) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data
    }
}