import axios from 'axios';
import config from 'config';

const obtainUserInfo = (userId) => {
  return axios({
    url: `${config.apiUrl}/obtain_user_info/`,
    method: 'post',
    data: {
      'user_id': userId
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    return response.data;
  });
};

export const usersInfoServices = {
  obtainUserInfo
};
