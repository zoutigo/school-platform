import {
  SET_ACTIVE_RUBRIC,
  SET_CATEGORY_ASIDE,
  SET_MUTATION_ERROR,
  SET_OPEN_SMALL_SCREEN_NAV,
  SET_ROUTES,
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
export const setCategoryAside = (value = null) => ({
  type: SET_CATEGORY_ASIDE,
  payload: value,
})
export const setMutationError = (value = null) => ({
  type: SET_MUTATION_ERROR,
  payload: value,
})
