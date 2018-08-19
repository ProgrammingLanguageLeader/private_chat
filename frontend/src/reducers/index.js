import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
});

export default rootReducer;