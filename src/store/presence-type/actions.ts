import { SET_PRESENCE_TYPE, PresenceType, PresenceTypeTypes, SET_PRESENCE_TYPES } from './types'

export const setPresenceType = (type: PresenceType): PresenceTypeTypes => ({
  type: SET_PRESENCE_TYPE,
  payload: type
})

export const setPresenceTypes = (types: PresenceType[]): PresenceTypeTypes => ({
  type: SET_PRESENCE_TYPES,
  payload: types
})