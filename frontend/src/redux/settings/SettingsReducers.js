import { createReducer } from '@reduxjs/toolkit'
import { apiFetchChemin } from '../../utils/api'

const chemins = async () => {
  const results = await apiFetchChemin()
  if (results && Array.isArray(results)) return results
  return null
}

const initialState = {
  SmallScreenNavIsOpened: false,
  URL_PREFIX: '',
  MainDialogDatas: '',
  MainDialogCount: 0,
  Variables: null,
  Chemins: chemins(),
}

/* eslint-disable */
const settingsReducers = createReducer(initialState, {
  SET_OPEN_SMALL_SCREEN_NAV: (state, action) => {
    state.SmallScreenNavIsOpened = action.payload
      ? action.payload
      : !state.SmallScreenNavIsOpened
  },

  SET_URL_PREFIX: (state, action) => {
    state.URL_PREFIX = action.payload
  },
  SET_MAIN_DIALOG_DATAS: (state, action) => {
    state.MainDialogDatas = action.payload
  },
  SET_MAIN_DIALOG_COUNT: (state, action) => {
    state.MainDialogCount = action.payload
  },
  SET_VARIABLES: (state, action) => {
    state.Variables = action.payload
  },
  SET_CHEMINS: (state, action) => {
    state.Chemins = action.payload
  },
})

export default settingsReducers
