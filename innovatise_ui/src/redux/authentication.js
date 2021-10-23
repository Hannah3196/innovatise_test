import { LOCATION_CHANGE, push } from "connected-react-router";
import { RSAA } from 'redux-api-middleware';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';
export const GET_USERS_REQUEST = 'GET_USRRS_REQUEST';

export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE';
export const GET_USER_BY_ID_REQUEST = 'GET_USER_BY_ID_REQUEST';

export const authMiddleware = ({ dispatch }) => next => action => {
    const userToken = localStorage.getItem('token');
    if(action.type === LOCATION_CHANGE && action.payload.location.pathname !== '/login' && userToken == null) {
        return dispatch(push('/login'));
    }
    if(action.type === LOCATION_CHANGE && action.payload.location.pathname === '/login' && userToken !== null) {
        return dispatch(push('/users'));
    }
    return next(action);
}

export const loginUser = (request, callback) => ({
    [RSAA]: {
        endpoint: `http://localhost:5100/api/login`,
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json'},
        types: [
            {type: LOGIN_REQUEST},
            {
                type: LOGIN_SUCCESS,
                payload: async(action, state, res) => {
                    const json = await res.json();
                    return callback(json);
                }
            },
            {
                type: LOGIN_FAILURE,
                payload: async(actoon, state, res) => {
                    const json = await res.join();
                    return callback(json);
                }
            }
        ]
    }
});

export const registerUser = (request, callback) => ({
    [RSAA]: {
        endpoint: `http://localhost:5100/api/register`,
        method: 'POST',
        body: JSON.stringify(request),
        headers: { 'Content-Type': 'application/json'},
        types: [
            {type: REGISTER_REQUEST},
            {
                type: REGISTER_SUCCESS,
                payload: async(action, state, res) => {
                    const json = await res.json();
                    return callback(json);
                }
            },
            {
                type: REGISTER_FAILURE,
                payload: async(actoon, state, res) => {
                    const json = await res.join();
                    return callback(json);
                }
            }
        ]
    }
});

export const getUsers = ( callback) => ({
    [RSAA]: {
        endpoint: `http://localhost:5100/api/users`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
        types: [
            {type: GET_USERS_REQUEST},
            {
                type: GET_USERS_SUCCESS,
                payload: async(action, state, res) => {
                    const json = await res.json();
                    return callback(json);
                }
            },
            {
                type: GET_USERS_FAILURE,
                payload: async(actoon, state, res) => {
                    const json = await res.join();
                    return callback(json);
                }
            }
        ]
    }
});

export const getUserById = (request, callback) => ({
    [RSAA]: {
        endpoint: `http://localhost:5100/api/users/${request.id}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
        types: [
            {type: GET_USER_BY_ID_REQUEST},
            {
                type: GET_USER_BY_ID_SUCCESS,
                payload: async(action, state, res) => {
                    const json = await res.json();
                    return callback(json);
                }
            },
            {
                type: GET_USER_BY_ID_FAILURE,
                payload: async(actoon, state, res) => {
                    const json = await res.join();
                    return callback(json);
                }
            }
        ]
    }
});

export const userMiddleware = () => (next) => (action) => {
    next(action);
    switch(action.type) {
        case LOGIN_SUCCESS:
            console.log('Login success')
            break;
        case LOGIN_FAILURE:
            console.log('Login success')
            break;
        case REGISTER_SUCCESS:
            console.log('Register success')
            break;
        case REGISTER_FAILURE:
            console.log('Register failure')
            break;
        case GET_USERS_SUCCESS:
            console.log('Fetch users success')
            break;
        case GET_USERS_FAILURE:
            console.log('Fetch users failure')
            break;
        case GET_USER_BY_ID_SUCCESS:
            console.log('Fetch user by id success')
            break;
        case GET_USER_BY_ID_FAILURE:
            console.log('Fetch user by id failure')
            break;
        default:
            break;
    }
}
