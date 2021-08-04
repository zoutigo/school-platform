import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  SmallScreenNavIsOpened: false,
  Asides: [],
  URL_PREFIX: '',
  MainDialogDatas: '',
  MainDialogCount: 0,
}

/* eslint-disable */
const settingsReducers = createReducer(initialState, {
  SET_OPEN_SMALL_SCREEN_NAV: (state, action) => {
    state.SmallScreenNavIsOpened = action.payload
      ? action.payload
      : !state.SmallScreenNavIsOpened
  },

  SET_CATEGORY_ASIDE: (state, action) => {
    const [path, datas] = action.payload
    let newAsides = state.Asides
    const verify = newAsides.find(
      ([asidePath, asideDatas]) => path === asidePath
    )
    if (!verify) {
      newAsides.push(action.payload)
    } else {
      newAsides.map((aside) => {
        return aside[0] === path ? action.payload : aside
      })
    }
    state.Asides = newAsides
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
})

export default settingsReducers
