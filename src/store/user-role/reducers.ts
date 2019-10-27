import {
  UserRoleTypes,
  UserRoleState,
  SET_ROLE,
  SET_ROLES
} from './types'

const initialState: UserRoleState = {
  role: {
    id: 0,
    name: ''
  },
  roles: []
}

export const userRoleReducer = (state = initialState, action: UserRoleTypes) => {
  switch (action.type) {
    case SET_ROLE:
      return {
        ...state,
        role: action.payload
      }

    case SET_ROLES:
      return {
        ...state,
        roles: action.payload
      }

    default:
      return state
  }
}