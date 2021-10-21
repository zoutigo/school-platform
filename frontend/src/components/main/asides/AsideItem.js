import React from 'react'
import { Grid, styled } from '@material-ui/core'
import PropTypes from 'prop-types'
import AsideSubTitle from './AsideSubTitle'
import AsideUser from './AsideUser'
import AsideItemText from './AsideItemText'
import useRoutesInfos from '../../hooks/useRoutesInfos'

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

function AsideItem({ item }) {
  const { subtitle, text, icon, user } = item
  const { rubricColors } = useRoutesInfos()

  if (icon) {
    return (
      <StyledAsideItemAction container rubriccolors={rubricColors}>
        {icon}
        <div>
          {subtitle}
          {text}
        </div>
      </StyledAsideItemAction>
    )
  }

  return (
    <StyledAsideItem rubriccolors={rubricColors} container>
      <Grid item container>
        <AsideSubTitle subtitle={subtitle} />
      </Grid>
      <Grid item container>
        {user && (
          <AsideUser
            gender={user.gender}
            firstname={user.firstname}
            lastname={user.lastname}
          />
        )}
        {text && <AsideItemText text={text} />}
      </Grid>
    </StyledAsideItem>
  )
}

AsideItem.propTypes = {
  item: PropTypes.shape({
    subtitle: PropTypes.string,
    text: PropTypes.string,
    icon: PropTypes.string,
    user: PropTypes.shape({
      gender: PropTypes.string,
      lastname: PropTypes.string,
      firstname: PropTypes.string,
    }),
  }).isRequired,
}

export default AsideItem
