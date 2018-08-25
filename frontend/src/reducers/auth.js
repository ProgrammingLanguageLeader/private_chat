import { authConstants } from "../constants";

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
const initialState = accessToken ? {
  access: accessToken,
  refresh: refreshToken,
  fetching: false,
  errors: '',
} : {
  access: '',
  refresh: '',
  fetching: false,
  errors: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST: {
      return {
        ...state,
        fetching: true,
        errors: '',
      };
    }
    case authConstants.LOGIN_SUCCESS: {
      const { access, refresh } = action.payload;
      return {
        ...state,
        access,
        refresh,
        fetching: false,
      };
    }
    case authConstants.LOGIN_FAILURE: {
      const { errors } = action.payload;
      return {
        ...state, 
        fetching: false,
        errors,
      };
    }
    case authConstants.LOGOUT: {
      return {
        access: '',
        refresh: '',
        fetching: false,
        errors: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;