import { Presence, PresenceTypes, SET_PRESENCE, SET_PRESENCES } from './types'

export const setPresence = (presence: Presence): PresenceTypes => ({
  type: SET_PRESENCE,
  payload: presence
})

export const setPresences = (presences: Presence[]): PresenceTypes => ({
  type: SET_PRESENCES,
  payload: presences
})