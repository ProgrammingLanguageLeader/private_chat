import { registrationConstants } from "../constants";

const initialState = {
  fetching: false,
  errors: [],
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case registrationConstants.REGISTRATION_REQUEST: {
      return {
        ...state,
        fetching: true,
      };
    }
    case registrationConstants.REGISTRATION_SUCCESS: {
      return {
        ...state,
        fetching: false,
      };
    }
    case registrationConstants.REGISTRATION_FAILURE: {
      const errors = action.payload;
      return {
        ...state,
        fetching: false,
        errors,
      };
    }
    default: {
      return state;
    }
  }
};

export default registrationReducer;