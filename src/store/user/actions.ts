import { User, SET_USER, UserTypes, SET_USERS } from "./types"

export const setUser = (user: User): UserTypes => ({
  type: SET_USER,
  payload: user
})

export const setUsers = (users: User[]): UserTypes => ({
  type: SET_USERS,
  payload: users
})