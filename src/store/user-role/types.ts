export const SET_ROLE = 'SET_ROLE'
export const SET_ROLES = 'SET_ROLES'

export interface UserRole {
  id?: number
  name: string
}

export interface UserRoleState {
  role: UserRole
  roles: UserRole[]
}

interface SetRoleAction {
  type: typeof SET_ROLE,
  payload: UserRole
}

interface SetRolesAction {
  type: typeof SET_ROLES,
  payload: UserRole[]
}

export type UserRoleTypes = SetRoleAction | SetRolesAction