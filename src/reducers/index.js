import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import profile from './profile';
import session from './session';
import user from './user';

export default combineReducers({
  router: routerReducer,
  profile,
  session,
  user
});
