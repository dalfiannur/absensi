import { combineReducers } from 'redux';
import { Auth } from './auth';
import { Presence } from './presence';
export const reducers = combineReducers({
  Auth,
  Presence,
});
