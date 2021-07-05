import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
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

function InputSelectControl({
  control,
  name,
  width,
  initialValue,
  options,
  ...rest
}) {
  const theme = useTheme()
  const [value, setValue] = React.useState(null)

  const {
    field,
    fieldState: { invalid, error, isTouched },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: initialValue,
  })

  const { ref, ...inputProps } = field

  return (
    <StyledGrid
      item
      container
      width={width}
      bgcolor={invalid && isTouched ? theme.palette.error.light : 'whitesmoke'}
      className="field"
    >
      <Grid item container>
        <TextField
          select
          value={value}
          defaultValue={initialValue ? initialValue[1] : null}
          {...inputProps}
          inputRef={ref}
          {...rest}
          onChange={(e) => {
            setValue(e.target.value)
            field.onChange(e.target.value)
          }}
        >
          {initialValue && (
            <option value={initialValue[1]} selected>
              {initialValue[0]}
            </option>
          )}
          {options.map((option) => {
            const [label, optionvalue] = option

            return (
              <MenuItem key={optionvalue} value={optionvalue}>
                {label}
              </MenuItem>
            )
          })}
        </TextField>
      </Grid>
      <Collapse in={invalid}>
        <Grid item container>
          <StyledAlert severity="error">{error && error.message}</StyledAlert>
        </Grid>
      </Collapse>
    </StyledGrid>
  )
}

InputSelectControl.defaultProps = {
  initialValue: null,
  width: '100%',
}
InputSelectControl.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  initialValue: PropTypes.string,
  width: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default InputSelectControl
