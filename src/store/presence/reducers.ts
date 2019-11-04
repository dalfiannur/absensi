import { PresenceState, PresenceTypes, SET_PRESENCE, SET_PRESENCES } from './types'

const initialState: PresenceState = {
  presences: []
}

export const presenceReducer = (state = initialState, action: PresenceTypes) => {
  switch (action.type) {
    case SET_PRESENCES:
      return {
        ...state,
        presences: action.payload
      }

    default:
      return state
  }
}