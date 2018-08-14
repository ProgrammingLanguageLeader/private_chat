import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const authTokenObtain = () => {
  return null;
};

const authTokenRefresh = () => {
  return null;
};

const signUp = (email, username, password, firstName, lastName) => {
  const RELATIVE_URL = '/api/sign_up';
  const METHOD = 'POST';
  return axios({
    method: METHOD,
    url: BASE_URL + RELATIVE_URL,
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