export const SET_DEPARTEMENT = 'SET_DEPARTEMENT'
export const SET_DEPARTEMENTS = 'SET_DEPARTEMENTS'

export interface Departement {
  id?: number
  code: string
  name: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface DepartementState {
  departement: Departement
  departements: Departement[]
}

interface SetDepartementAction {
  type: typeof SET_DEPARTEMENT,
  payload: Departement
}

interface SetDepartementsAction {
  type: typeof SET_DEPARTEMENTS,
  payload: Departement[]
}

export type DepartementTypes = SetDepartementAction | SetDepartementsAction