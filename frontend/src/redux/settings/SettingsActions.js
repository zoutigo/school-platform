import {
  SET_ACTIVE_RUBRIC,
  SET_CATEGORY_ASIDE,
  SET_OPEN_SMALL_SCREEN_NAV,
  SET_ROUTES,
  SET_ALL_ROUTES,
  SET_URL_PREFIX,
} from './SettingsActionsTypes'

/* eslint-disable */
export const openSmallScreenNav = (value = null) => ({
  type: SET_OPEN_SMALL_SCREEN_NAV,
  payload: value,
})

export const setActiveRubric = (value) => ({
  type: SET_ACTIVE_RUBRIC,
  payload: value,
})
export const setRoutes = (value = null) => ({
  type: SET_ROUTES,
  payload: value,
})
export const setAllRoutes = (value = null) => ({
  type: SET_ALL_ROUTES,
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
