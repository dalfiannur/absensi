import { DepartementState, DepartementTypes, SET_DEPARTEMENT, SET_DEPARTEMENTS } from './types'

const initialState: DepartementState = {
  departement: {
    id: 0,
    code: '',
    name: '',
    createdAt: '',
    updatedAt: ''
  },
  departements: []
}

export const departementReducer = (state = initialState, action: DepartementTypes) => {
  switch (action.type) {
    case SET_DEPARTEMENT:
      return {
        ...state,
        departement: action.payload
      }

    case SET_DEPARTEMENTS:
      return {
        ...state,
        departements: action.payload
      }

    default:
      return state
  }
}