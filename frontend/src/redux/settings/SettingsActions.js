import {
  SET_CATEGORY_ASIDE,
  SET_OPEN_SMALL_SCREEN_NAV,
  SET_URL_PREFIX,
  SET_MAIN_DIALOG_DATAS,
  SET_MAIN_DIALOG_COUNT,
} from './SettingsActionsTypes'

/* eslint-disable */
export const openSmallScreenNav = (value = null) => ({
  type: SET_OPEN_SMALL_SCREEN_NAV,
  payload: value,
})

export const setCategoryAside = (value = null) => ({
  type: SET_CATEGORY_ASIDE,
  payload: value,
})
export const setUrlPrefix = (value = null) => ({
  type: SET_URL_PREFIX,
  payload: value,
})
export const setMainDialogDatas = (value = null) => ({
  type: SET_MAIN_DIALOG_DATAS,
  payload: value,
})

export const setMainDialogCount = (value = 1) => ({
  type: SET_MAIN_DIALOG_COUNT,
  payload: value,
})
