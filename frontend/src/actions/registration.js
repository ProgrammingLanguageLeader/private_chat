import { history } from '../helpers';
import { registrationConstants } from '../constants';
import { registrationServices } from '../services';

const register = (username, email, password, passwordConfirmation, firstName, lastName) => {
  return dispatch => {
    dispatch({ 
      type: registrationConstants.REGISTRATION_REQUEST, 
    });
    registrationServices.register(username, email, password, passwordConfirmation, firstName, lastName)
      .then(
        response => {
          dispatch({
            type: registrationConstants.REGISTRATION_SUCCESS
          });
        },
        errors => {
          dispatch({
            type: registrationConstants.REGISTRATION_FAILURE,
            payload: errors.response.data
          });
        }
      );
  };
};

export const registrationActions = {
  register
};