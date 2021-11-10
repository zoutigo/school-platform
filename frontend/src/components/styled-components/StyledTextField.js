import { styled } from '@material-ui/styles'
import { TextField } from '@material-ui/core'

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiFormControl-root ': {
    background: 'transparent',
    width: '100%',
    '& .MuiInput-root': {
      height: '2.2rem',
      width: '85%',
      paddingTop: '0.6rem',
      fontSize: '1rem',
    },
    '& .MuiInputLabel-root': {
      color: theme.palette.secondary.main,
      fontSize: '0.8rem',
    },
    '& label.Mui-focused ': {
      color: 'green',
      textTransform: 'uppercase',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.info.dark,
    },
    '& .MuiFormHelperText-root': {
      color: theme.palette.info.dark,
      fontSize: '0.6rem',
      fontStyle: 'italic',
    },
  },
}))

export default StyledTextField
