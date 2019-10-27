import { UserState, UserTypes, SET_USER, SET_USERS } from "./types";

const initialState: UserState = {
  user: {
    nik: '',
    username: '',
    name: '',
    improvement: ''
  },
  users: []
}

export const userReducer = (state = initialState, action: UserTypes) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }

    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    
    default:
      return state
  }
}