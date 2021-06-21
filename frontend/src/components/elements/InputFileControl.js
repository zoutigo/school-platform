import { Grid, styled, Collapse } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { Alert } from '@material-ui/lab'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
  padding: '0px 1rem',
}))
const StyledAlert = styled(Alert)(({ theme }) => ({
  minWidth: '100%',
  color: theme.palette.error.main,
}))

function InputFileControl({ control, name, initialValue, ...rest }) {
  const [value, setValue] = React.useState('')

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: initialValue,
  })

  const { ref, ...inputProps } = field
  return (
    <StyledGrid>
      <Grid item container>
        <input
          {...inputProps}
          inputRef={ref}
          {...rest}
          value={value}
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
    </StyledGrid>
  )
}
InputFileControl.defaultProps = {
  initialValue: null,
}
InputFileControl.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  initialValue: PropTypes.string,
}
export default InputFileControl
