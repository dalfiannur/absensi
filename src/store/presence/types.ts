import { User } from "store/user/types"
import { Departement } from "store/departement/types"

export const SET_PRESENCE = 'SET_PRESENCE'
export const SET_PRESENCES = 'SET_PRESENCES'

export interface Presence {
  id?: number
  userId: number
  typeId: number
  user?: User,
  departement?: Departement
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface PresenceState {
  presence: Presence
  presences: Presence[]
}

interface SetPresenceAction {
  type: typeof SET_PRESENCE,
  payload: Presence
}

interface SetPresencesAction {
  type: typeof SET_PRESENCES,
  payload: Presence[]
}

export type PresenceTypes = SetPresenceAction | SetPresencesAction