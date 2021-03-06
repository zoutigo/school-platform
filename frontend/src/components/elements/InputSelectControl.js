import React, { useState } from 'react'
import { Grid, styled, Collapse } from '@material-ui/core'
import { useController, Controller } from 'react-hook-form'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'

const StyledAlert = styled(Alert)(({ theme }) => ({
  minWidth: '100%',
  color: theme.palette.error.main,
}))

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 400,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
}

function InputSelectControl({
  control,
  label,
  name,
  width,
  initialValue,
  options,
  ...rest
}) {
  const [value, setValue] = useState(initialValue)
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: initialValue,
  })

  return (
    <Grid item container className="field">
      <Grid item container className="label">
        {label}
      </Grid>
      <Grid item container>
        <Controller
          // value={value}
          control={control}
          {...rest}
          render={({ field: { ref } }) => (
            <Select
              {...field}
              inputRef={ref}
              options={options}
              styles={customStyles}
              defaultValue={initialValue}
              // onChange={(e) => setValue(e.value)}
            />
          )}
        />
      </Grid>
      <Collapse in={invalid}>
        <Grid item container>
          <StyledAlert severity="error">{error && error.message}</StyledAlert>
        </Grid>
      </Collapse>
    </Grid>
  )
}

InputSelectControl.defaultProps = {
  initialValue: [{ label: '', value: '' }],
  width: '100%',
}

InputSelectControl.propTypes = {
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
  initialValue: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  width: PropTypes.string,
  label: PropTypes.string.isRequired,
}

export default InputSelectControl
