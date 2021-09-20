import React from 'react'
import PropTypes from 'prop-types'
import {
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  styled,
  FormControlLabel,
} from '@material-ui/core'
import { Controller, useController } from 'react-hook-form'

const StyledGrid = styled(Grid)(({ display }) => ({
  margin: '1rem 0px',
  padding: '0px 1rem',
  display: display,
}))
function InputRadio({
  radioGroupProps,
  question,
  options,
  callback,
  control,
  defaultValue,
  name,
  display,
}) {
  // const [value, setValue] = React.useState(defaultValue)

  const {
    field,
    fieldState: { invalid, error: formerror },
  } = useController({
    name,
    control,
    defaultValue: defaultValue,
  })

  return (
    <StyledGrid item container alignItems="center" display={display}>
      <Grid item xs={6}>
        <FormLabel component="legend">{question}</FormLabel>
      </Grid>
      <Grid item container xs={6}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <RadioGroup
              aria-label={name}
              value={value}
              {...radioGroupProps}
              onChange={(event) => {
                onChange(event.target.value)
                if (callback) {
                  const state = event.target.value === 'oui'
                  callback(state)
                }
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
          )}
        />
      </Grid>
      <Grid item container>
        {formerror}
      </Grid>
    </StyledGrid>
  )
}

InputRadio.defaultProps = {
  display: 'block',
  callback: null,
}

InputRadio.propTypes = {
  display: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      labelOption: PropTypes.string,
      optionvalue: PropTypes.string,
    })
  ).isRequired,
  callback: PropTypes.func,
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  radioGroupProps: PropTypes.shape({
    raw: PropTypes.bool,
  }).isRequired,
}

export default React.memo(InputRadio)
