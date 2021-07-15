import {
  SET_PRIVATE_ACCOUNT_DATA_ALERT,
  SET_INFORMATIONS_INSCRIPTIONS_ALERT,
  SET_PRIVATE_ACCOUNT_MUTATE_ALERT,
  SET_ALBUM_MUTATE_ALERT,
  SET_ALBUM_FETCH_ALERT,
  SET_ALBUM_PAGE_FETCH_ALERT,
  SET_ALBUM_PAGE_MUTATE_ALERT,
} from './AlertsActionsTypes'

export const setPrivateAccountDataAlert = (value = null) => ({
  type: SET_PRIVATE_ACCOUNT_DATA_ALERT,
  payload: value,
})
export const setInformationsInscriptionsAlert = (value = null) => ({
  type: SET_INFORMATIONS_INSCRIPTIONS_ALERT,
  payload: value,
})
export const setPrivateAccountMutateAlert = (value = null) => ({
  type: SET_PRIVATE_ACCOUNT_MUTATE_ALERT,
  payload: value,
})
export const setAlbumMutateAlert = (value = null) => ({
  type: SET_ALBUM_MUTATE_ALERT,
  payload: value,
})
export const setAlbumFetchAlert = (value = null) => ({
  type: SET_ALBUM_FETCH_ALERT,
  payload: value,
})
export const setAlbumPageFetchAlert = (value = null) => ({
  type: SET_ALBUM_PAGE_FETCH_ALERT,
  payload: value,
})
export const setAlbumPageMutateAlert = (value = null) => ({
  type: SET_ALBUM_PAGE_MUTATE_ALERT,
  payload: value,
})
