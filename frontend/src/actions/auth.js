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
          localStorage.setItem('accessToken', JSON.stringify(access));
          localStorage.setItem('refreshToken', JSON.stringify(refresh));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              access, refresh
            },
          });
          history.push('/');
        },
        error => {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: error
          });
        }
      );
  };
};

const logout = () => dispatch => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  dispatch({
    type: authConstants.LOGOUT,
  });
  history.push('/');
};

const refreshTokens = (refreshToken) => dispatch => {
  dispatch({
    type: authConstants.REFRESH_TOKENS_REQUEST
  });
  authServices.refreshTokens(refreshToken)
    .then(
      tokens => {
        const { access, refresh } = tokens;
        dispatch({
          type: authConstants.REFRESH_TOKENS_SUCCESS,
          payload: {
            access, refresh
          },
        });
      },
      error => {
        dispatch({
          type: authConstants.REFRESH_TOKENS_FAILURE,
          payload: error,
        });
      }
    );
};

export const authActions = {
  login,
  logout,
  refreshTokens,
};