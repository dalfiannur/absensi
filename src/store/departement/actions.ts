import { Departement, DepartementTypes, SET_DEPARTEMENTS, SET_DEPARTEMENT } from './types'

export const setDepartement = (departement: Departement): DepartementTypes => ({
  type: SET_DEPARTEMENT,
  payload: departement
})

export const setDepartements = (departements: Departement[]): DepartementTypes => ({
  type: SET_DEPARTEMENTS,
  payload: departements
})