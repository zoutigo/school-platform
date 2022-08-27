import React from 'react'
import { useController, Controller } from 'react-hook-form'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { InputAdornment, TextField } from '@material-ui/core'
import customStyles from '../../../constants/selectMultiCostumStyles'

function SelectSingleInput({
  control,
  label,
  name,
  defaultValue,
  options,
  example,
  variant,
  rules,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error, isDirty },
  } = useController({
    name,
    control,
    defaultValue,
    rules: { ...rules },
  })

  const { ref, ...inputProps } = field

  return (
    <Controller
      control={control}
      {...rest}
      render={() => (
        <TextField
          {...field}
          id="select-single-input"
          name={name}
          placeholder="homme ou femme ?"
          variant={variant}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{label}</InputAdornment>
            ),
            inputComponent: () => (
              <Select
                {...field}
                inputRef={field.ref}
                options={options}
                styles={customStyles}
                defaultOptions
                maxMenuHeight={200}
                menuPortalTarget={document.body}
              />
            ),
          }}
          onChange={(event) => field.onChange(event.target.value)}
          //   error={isDirty}
          helperText={error ? error.message : example}
        />
      )}
    />
  )
}

SelectSingleInput.defaultProps = {
  defaultValue: [{ label: '', value: '' }],
  variant: 'standard',
  rules: { required: false },
}

SelectSingleInput.propTypes = {
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  defaultValue: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  label: PropTypes.string.isRequired,
  example: PropTypes.string.isRequired,
  variant: PropTypes.string,
  rules: PropTypes.shape({
    fake: PropTypes.bool,
  }),
}

export default SelectSingleInput
