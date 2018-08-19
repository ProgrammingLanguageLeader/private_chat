import { authConstants } from "../constants";

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
const initialState = accessToken ? {
  access: accessToken,
  refresh: refreshToken
} : {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      return {
        loggingIn: true
      };
    }
    case authConstants.LOGIN_SUCCESS: {
      const { access, refresh } = action;
      localStorage.setItem('accessToken', JSON.stringify(access));
      localStorage.setItem('refreshToken', JSON.stringify(refresh));
      return {
        access, refresh
      };
    }
    case authConstants.LOGIN_FAILURE: {
      return {};
    }
    case authConstants.LOGOUT: {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return {};
    }
    default: {
      return state;
    }
  }
};

export default authReducer;