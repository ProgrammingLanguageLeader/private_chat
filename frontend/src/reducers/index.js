import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import registrationReducer from './registration';
import usersInfoReducer from './usersInfo';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  registration: registrationReducer,
  usersInfo: usersInfoReducer,
});

export default rootReducer;