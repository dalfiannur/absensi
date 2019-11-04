import { Presence, PresenceTypes, SET_PRESENCES } from './types'

export const setPresences = (presences: Presence[]): PresenceTypes => ({
  type: SET_PRESENCES,
  payload: presences
})