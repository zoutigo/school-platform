import React from 'react'
import { useController, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import StyledTextField from '../../styled-components/StyledTextField'

function TextInput({
  control,
  name,
  width,
  defaultValue,
  rules,
  example,
  ...rest
}) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error, isDirty },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue,
  })
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <StyledTextField
          inputRef={ref}
          {...rest}
          fullWidth
          id="title"
          //   placeholder="le titre de votre suggestion"
          error={Boolean(error)}
          helperText={isDirty ? error?.message : example}
          {...field}
          onChange={(event) => {
            field.onChange(event.target.value)
          }}
        />
      )}
    />
  )
}

TextInput.defaultProps = {
  defaultValue: null,
  width: '100%',
  rules: { fake: true },
  example: '',
}
TextInput.propTypes = {
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

export default TextInput
