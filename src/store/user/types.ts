import { UserRole } from "store/user-role/types";
import { Departement } from "store/departement/types";
import { Presence } from "store/presence/types";

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'

export interface User {
  id?: number
  roleId?: number
  nik: string
  name: string
  username: string
  password?: string
  improvement?: string
  role?: UserRole
  departement?: Departement
  presences?: Presence[]
  picture?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UserState {
  user: User,
  users: User[]
}

interface SetUserAction {
  type: typeof SET_USER,
  payload: User
}

interface SetUsersAction {
  type: typeof SET_USERS,
  payload: User[]
}

export type UserTypes = SetUserAction | SetUsersAction