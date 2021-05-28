import { SET_USER_INFOS, SET_USER_TOKEN } from './UserActionsTypes'

export const setUserInfos = (infos) => ({
  type: SET_USER_INFOS,
  payload: infos,
})

export const setUserToken = (token) => ({
  type: SET_USER_TOKEN,
  payload: token,
})
