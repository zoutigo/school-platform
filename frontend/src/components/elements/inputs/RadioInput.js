import React from 'react'
import PropTypes from 'prop-types'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import { Controller, useController } from 'react-hook-form'

function RadioInput({
  radioGroupProps,
  question,
  options,
  control,
  defaultValue,
  name,
  variant,
  rules,
}) {
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
    rules,
  })

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          id="radio-input"
          data-testid="radio-input"
          placeholder="chosir une option"
          fullWidth
          variant={variant}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">{question}</InputAdornment>
            ),
            inputComponent: () => (
              <RadioGroup
                aria-label={name}
                value={field.value}
                {...radioGroupProps}
                onChange={(event) => {
                  field.onChange(event.target.value)
                }}
              >
                {options.map(({ labelOption, optionvalue }) => (
                  <FormControlLabel
                    key={labelOption}
                    value={optionvalue}
                    control={<Radio />}
                    label={labelOption}
                    labelPlacement="start"
                  />
                ))}
              </RadioGroup>
            ),
          }}
          error={Boolean(error)}
          helperText={error ? error.message : ''}
        />
      )}
    />
  )
}

RadioInput.defaultProps = {
  variant: 'outlined',
}

RadioInput.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      labelOption: PropTypes.string,
      optionvalue: PropTypes.string,
    })
  ).isRequired,
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  radioGroupProps: PropTypes.shape({
    raw: PropTypes.bool,
  }).isRequired,
  variant: PropTypes.string,
  rules: PropTypes.shape({
    fake: PropTypes.bool,
  }).isRequired,
}

export default React.memo(RadioInput)
