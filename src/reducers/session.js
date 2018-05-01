import { setCookie, removeCookie, getCookie } from '../utils/cookies';
import api from '../utils/api';
import { push } from 'react-router-redux';

export const LOGIN_REQUESTED = 'session/LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'session/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'counter/LOGIN_FAILED';

export const LOGOUT_REQUESTED = 'session/LOGOUT_REQUESTED';
export const LOGOUT_SUCCESS = 'session/LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'counter/LOGOUT_FAILED';

const initialState = {
  loggedIn: false,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        loading: payload.loading
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        loggedIn: payload.loggedIn
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: payload.loading,
        loggedIn: payload.loggedIn,
        error: payload.error
      };

    case LOGOUT_REQUESTED:
      return {
        ...state,
        loading: payload.loading
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        loggedIn: payload.loggedIn
      };

    case LOGOUT_FAILED:
      return {
        ...state,
        loading: payload.loading,
        error: payload.error
      };

    default:
      return state;
  }
};

export const requestLogin = () => ({
  type: LOGIN_REQUESTED,
  payload: {
    loading: true
  }
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
  payload: {
    loading: false,
    loggedIn: true
  }
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: {
    loading: false,
    loggedIn: false,
    error: error || 'Unable to login'
  }
});

export const requestLogout = () => ({
  type: LOGOUT_REQUESTED,
  payload: {
    loading: true
  }
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  payload: {
    loading: false,
    loggedIn: false
  }
});

export const logoutFailed = error => ({
  type: LOGOUT_FAILED,
  payload: {
    loading: false,
    error: error || 'Unable to logout'
  }
});

export const createSession = user => dispatch => {
  dispatch(requestLogin());
  api
    .createSession(user)
    .then(response => {
      const { data } = response
      const { token } = data
      setCookie('token', token);
      dispatch(push('/profile'));
      api.setAuthToken(token);
      dispatch(loginSuccess());
    })
    .catch(res => {
      const { response: { data = {}}} = res
      const { errors = [] } = data
      dispatch(logoutFailed(errors[0]))
    })
}

export const login = token => dispatch => {
  if (token) {
    setCookie('token', token);
    dispatch(loginSuccess());
    api.setAuthToken(token);
    dispatch(push('/profile'));
  } else {
    dispatch(loginFailed());
  }
};

export const logout = token => dispatch => {
  removeCookie('token');
  dispatch(logoutSuccess());
  dispatch(push('/'));
};

export const checkAuth = () => dispatch => {
  const token = getCookie('token');
  if (token) {
    dispatch(loginSuccess());
    api.setAuthToken(token);
    dispatch(push('/profile'));
  } else {
    dispatch(loginFailed());
  }
};
