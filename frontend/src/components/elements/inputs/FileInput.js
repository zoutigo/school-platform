import React from 'react'
import { useController, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'

function FileInput({
  control,
  label,
  defaultValue,
  example,
  variant,
  accept,
  multiple,
  ...rest
}) {
  const {
    fieldState: { invalid, error },
  } = useController({
    name: multiple ? 'files' : 'file',
    control,
    defaultValue: defaultValue,
    rules: {
      validate: {
        minlenght: (value) =>
          (value && value.length > 0) || '1 fichier au moins est requis',
        maxlenght: (value) =>
          (value && value.length < 16) ||
          'Vous ne pouvez telecharger que 15 fichiers maximum en meme temps',
        filesize: (value) =>
          (value && value[0].size <= 1024 * 1024 * 10) ||
          'Chacune des images doit faire moins de 10Mo',
      },
    },
  })

  return (
    <Controller
      name={multiple ? 'files' : 'file'}
      control={control}
      render={({ field }) => (
        <TextField
          {...rest}
          variant={variant}
          fullWidth
          type="file"
          id="input-files"
          label={label}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            multiple,
            accept,
          }}
          onChange={(e) => {
            field.onChange(e.target.files)
          }}
          error={invalid}
          helperText={invalid ? error.message : example}
        />
      )}
    />
  )
}

FileInput.defaultProps = {
  defaultValue: [{ label: '', value: '' }],
  variant: 'standard',
  multiple: false,
}

FileInput.propTypes = {
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  label: PropTypes.string.isRequired,
  example: PropTypes.string.isRequired,
  accept: PropTypes.string.isRequired,
  variant: PropTypes.string,
  multiple: PropTypes.bool,
}

export default FileInput
