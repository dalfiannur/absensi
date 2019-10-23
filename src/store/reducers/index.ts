import { combineReducers } from 'redux';
import { Auth } from './auth';
import { Presence } from './presence';
import { User } from './user';
export const reducers = combineReducers({
  Auth,
  Presence,
  User,
});
