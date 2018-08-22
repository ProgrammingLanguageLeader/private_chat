import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';
import registrationReducer from './registration';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  registration: registrationReducer
});

export default rootReducer;