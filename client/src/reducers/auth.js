import { REGISTER_SUCCESS, ACCOUNT_DELETED, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
    

}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case USER_LOADED:
            return {
                ...state, 
                isAuthenticated: true,
                loading: false,
                user: payload
            }
            case LOGIN_SUCCESS:
                    localStorage.setItem('token', payload.token);
                    return {
                        ...state,
                        ...payload,
                        isAuthenticated: true,
                        loading: false
            }
            case LOGIN_FAIL:
                    localStorage.removeItem('token');
                    return {
                        ...state,
                        token: null,
                        isAuthenticated: false,
                        loading:false
            }
        case LOGOUT:
            case ACCOUNT_DELETED:
                    localStorage.removeItem('token');
                    return {
                        ...state,
                        token: null,
                        isAuthenticated: false,
                        loading:false
                    }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading:false
            }
        case AUTH_ERROR:
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading:false
                }
        

        default:
            return state;
        
    }
}