import { User } from "store/user/types"
import { Departement } from "store/departement/types"
import { PresenceType } from "store/presence-type/types"

export const SET_PRESENCE = 'SET_PRESENCE'
export const SET_PRESENCES = 'SET_PRESENCES'

export interface Presence {
  type: PresenceType
  createdAt: Date | String
}

export interface PresenceState {
  presences: Presence[]
}

interface SetPresencesAction {
  type: typeof SET_PRESENCES,
  payload: Presence[]
}

export type PresenceTypes = SetPresencesAction