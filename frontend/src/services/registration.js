import axios from 'axios';
import config from 'config';

const register = (username, email, password, passwordConfirmation, firstName, lastName) => {
  return axios({
    url: `${config.apiUrl}/sign_up`,
    method: "post",
    data: {
      "username": username, 
      "email": email,
      "password": password,
      "password_confirmation": passwordConfirmation,
      "first_name": firstName,
      "last_name": lastName
    }, 
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      return response.data;
    });
};

export const registrationServices = {
  register
};