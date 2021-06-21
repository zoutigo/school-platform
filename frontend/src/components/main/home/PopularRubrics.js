import React from 'react'
import PropTypes from 'prop-types'

import { Box, Grid, Icon, Typography } from '@material-ui/core'
import { styled, useTheme } from '@material-ui/styles'

import LocalMallIcon from '@material-ui/icons/LocalMall'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import RestaurantIcon from '@material-ui/icons/Restaurant'
import HelpIcon from '@material-ui/icons/Help'
import randomkey from '../../../utils/randomkey'
import {
  StyledBaseButton,
  StyledHomeGrid,
  StyledIconBox,
  StyledNavLink,
} from '../../elements/styled'

const StyledTextBox = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'justify',
  minHeight: '10vh',
  [theme.breakpoints.up('md')]: {
    minHeight: '17vh ',
  },
}))

const StyledPopularItemCard = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  padding: '0 2rem ',
  [theme.breakpoints.down('md')]: {
    borderTop: `solid 1px ${theme.palette.secondary.main}`,
    paddingBottom: '2rem ',
    paddingTop: '2rem',
  },
}))

const StyledPopularButton = styled(StyledBaseButton)(({ theme }) => ({
  color: theme.palette.secondary.main,
  width: '100% !important',
  '& *': {
    marginLeft: '2rem',
  },
  '& >svg': {
    fontSize: '3em',
  },
}))

function PopularRubrics() {
  const Populars = [
    [
      'Classes',
      '/classes',
      'Accédez aux différentes classes et informations les concernant, de la Petite Section au CM2',
      <LocalMallIcon />,
      'fa fa-thermometer-full',
    ],
    [
      'Ecole',
      '/ecole',
      'Venez vite découvrir l’histoire, les valeurs de notre établissement et les avis des parents',
      <AccountBalanceIcon />,
      'fa fa-cubes',
    ],
    [
      'Cantine',
      '/viescolaire/cantine',
      'Toutes les informations concernant la cantine, les menus et nos prestataires restauration',
      <RestaurantIcon />,
      'fa fa-beer',
    ],
    [
      'Contacts',
      '/informations/contacts',
      'Retrouvez ici toutes nos coordonnées,le plan pour y acceder, ainsi que le formulaire de contact',
      <HelpIcon />,
      'fa fa-map-signs',
    ],
  ]

  const PopularItem = ({ item }) => {
    const [title, link, text, icon, faicon] = item
    const theme = useTheme()

    return (
      <StyledPopularItemCard item xs={12} md={6} lg={3}>
        <StyledIconBox bgcolor={theme.palette.primary.main} fontsize="7rem">
          {icon}
        </StyledIconBox>
        <Typography variant="h2">{title}</Typography>
        <StyledTextBox>
          <Typography variant="body1">{text}</Typography>
        </StyledTextBox>
        <StyledNavLink to={link}>
          <StyledPopularButton variant="outlined" type="button">
            <Icon className={faicon} aria-hidden="true" />
            <Typography variant="button" component="span">
              Allons Y
            </Typography>
          </StyledPopularButton>
        </StyledNavLink>
      </StyledPopularItemCard>
    )
  }

  PopularItem.propTypes = {
    item: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    ).isRequired,
  }

  return (
    <StyledHomeGrid container>
      {Populars.map((Popular) => (
        <PopularItem item={Popular} key={randomkey(987654321)} />
      ))}
    </StyledHomeGrid>
  )
}

export default PopularRubrics
