import { registrationConstants } from "../constants";

const initialState = {};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case registrationConstants.REGISTRATION_REQUEST: {
      return {
        registering: true
      };
    }
    case registrationConstants.REGISTRATION_SUCCESS: {
      console.log(action.response);
      return {
        success: true
      };
    }
    case registrationConstants.REGISTRATION_FAILURE: {
      return {
        errors: action.errors
      };
    }
    default: {
      return state;
    }
  }
};

export default registrationReducer;