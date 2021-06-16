import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  User: '',
  Token: '',
}
/* eslint-disable */
const userReducers = createReducer(initialState, {
  SET_USER_TOKEN: (state, action) => {
    state.Token = action.payload
  },
  SET_USER_INFOS: (state, action) => {
    state.User = action.payload
  },
})

export default userReducers
