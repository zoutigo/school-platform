import React from 'react'
import { useController, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

function InputTextControlNew({
  control,
  name,
  width,
  defaultValue,
  rules,
  example,
  ...rest
}) {
  const {
    field: { ref },
    fieldState: { error, isDirty },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue,
  })

  const inputProps = (value) => {
    switch (value) {
      case 'email':
        return { type: 'email' }
      case 'password':
      case 'passwordConfirm':
        return { type: 'password' }

      default:
        return { type: 'text' }
    }
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          inputRef={ref}
          inputProps={inputProps(name)}
          {...rest}
          fullWidth
          id="title"
          //   placeholder="le titre de votre suggestion"
          error={Boolean(error)}
          helperText={isDirty ? error?.message : example}
          FormHelperTextProps={{
            'data-testid': `${name}-error`,
          }}
          {...field}
          onChange={(event) => {
            field.onChange(event.target.value)
          }}
        />
      )}
    />
  )
}

InputTextControlNew.defaultProps = {
  defaultValue: null,
  width: '100%',
  rules: { fake: true },
  example: '',
}
InputTextControlNew.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  defaultValue: PropTypes.string,
  rules: PropTypes.shape({
    fake: PropTypes.bool,
  }),
  width: PropTypes.string,
  example: PropTypes.string,
}

export default InputTextControlNew
