import { combineReducers } from 'redux'

import userReducers from './user/UserReducers'
import settingsReducers from './settings/SettingsReducers'

const rootReducer = combineReducers({
  settings: settingsReducers,
  user: userReducers,
})

export default rootReducer
