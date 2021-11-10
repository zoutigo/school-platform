import React from 'react'
import PropTypes from 'prop-types'
import { useController, Controller } from 'react-hook-form'
import { DatePicker } from '@material-ui/pickers'
import { Grid, TextField } from '@material-ui/core'
import { styled } from '@material-ui/styles'

const StyledGrid = styled(Grid)(({ theme, width }) => ({
  margin: '1rem 0px',
  padding: '0px 1rem',
  '& .MuiFormControl-root ': {
    background: 'transparent',
    width: width || '100%',
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

function DatePickerInput({
  control,
  name,
  defaultValue,
  variant,
  format,
  rules,
  example,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error, isDirty },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules: rules,
  })

  const { ref, ...inputProps } = field
  const today = new Date()
  const past = defaultValue !== today ? false : today > defaultValue

  return (
    <DatePicker
      {...inputProps}
      inputRef={ref}
      autoOk
      disabled={past}
      clearable
      format={format}
      inputVariant={variant}
      minDate={today}
      error={invalid}
      helperText={invalid ? error.message : example}
      {...rest}
      style={{ width: '100%' }}
    />
  )
}

DatePickerInput.defaultProps = {
  defaultValue: new Date(),
  variant: 'standard',
}

DatePickerInput.propTypes = {
  defaultValue: PropTypes.instanceOf(Date),
  control: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  format: PropTypes.string.isRequired,
  example: PropTypes.string.isRequired,
  rules: PropTypes.shape({
    fake: PropTypes.bool,
  }).isRequired,
}

export default DatePickerInput
