import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './auth';

const chatApp = combineReducers({
  routing: routerReducer,
  authReducer
});

export default chatApp;