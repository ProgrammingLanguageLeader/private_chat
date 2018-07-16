import { combineReducers } from 'redux';
import authReducer from './auth';


const chatApp = combineReducers({
  authReducer
});

export default chatApp;