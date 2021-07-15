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
  albumFetch: initialAlert,
  albumPageMutate: initialAlert,
  albumPageFetch: initialAlert,
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
  SET_ALBUM_FETCH_ALERT: (state, action) => {
    state.albumFetch = action.payload
  },
  SET_ALBUM_PAGE_MUTATE_ALERT: (state, action) => {
    state.albumPageMutate = action.payload
  },
  SET_ALBUM_PAGE_FETCH_ALERT: (state, action) => {
    state.albumPageFetch = action.payload
  },
})

export default actionsReducers
