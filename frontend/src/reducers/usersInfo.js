import { usersInfoConstants } from '../constants';

const initialState = {
  users: {},
  fetching: false,
  errors: [],
};

const usersInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersInfoConstants.USERS_INFO_REQUEST: {
      return {
        ...state,
        errors: [],
        fetching: true,
      };
    }
    case usersInfoConstants.USERS_INFO_SUCCESS: {
      const { users } = action.payload;
      return {
        ...state,
        fetching: false,
        users
      };
    }
    case usersInfoConstants.USERS_INFO_FAILURE: {
      const { errors }  = action.payload;
      return {
        ...state,
        fetching: false,
        errors
      };
    }
    default: {
      return state;
    }
  }
};

export default usersInfoReducer;