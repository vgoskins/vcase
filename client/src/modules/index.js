import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import cases from './cases';
import unbox from './unbox';
import keys from './keys';
import error from './error';
import auth from './auth';

export default combineReducers({
  routing: routerReducer,
  cases,
  unbox,
  auth,
  keys,
  error,
});
