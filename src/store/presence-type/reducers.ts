import { PresenceTypeState, PresenceTypeTypes, SET_PRESENCE_TYPE, SET_PRESENCE_TYPES } from './types'

const initialState: PresenceTypeState = {
  presenceType: {
    id: 0,
    code: '',
    name: '',
    startTime: '00:00',
    endTime: '00:00',
    createdAt: '',
    updatedAt: ''
  },
  presenceTypes: []
}

export const presenceTypeReducer = (state = initialState, action: PresenceTypeTypes) => {
  switch (action.type) {
    case SET_PRESENCE_TYPE:
      return {
        ...state,
        presenceType: action.payload
      }

    case SET_PRESENCE_TYPES:
      return {
        ...state,
        presenceTypes: action.payload
      }

    default:
      return state
  }
}