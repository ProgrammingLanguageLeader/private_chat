import axios from 'axios';
import config from 'config';

const login = (username, password) => {
  return axios({
    url: `${config.apiUrl}/auth/token/obtain/`,
    method: "post",
    data: {
      username, password
    }, 
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const { access, refresh } = response.data;
      return { access, refresh };
    });
};

export const authServices = {
  login
};