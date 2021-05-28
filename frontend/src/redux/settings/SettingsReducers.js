import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  SmallScreenNavIsOpened: false,
}

/* eslint-disable */
const settingsReducers = createReducer(initialState, {
  SET_OPEN_SMALL_SCREEN_NAV: (state, action) => {
    state.SmallScreenNavIsOpened = action.payload
      ? action.payload
      : !state.SmallScreenNavIsOpened
  },
})

export default settingsReducers
