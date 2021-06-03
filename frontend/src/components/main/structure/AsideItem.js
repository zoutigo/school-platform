import React from 'react'
import { Grid, styled } from '@material-ui/core'
import PropTypes from 'prop-types'

export const StyledAsideItem = styled(Grid)(({ rubriccolors }) => ({
  textAlign: 'center',
  background: rubriccolors.ligth,
  marginTop: '0.5rem',
  minHeight: '5rem',
}))

const StyledAsideItemAction = styled(Grid)(({ rubriccolors }) => ({
  boxSizing: 'border-box',
  background: rubriccolors.ligth,
  paddingTop: '2rem',
  paddingBottom: '2rem',
}))

function AsideItem({ item, rubriccolors }) {
  const { subtitle, text, icon } = item

  if (icon) {
    return (
      <StyledAsideItemAction container rubriccolors={rubriccolors}>
        {icon}
        <div>
          {subtitle}
          {text}
        </div>
      </StyledAsideItemAction>
    )
  }

  return (
    <StyledAsideItem rubriccolors={rubriccolors} container>
      <Grid item container>
        {subtitle}
      </Grid>
      <Grid item container>
        {text}
      </Grid>
    </StyledAsideItem>
  )
}

AsideItem.propTypes = {
  item: PropTypes.shape({
    subtitle: PropTypes.element,
    text: PropTypes.element,
    icon: PropTypes.string,
  }).isRequired,
  rubriccolors: PropTypes.shape({
    main: PropTypes.string,
    dark: PropTypes.string,
    ligth: PropTypes.string,
  }).isRequired,
}

export default AsideItem
