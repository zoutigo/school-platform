import React from 'react'
import { useController } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Collapse, Grid, TextField } from '@material-ui/core'
import { styled, useTheme } from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert'

const StyledGrid = styled(Grid)(({ theme, width, bgcolor }) => ({
  margin: '1rem 0px',
  padding: '0px 1rem',
  '& >:first-child': {
    background: bgcolor,
    '& .MuiFormControl-root ': {
      background: 'transparent',
      width: width,
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
  },
}))

const StyledAlert = styled(Alert)(({ theme }) => ({
  minWidth: '100%',
  color: theme.palette.error.main,
}))

function InputTextControl({ control, name, width, initialValue, ...rest }) {
  const theme = useTheme()
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error, isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: initialValue,
  })

  return (
    <StyledGrid
      item
      container
      width={width}
      bgcolor={invalid && isTouched ? theme.palette.error.light : 'whitesmoke'}
      className="field"
    >
      <Grid item container>
        <TextField {...inputProps} inputRef={ref} {...rest} />
      </Grid>
      <Collapse in={invalid}>
        <Grid item container>
          <StyledAlert severity="error">{error && error.message}</StyledAlert>
        </Grid>
      </Collapse>
    </StyledGrid>
  )
}

InputTextControl.defaultProps = {
  initialValue: null,
  width: '100%',
}
InputTextControl.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  initialValue: PropTypes.string,
  width: PropTypes.string,
}

export default InputTextControl
