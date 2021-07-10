import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  privateAcccountData: {
    severity: 'error',
    alertText: '',
    alertOpen: false,
  },
  informationsInscriptions: {
    severity: 'error',
    alertText: '',
    alertOpen: false,
  },
  privateAccountDatasMutate: {
    severity: 'error',
    alertText: '',
    alertOpen: false,
  },
}

/* eslint-disable */
const actionsReducers = createReducer(initialState, {
  SET_PRIVATE_ACCOUNT_DATA_ALERT: (state, action) => {
    state.privateAcccountData = action.payload
  },
  SET_INFORMATIONS_INSCRIPTIONS_ALERT: (state, action) => {
    state.informationsInscriptions = action.payload
  },
  SET_PRIVATE_ACCOUNT_MUTATE_ALERT: (state, action) => {
    state.privateAccountDatasMutate = action.payload
  },
})

export default actionsReducers
