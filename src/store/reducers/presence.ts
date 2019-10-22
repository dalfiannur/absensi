import { ActionReducer } from 'types/action-reducer';
import { PresenceAction } from 'store/actions/presence';
import { User } from 'types/entity';

export type PresenceState = {
  nik?: string;
  user: User
};

const initialState: PresenceState = {
  nik: '',
  user: {
    nik: '',
    name: ''
  }
};

export const Presence = (state = initialState, action: ActionReducer) => {
  switch (action.type) {
    case PresenceAction.SET_NIK:
      return {
        ...state,
        nik: action.payload,
      };

    case PresenceAction.SET_USER:
      return {
        ...state,
        user: action.payload
      }

    default:
      return state;
  }
};
