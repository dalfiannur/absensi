import { PresenceState, PresenceTypes, SET_PRESENCE, SET_PRESENCES } from './types'

const initialState: PresenceState = {
  presence: {
    userId: 0,
    typeId: 0
  },
  presences: []
}

export const presenceReducer = (state = initialState, action: PresenceTypes) => {
  switch (action.type) {
    case SET_PRESENCE:
      return {
        ...state,
        presence: action.payload
      }

    case SET_PRESENCES:
      return {
        ...state,
        presences: action.payload
      }

    default:
      return state
  }
}