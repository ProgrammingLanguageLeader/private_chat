import { history } from '../helpers';
import { authConstants } from '../constants';
import { authServices } from '../services';

const login = (username, password) => {
  return dispatch => {
    dispatch({ 
      type: authConstants.LOGIN_REQUEST, 
    });
    authServices.login(username, password)
      .then(
        tokens => {
          const { access, refresh } = tokens;
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            access, refresh
          });
          history.push('/');
        },
        error => {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            error
          });
        }
      );
  };
};

export const authActions = {
  login
};