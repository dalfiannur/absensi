import { User as UserEntity } from 'types/entity';
import { ActionReducer } from 'types/action-reducer';
import { UserAction } from 'store/actions/user';

export type UserState = {
  user: UserEntity;
  users: UserEntity[];
  openPrintDialog: boolean;
};

const initialState: UserState = {
  user: {
    nik: '',
    name: '',
    improvement: ''
  },
  users: [],
  openPrintDialog: false
};

export const User = (state = initialState, action: ActionReducer) => {
  switch (action.type) {
    case UserAction.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case UserAction.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case UserAction.HANDLE_PRINT_DIALOG:
      return {
        ...state,
        openPrintDialog: !state.openPrintDialog
      }
    default:
      return state;
  }
};
