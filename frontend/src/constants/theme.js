import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import deepPurple from '@material-ui/core/colors/deepPurple'
import lightGreen from '@material-ui/core/colors/lightGreen'
import deepOrange from '@material-ui/core/colors/deepOrange'
import red from '@material-ui/core/colors/red'
import amber from '@material-ui/core/colors/amber'

const initialTheme = createMuiTheme({
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
      ligth: lightGreen[50],
      main: lightGreen[500],
      dark: lightGreen[900],
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
      ligth: red[50],
      main: red[500],
      dark: red[900],
    },
  },
  typography: {
    h1: {
      fontFamily: "'Poppins','Raleway', sans-serif",
      fontSize: '12em',
      fontWeight: 'bold',
      letterSpacing: '1px',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: "'Comfortaa',cursive",
      fontSize: '1.1rem',
      fontWeight: 800,
      letterSpacing: '2px',
      lineHeight: 3,
      textTransform: 'uppercase',
      marginLeft: '8px',
      marginRight: '8px',
    },
    h3: {
      fontFamily: "'Comfortaa,cursive",
      fontSize: '1rem',
      // fontWeight: 400,
      letterSpacing: 4,
      lineHeight: 3,
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: "'Comfortaa',cursive",
      fontSize: '1rem',
      fontWeight: 800,
      letterSpacing: '1px',
      lineHeight: 3,
    },
    body1: {
      fontFamily: "Comfortaa',cursive",
      fontSize: '1rem',
      letterSpacing: 4,
    },

    h6: {
      fontSize: '1rem',
      fontFamily: "'Comfortaa',cursive",
      letterSpacing: '1px',
      lineHeight: 3,
    },
    subtitle1: {
      fontSize: '0.8rem',
      fontFamily: 'sans-serif',
      letterSpacing: 1,
    },
    caption: {
      fontFamily: "'Comfortaa',cursive",
    },
  },
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

const theme = responsiveFontSizes(initialTheme, { factor: 3 })

export default theme
