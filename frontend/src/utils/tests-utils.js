/* eslint-disable prefer-const */
/* eslint-disable no-const-assign */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render } from '@testing-library/react'
import { responsiveFontSizes, createTheme } from '@material-ui/core/styles'

import { ThemeProvider } from '@material-ui/styles'
import cyan from '@material-ui/core/colors/cyan'
import deepPurple from '@material-ui/core/colors/deepPurple'
import lightGreen from '@material-ui/core/colors/lightGreen'
import green from '@material-ui/core/colors/green'
import deepOrange from '@material-ui/core/colors/deepOrange'
import red from '@material-ui/core/colors/red'
import amber from '@material-ui/core/colors/amber'
import { grey } from '@material-ui/core/colors'

import returnStoreAndPersistor from '../redux/store'

const { store } = returnStoreAndPersistor()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1,
      retryDelay: 500,
    },
  },
})

const theme = createTheme({
  palette: {
    primary: {
      // ligth: 'rgb(250,250,210)',
      light: 'rgba(255, 239, 211, 1)', // papaya
      // main: 'rgb(255,215,0)',
      main: 'rgba(255, 196, 155, 1)',
      dark: 'rgb(240,230,140)',
    },
    secondary: {
      light: 'rgba(173, 182, 196, 1)', // cadet-blue-crayola
      main: 'rgba(41, 76, 96, 1)', // charcoal
      dark: 'rgba(0, 27, 46, 1)', // oxford-blue
    },
    third: {
      ligth: 'rgb(250,250,210)',
      main: 'rgb(255,215,0)',
      dark: 'rgb(240,230,140)',
    },
    ecole: {
      ligth: cyan[50],
      main: cyan[200],
      dark: cyan[600],
    },
    viescolaire: {
      ligth: amber[50],
      main: amber[300],
      dark: amber[600],
    },
    classes: {
      ligth: green[50],
      main: green[500],
      dark: green[900],
    },
    apelogec: {
      ligth: deepPurple[50],
      main: deepPurple[300],
      dark: deepPurple[900],
    },
    informations: {
      ligth: deepOrange[50],
      main: deepOrange[400],
      dark: deepOrange[800],
    },
    private: {
      ligth: lightGreen.A100,
      main: lightGreen.A400,
      dark: red.A400,
    },
    visitor: {
      ligth: grey[200],
      main: grey[500],
      dark: grey[900],
    },
  },
  // typography: {
  //   h1: {
  //     fontFamily: "'Poppins','Raleway', sans-serif",
  //     fontSize: '12em',
  //     fontWeight: 'bold',
  //     letterSpacing: '1px',
  //     lineHeight: 1.2,
  //   },
  //   h2: {
  //     fontFamily: "'Comfortaa',cursive",
  //     fontSize: '1.1rem',
  //     fontWeight: 800,
  //     letterSpacing: '2px',
  //     lineHeight: 3,
  //     textTransform: 'uppercase',
  //     marginLeft: '8px',
  //     marginRight: '8px',
  //   },
  //   h3: {
  //     fontFamily: "'Comfortaa,cursive",
  //     fontSize: '1rem',
  //     letterSpacing: 4,
  //     lineHeight: 3,
  //     textTransform: 'uppercase',
  //   },
  //   h4: {
  //     fontFamily: "'Comfortaa',cursive",
  //     fontSize: '1rem',
  //     fontWeight: 800,
  //     letterSpacing: '1px',
  //     lineHeight: 3,
  //   },
  //   body1: {
  //     fontFamily: "Comfortaa',cursive",
  //     fontSize: '1rem',
  //     lineHeight: 1.1,
  //     letterSpacing: 2,
  //   },

  //   h6: {
  //     fontSize: '1rem',
  //     fontFamily: "'Comfortaa',cursive",
  //     letterSpacing: '1px',
  //     lineHeight: 3,
  //   },
  //   subtitle1: {
  //     fontSize: '0.9rem',
  //     fontFamily: "'Comfortaa',cursive",
  //     letterSpacing: '1px',
  //     textTransform: 'Capitalize',
  //   },
  //   caption: {
  //     fontFamily: "'Comfortaa',cursive",
  //   },
  // },
  overrides: {
    MuiInputBase: {
      input: {
        fontSize: '1em',
        minHeight: '1em',
      },
    },
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        color: 'blue',
        '&$focused': {
          // increase the specificity for the pseudo class
          color: 'blue',
        },
      },
    },
  },
})

// const AllTheProviders = ({ children }) => (
//   <QueryClientProvider client={queryClient}>
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <BrowserRouter>{children}</BrowserRouter>
//       </ThemeProvider>
//     </Provider>
//   </QueryClientProvider>
// )
const AllTheProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
)

const customRender = (ui, options) => {
  render(ui, { wrapper: AllTheProviders, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
