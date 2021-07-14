import { createReducer } from '@reduxjs/toolkit'

const initialAlert = {
  severity: 'error',
  alertText: '',
  alertOpen: false,
}

const initialState = {
  privateAcccountData: initialAlert,
  informationsInscriptions: initialAlert,
  privateAccountDatasMutate: initialAlert,
  albumMutate: initialAlert,
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
  SET_ALBUM_MUTATE_ALERT: (state, action) => {
    state.albumMutate = action.payload
  },
})

export default actionsReducers
