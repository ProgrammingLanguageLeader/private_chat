import axios from 'axios';
import config from 'config';

const login = (username, password) => {
  return axios({
    url: `${config.apiUrl}/auth/token/obtain/`,
    method: 'post',
    data: {
      username, password
    }, 
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data;
  });
};

const refreshTokens = (refreshToken) => {
  return axios({
    url: `${config.apiUrl}/auth/token/refresh/`,
    method: 'post',
    data: {
      refresh: refreshToken
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data;
  });
};

export const authServices = {
  login,
  refreshTokens
};