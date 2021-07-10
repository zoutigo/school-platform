import { Collapse, Grid, styled, Typography } from '@material-ui/core'
import { withTheme } from '@material-ui/styles'
import React from 'react'

export const StyledPersoDataContainer = styled(Grid)(({ theme }) => ({
  fontSize: '1rem',
  padding: '1rem',
  border: 'solid 1px gray',
  borderRadius: '5px',
  margin: '0.5rem 0px',
}))
export const StyledPersoDataFieldGrid = styled(Grid)(() => ({
  marginTop: '0.5rem',
  marginBottom: '0.5rem',
}))

export const StyledPersoDataEntryTypo = styled(Typography)(() => ({
  textTransform: 'uppercase',
}))

export const StyledPersoDataValueTypo = withTheme(
  styled(({ field, ...rest }) => <Typography {...rest} />)({
    textTransform: ({ field }) =>
      field === 'email' ? 'lowercase' : 'capitalize',
  })
)

export const StyledPersoDataForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))

export const StyledPersoDataCollapse = styled(Collapse)(() => ({
  width: '100%',
}))
