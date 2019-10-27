import { createStore, combineReducers } from 'redux';
import { userRoleReducer } from './user-role/reducers';
import { userReducer } from './user/reducers';
import { presenceTypeReducer } from './presence-type/reducers';
import { departementReducer } from './departement/reducers';
import { presenceReducer } from './presence/reducers';

const rootReducer = combineReducers({
  UserRole: userRoleReducer,
  User: userReducer,
  PresenceType: presenceTypeReducer,
  Departement: departementReducer,
  Presence: presenceReducer
})

export type AppState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);
