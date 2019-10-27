export const SET_PRESENCE_TYPE = 'SET_PRESENCE_TYPE'
export const SET_PRESENCE_TYPES = 'SET_PRESENCE_TYPES'

export interface PresenceType {
  id?: number
  code: string
  name: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface PresenceTypeState {
  presenceType: PresenceType
  presenceTypes: PresenceType[]
}

interface SetPresenceTypeAction {
  type: typeof SET_PRESENCE_TYPE,
  payload: PresenceType
}

interface SetPresenceTypesAction {
  type: typeof SET_PRESENCE_TYPES,
  payload: PresenceType[]
}

export type PresenceTypeTypes = SetPresenceTypeAction | SetPresenceTypesAction