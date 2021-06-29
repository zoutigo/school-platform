import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  SmallScreenNavIsOpened: false,
  ActiveRubric: { rubname: 'home', rubalias: 'home' },
  Routes: [],
  Asides: [],
  URL_PREFIX: '',
}

/* eslint-disable */
const settingsReducers = createReducer(initialState, {
  SET_OPEN_SMALL_SCREEN_NAV: (state, action) => {
    state.SmallScreenNavIsOpened = action.payload
      ? action.payload
      : !state.SmallScreenNavIsOpened
  },
  SET_ACTIVE_RUBRIC: (state, action) => {
    state.ActiveRubric = action.payload
  },
  SET_ROUTES: (state, action) => {
    const newRoutes = state.Routes
    const check = newRoutes.find((route) => route.path === action.payload.path)
    if (!check) {
      newRoutes.push(action.payload)
    }
    state.Routes = newRoutes
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
})

export default settingsReducers
