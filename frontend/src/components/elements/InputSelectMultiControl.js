import React from 'react'
import { Grid, styled, Collapse, Typography } from '@material-ui/core'
import { useController, Controller } from 'react-hook-form'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { Alert } from '@material-ui/lab'
import customStyles from '../../constants/selectMultiCostumStyles'

const StyledAlert = styled(Alert)(({ theme }) => ({
  minWidth: '100%',
  color: theme.palette.error.main,
}))

function InputSelectMultiControl({
  control,
  label,
  name,
  width,
  initialValue,
  options,
  ...rest
}) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  })

  return (
    <Grid item container className="field">
      <Grid item container className="label" style={{ margin: '1rem' }}>
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item container>
        <Controller
          control={control}
          {...rest}
          render={({ field: { ref } }) => (
            <Select
              {...field}
              inputRef={ref}
              options={options}
              isMulti
              styles={customStyles}
              defaultValue={initialValue}
              defaultOptions
              maxMenuHeight={200}
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

InputSelectMultiControl.defaultProps = {
  initialValue: [{ label: '', value: '' }],
  width: '100%',
}

InputSelectMultiControl.propTypes = {
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

export default InputSelectMultiControl
