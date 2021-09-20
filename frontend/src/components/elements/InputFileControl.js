import { Grid, styled, Collapse, TextField, withTheme } from '@material-ui/core'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { Alert } from '@material-ui/lab'

const StyledGrid = styled(Grid)(({ theme, width, bgcolor }) => ({
  margin: '1.5rem 0px',
  padding: '0px 1rem',
  '& >:first-child': {
    background: bgcolor,
    '& .MuiFormControl-root ': {
      background: 'transparent',
      width: width,
      '& .MuiInput-root': {
        height: '2.2rem',
        width: '40rem',
        paddingTop: '0.6rem 0px',
        fontSize: '0.9rem',
        fontFamily: 'Poppins',
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

const StyledShowGrid = withTheme(
  styled(({ show, ...rest }) => <StyledGrid {...rest} />)({
    display: ({ show }) => (show ? 'block' : 'none'),
  })
)
const StyledAlert = styled(Alert)(({ theme }) => ({
  minWidth: '100%',
  color: theme.palette.error.main,
}))

function InputFileControl({
  control,
  name,
  accept,
  multiple,
  initialValue,
  show,
  ...rest
}) {
  const [value, setValue] = React.useState('')

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: false },
    defaultValue: initialValue,
  })

  const { ref, ...inputProps } = field

  return (
    <StyledShowGrid width="100%" show={show}>
      <Grid item container>
        <TextField
          {...inputProps}
          inputRef={ref}
          {...rest}
          value={value}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ accept: accept, multiple: multiple }}
          onChange={(e) => {
            setValue(e.target.value)
            field.onChange(e.target.files)
          }}
        />
      </Grid>
      <Collapse in={invalid}>
        <Grid item container>
          <StyledAlert severity="error">{error && error.message}</StyledAlert>
        </Grid>
      </Collapse>
    </StyledShowGrid>
  )
}
InputFileControl.defaultProps = {
  initialValue: null,
  multiple: false,
  show: false,
}
InputFileControl.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  initialValue: PropTypes.string,
  accept: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  show: PropTypes.bool,
}
export default InputFileControl
