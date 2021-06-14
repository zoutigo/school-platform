import React from 'react'
import ReactDOM from 'react-dom'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/fr'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
/* eslint-disable-next-line */
import reportWebVitals from './reportWebVitals'
import './index.css'
import App from './App'
import theme from './constants/theme'
import returnStoreAndPersistor from './redux/store'

moment.locale('fr')

const { store, persistor } = returnStoreAndPersistor()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils} locale="fr">
            <App />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
