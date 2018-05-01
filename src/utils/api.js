import axios from 'axios';
import { getCookie } from './cookies';
import { API_BASE_URL } from '../constants'

const host = API_BASE_URL

const createApiUrl = pathArr => `${host}/${pathArr.join('/')}`;

const setAuthToken = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${getCookie(
    'token'
  )}`;
  axios.defaults.validateStatus = status => {
    return status === 304 || (status >= 200 && status <= 300);
  };
};

const api = {
  axios,
  setAuthToken,
  getProfile() {
    return axios({
      requestId: 'getProfileData',
      method: 'get',
      url: createApiUrl(['users', 'profile'])
    });
  },
  createUser(data) {
    return axios({
      requestId: 'registerUser',
      method: 'post',
      url: createApiUrl(['users']),
      data
    });
  },
  createSession(data) {
    return axios({
      requestId: 'createSession',
      method: 'post',
      url: createApiUrl(['login']),
      data
    });
  }
};

export default api;
