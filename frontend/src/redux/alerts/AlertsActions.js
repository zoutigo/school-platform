import { initialAlertCollapse } from '../../constants/alerts'
import {
  SET_PRIVATE_ACCOUNT_DATA_ALERT,
  SET_INFORMATIONS_INSCRIPTIONS_ALERT,
  SET_PRIVATE_ACCOUNT_MUTATE_ALERT,
  SET_ALBUM_MUTATE_ALERT,
  SET_ALBUM_FETCH_ALERT,
  SET_ALBUM_PAGE_FETCH_ALERT,
  SET_ALBUM_PAGE_MUTATE_ALERT,
  SET_LOGIN_ALERT,
  SET_REGISTER_ALERT,
  SET_PAPER_FETCH_ALERT,
  SET_PAPER_MUTATE_ALERT,
  SET_MUTATE_ALERT,
  SET_FETCH_ALERT,
  SET_EDITOR_FETCH_ALERT,
  SET_PAGE_FETCH_ALERT,
  SET_PAGE_MUTATE_ALERT,
  SET_PARAMETERS_FETCH_ALERT,
  SET_PARAMETERS_MUTATE_ALERT,
} from './AlertsActionsTypes'

export const setPrivateAccountDataAlert = (value = initialAlertCollapse) => ({
  type: SET_PRIVATE_ACCOUNT_DATA_ALERT,
  payload: value,
})
export const setInformationsInscriptionsAlert = (
  value = initialAlertCollapse
) => ({
  type: SET_INFORMATIONS_INSCRIPTIONS_ALERT,
  payload: value,
})
export const setPrivateAccountMutateAlert = (value = initialAlertCollapse) => ({
  type: SET_PRIVATE_ACCOUNT_MUTATE_ALERT,
  payload: value,
})
export const setAlbumMutateAlert = (value = initialAlertCollapse) => ({
  type: SET_ALBUM_MUTATE_ALERT,
  payload: value,
})
export const setAlbumFetchAlert = (value = initialAlertCollapse) => ({
  type: SET_ALBUM_FETCH_ALERT,
  payload: value,
})
export const setAlbumPageFetchAlert = (value = initialAlertCollapse) => ({
  type: SET_ALBUM_PAGE_FETCH_ALERT,
  payload: value,
})
export const setAlbumPageMutateAlert = (value = initialAlertCollapse) => ({
  type: SET_ALBUM_PAGE_MUTATE_ALERT,
  payload: value,
})
export const setPaperFetchAlert = (value = initialAlertCollapse) => ({
  type: SET_PAPER_FETCH_ALERT,
  payload: value,
})
export const setPaperMutateAlert = (value = initialAlertCollapse) => ({
  type: SET_PAPER_MUTATE_ALERT,
  payload: value,
})
export const setPageFetchAlert = (value = initialAlertCollapse) => ({
  type: SET_PAGE_FETCH_ALERT,
  payload: value,
})
export const setPageMutateAlert = (value = initialAlertCollapse) => ({
  type: SET_PAGE_MUTATE_ALERT,
  payload: value,
})

export const setLoginAlert = (value = initialAlertCollapse) => ({
  type: SET_LOGIN_ALERT,
  payload: value,
})
export const setRegisterAlert = (value = initialAlertCollapse) => ({
  type: SET_REGISTER_ALERT,
  payload: value,
})
export const setMutateAlert = (value = initialAlertCollapse) => ({
  type: SET_MUTATE_ALERT,
  payload: value,
})
export const setFetchAlert = (value = initialAlertCollapse) => ({
  type: SET_FETCH_ALERT,
  payload: value,
})
export const setEditorFetchAlert = (value = initialAlertCollapse) => ({
  type: SET_EDITOR_FETCH_ALERT,
  payload: value,
})
export const setParametersFetchAlert = (value = initialAlertCollapse) => ({
  type: SET_PARAMETERS_FETCH_ALERT,
  payload: value,
})
export const setParametersMutateAlert = (value = initialAlertCollapse) => ({
  type: SET_PARAMETERS_MUTATE_ALERT,
  payload: value,
})
