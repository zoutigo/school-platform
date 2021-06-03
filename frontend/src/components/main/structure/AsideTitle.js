import React from 'react'
import { Grid, styled, useTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import { StyledTitle } from '../../elements/styled'
import Title from '../../elements/Title'

const StyledAsideGrid = styled(Grid)(() => ({
  height: '3rem',
}))
const StyledAsideTitle = styled(StyledTitle)(({ bgcolor }) => ({
  marginTop: '0px',
  textAlign: 'center',
  width: '100%',
  background: `linear-gradient(to bottom , ${bgcolor.main}, ${bgcolor.ligth})`,
}))

function AsideTitle({ rubriccolors, title }) {
  const theme = useTheme()
  return (
    <StyledAsideGrid data-testid="wrapper-aside-title">
      <StyledAsideTitle bgcolor={rubriccolors}>
        <Title title={title || ''} textcolor={theme.palette.secondary.main} />
      </StyledAsideTitle>
    </StyledAsideGrid>
  )
}

AsideTitle.defaultProps = null

AsideTitle.propTypes = {
  rubriccolors: PropTypes.shape({
    ligth: PropTypes.string,
    main: PropTypes.string,
    dark: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
}

export default AsideTitle
