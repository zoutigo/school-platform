import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const StyledGrid = styled(Grid)(({ colors }) => ({
  margin: '1rem',
  padding: '1rem',
  borderRadius: '5px',
  border: `solid 1px ${colors.light}`,
  '& div': {
    '& p': {
      margin: '1rem ',
    },
  },
}))

function LazyMessage(props) {
  const { severity, children } = props
  const theme = useTheme()
  const datas = () => {
    switch (severity) {
      case 'warning':
        return {
          title: 'Attention',
          colors: theme.palette.warning,
        }
      case 'info':
        return {
          title: 'Information',
          colors: theme.palette.info,
        }
      case 'error':
        return {
          title: 'Erreur',
          colors: theme.palette.error,
        }
      case 'success':
        return {
          title: 'Bravo',
          colors: theme.palette.success,
        }

      default:
        return null
    }
  }

  const { colors, title } = datas()

  return (
    <StyledGrid item container colors={colors} justify="center">
      {children}
    </StyledGrid>
  )
}

LazyMessage.propTypes = {
  children: PropTypes.element.isRequired,
  severity: PropTypes.string.isRequired,
}

export default LazyMessage
