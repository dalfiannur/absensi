import { User } from "types/entity"

export const UserAction = {
  SET_USER: 'SET_USER',
  SET_USERS: 'SET_USERS',
  HANDLE_PRINT_DIALOG: 'HANDLE_PRINT_DIALOG'
}

export const setUser = (payload: User) => ({ type: UserAction.SET_USER, payload })
export const setUsers = (payload: User[]) => ({ type: UserAction.SET_USERS, payload })
export const handlePrintDialog = () => ({ type: UserAction.HANDLE_PRINT_DIALOG })