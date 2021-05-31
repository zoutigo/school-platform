import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  SmallScreenNavIsOpened: false,
  ActiveRubric: { rubname: 'home', rubalias: 'home' },
  Routes: [],
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
})

export default settingsReducers
