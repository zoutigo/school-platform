/* eslint-disable import/named */
import { styled, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { openSmallScreenNav } from '../../redux/settings/SettingsActions'

import RubricScreen from './RubricScreen'
import { useRoutesInfos } from '../../utils/hooks'

const StyledSmallScreenDiv = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 100,
  left: 0,
  zIndex: 5,
  background: 'whitesmoke',
  padding: '1rem 2rem 1rem 1rem',

  [theme.breakpoints.between('md', 'lg')]: {
    width: '25%',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: '50%',
  },
  [theme.breakpoints.between('xs', 'sm')]: {
    width: '75%',
  },
  [theme.breakpoints.down('xs')]: {
    width: '94%',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}))

function SmallScreenNav() {
  const rubrics = useCallback(useRoutesInfos().rubricsList, [])

  return (
    <StyledSmallScreenDiv>
      {rubrics.map((rubric) => (
        <RubricScreen key={rubric.path} rubric={rubric} />
      ))}
    </StyledSmallScreenDiv>
  )
}

export default React.memo(SmallScreenNav)
