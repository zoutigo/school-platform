import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { DatePicker } from '@material-ui/pickers'
import { Grid, Collapse } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { StyledAlert } from './styled'

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

function DatePickerControl({ control, name, initialDate, ...rest }) {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: initialDate,
  })

  return (
    <StyledGrid item container>
      <DatePicker
        {...inputProps}
        inputRef={ref}
        autoOk
        clearable
        minDate={new Date()}
        {...rest}
        style={{ width: '100%' }}
      />
      <Collapse in={invalid}>
        <Grid item container>
          <StyledAlert severity="error">{error && error.message}</StyledAlert>
        </Grid>
      </Collapse>
    </StyledGrid>
  )
}

DatePickerControl.defaultProps = {
  initialDate: new Date(),
}

DatePickerControl.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  control: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
}

export default DatePickerControl
