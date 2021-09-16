import { combineReducers } from 'redux'

import userReducers from './user/UserReducers'
import settingsReducers from './settings/SettingsReducers'
import alertsReducers from './alerts/AlertsReducers'

const appReducer = combineReducers({
  settings: settingsReducers,
  user: userReducers,
  alerts: alertsReducers,
})

const rootReducer = (state, action) => {
  const newState = undefined
  if (action.type === 'USER_LOGOUT') return appReducer(newState, action)
  return appReducer(state, action)
}

export default rootReducer
