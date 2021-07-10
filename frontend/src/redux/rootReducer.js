import { combineReducers } from 'redux'

import userReducers from './user/UserReducers'
import settingsReducers from './settings/SettingsReducers'
import alertsReducers from './alerts/AlertsReducers'

const rootReducer = combineReducers({
  settings: settingsReducers,
  user: userReducers,
  alerts: alertsReducers,
})

export default rootReducer
