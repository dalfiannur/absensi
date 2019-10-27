import { UserRole, SET_ROLE, SET_ROLES, UserRoleTypes } from './types'

export const setRole = (role: UserRole): UserRoleTypes => ({
  type: SET_ROLE,
  payload: role
})

export const setRoles = (roles: UserRole[]): UserRoleTypes => ({
  type: SET_ROLES,
  payload: roles
})