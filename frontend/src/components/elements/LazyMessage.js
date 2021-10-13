import React from 'react'
import { Grid, styled, useTheme, Typography } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import InfoIcon from '@material-ui/icons/Info'
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import ErrorIcon from '@material-ui/icons/Error'
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

const StyledHeaderGrid = styled(Grid)(({ colors }) => ({
  color: colors.main,
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
          icon: <ReportProblemIcon />,
        }
      case 'info':
        return {
          title: 'Information',
          colors: theme.palette.info,
          icon: <InfoIcon />,
        }
      case 'error':
        return {
          title: 'Erreur',
          colors: theme.palette.error,
          icon: <ErrorIcon />,
        }
      case 'success':
        return {
          title: 'Bravo',
          colors: theme.palette.success,
          icon: <CheckCircleIcon />,
        }

      default:
        return {
          title: 'Erreur',
          colors: theme.palette.error,
          icon: <ErrorIcon />,
        }
    }
  }

  const { colors, title, icon } = datas()

  return (
    <StyledGrid item container colors={colors} justifyContent="center">
      <StyledHeaderGrid container alignItems="center" colors={colors}>
        <Grid item xs={1}>
          {icon}
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
      </StyledHeaderGrid>
      {children}
    </StyledGrid>
  )
}

LazyMessage.propTypes = {
  children: PropTypes.element.isRequired,
  severity: PropTypes.string.isRequired,
}

export default LazyMessage
