import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const authTokenObtain = () => {
  return null;
};

const authTokenRefresh = () => {
  return null;
};

const signUp = (email, username, password, firstName, lastName) => {
  return axios({
    method: 'post',
    url: BASE_URL + '/api/sign_up',
    data: {
      email: email,
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName
    }
  }).then(response => response.data);
};

export { authTokenObtain, authTokenRefresh, signUp };