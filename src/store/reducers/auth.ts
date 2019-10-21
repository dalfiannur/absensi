import { ActionReducer } from '../../types/action-reducer';
import { AuthAction } from '../actions/auth';

export type AuthState = {
  username?: string;
  password?: string;
};

const initialState: AuthState = {
  username: '',
  password: '',
};

export const Auth = (state = initialState, action: ActionReducer) => {
  switch (action.type) {
    case AuthAction.SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    case AuthAction.SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};
