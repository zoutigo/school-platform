import { createReducer } from '@reduxjs/toolkit'
import { initialAlertCollapse } from '../../constants/alerts'

const initialAlert = initialAlertCollapse

const initialState = {
  privateAccountMutate: initialAlert,
  privateAccountFetch: initialAlert,
  informationsInscriptions: initialAlert,
  albumMutate: initialAlert,
  albumFetch: initialAlert,
  albumPageMutate: initialAlert,
  albumPageFetch: initialAlert,
  paperMutate: initialAlert,
  paperFetch: initialAlert,
  pageMutate: initialAlert,
  pageFetch: initialAlert,
  login: initialAlert,
  register: initialAlert,
  mutate: initialAlert,
  fetch: initialAlert,
  parametersFetch: initialAlert,
  parametersMutate: initialAlert,
  membresFetch: initialAlert,
  membresMutate: initialAlert,
}

/* eslint-disable */
const actionsReducers = createReducer(initialState, {
  SET_PRIVATE_ACCOUNT_FETCH_ALERT: (state, action) => {
    state.privateAccountFetch = action.payload
  },
  SET_PRIVATE_ACCOUNT_MUTATE_ALERT: (state, action) => {
    state.privateAccountMutate = action.payload
  },
  SET_INFORMATIONS_INSCRIPTIONS_ALERT: (state, action) => {
    state.informationsInscriptions = action.payload
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
  SET_PAPER_MUTATE_ALERT: (state, action) => {
    state.paperMutate = action.payload
  },
  SET_PAPER_FETCH_ALERT: (state, action) => {
    state.paperFetch = action.payload
  },
  SET_PAGE_MUTATE_ALERT: (state, action) => {
    state.pageMutate = action.payload
  },
  SET_PAGE_FETCH_ALERT: (state, action) => {
    state.pageFetch = action.payload
  },
  SET_LOGIN_ALERT: (state, action) => {
    state.login = action.payload
  },
  SET_REGISTER_ALERT: (state, action) => {
    state.register = action.payload
  },
  SET_MUTATE_ALERT: (state, action) => {
    state.mutate = action.payload
  },
  SET_FETCH_ALERT: (state, action) => {
    state.fetch = action.payload
  },
  SET_EDITOR_FETCH_ALERT: (state, action) => {
    state.editorFetch = action.payload
  },
  SET_PARAMETERS_FETCH_ALERT: (state, action) => {
    state.parametersFetch = action.payload
  },
  SET_PARAMETERS_MUTATE_ALERT: (state, action) => {
    state.parametersMutate = action.payload
  },
  SET_MEMBRES_FETCH_ALERT: (state, action) => {
    state.membresFetch = action.payload
  },
  SET_MEMBRES_MUTATE_ALERT: (state, action) => {
    state.membresMutate = action.payload
  },
})

export default actionsReducers
