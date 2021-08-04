/* eslint-disable import/named */
import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { StyledNavLink, StyledTitle } from '../../elements/styled'
import Title from '../../elements/Title'

import { useRoutesInfos } from '../../../utils/hooks'

const StyledTitleBloc = styled(Grid)(() => ({
  background: 'whitesmoke',
  height: '3.1rem',
  overflow: 'hidden',
}))
const StyledLine = styled('div')(({ bgcolor }) => ({
  minWidth: '100%',
  height: '0.05rem',
  background: bgcolor,
}))

const StyledMainTitle = styled(StyledTitle)(({ bordercolor }) => ({
  // minWidth: '5rem !important',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '0px',
  marginBottom: '0px',
  '&:hover': {
    borderBottom: `solid 1px ${bordercolor} `,
  },
}))

const StyledSmallScreenTitleBloc = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}))

const StyledLargeScreenTitleBloc = styled(Grid)(({ theme }) => ({
  '& >div': {
    marginRight: '0.2rem',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

function TitleBloc(props) {
  const { rubriccolors } = props

  const { palette } = useTheme()
  const { pathname, state: locationState } = useLocation()

  const { category, current } = useRoutesInfos()

  const state = useCallback(locationState || current.state, [current])

  const TitleTab = ({ rubriccolors: tabcolors, tabpath, state: tabstate }) => (
    <StyledMainTitle
      bgcolor={pathname === tabpath ? tabcolors.main : tabcolors.ligth}
      bordercolor={tabcolors.dark}
    >
      <StyledNavLink
        to={{
          pathname: pathname === tabpath ? '#' : tabpath,
          state: tabstate,
        }}
      >
        <Title title={tabstate.name} textcolor={palette.secondary.main} />
      </StyledNavLink>
    </StyledMainTitle>
  )

  TitleTab.defaultProps = {
    tabpath: '/',
    state: null,
  }
  TitleTab.propTypes = {
    tabpath: PropTypes.string,
    state: PropTypes.shape({
      name: PropTypes.string,
    }),
  }

  return (
    <StyledTitleBloc container>
      <StyledLargeScreenTitleBloc item container>
        {state.type === 'rubric' && (
          <TitleTab
            rubriccolors={rubriccolors}
            state={state}
            tabpath={state.path}
          />
        )}
        {state.type !== 'rubric' && category.current && (
          <TitleTab
            rubriccolors={rubriccolors}
            tabpath={category.current.path}
            state={category.current.state}
          />
        )}

        {category &&
          category.chapters.length > 0 &&
          category.chapters.map((chapter) => (
            <TitleTab
              rubriccolors={rubriccolors}
              tabpath={chapter.path}
              state={chapter.state}
              key={chapter.path}
            />
          ))}
      </StyledLargeScreenTitleBloc>
      <StyledSmallScreenTitleBloc container>
        <TitleTab rubriccolors={rubriccolors} state={state} />
      </StyledSmallScreenTitleBloc>
      <Grid item container>
        <StyledLine bgcolor={rubriccolors.dark} />
      </Grid>
    </StyledTitleBloc>
  )
}

TitleBloc.defaultProps = {
  state: null,
}

TitleBloc.propTypes = {
  rubriccolors: PropTypes.shape({
    main: PropTypes.string,
    dark: PropTypes.string,
    ligth: PropTypes.string,
  }).isRequired,
  state: PropTypes.shape({
    type: PropTypes.string,
  }),
}

export default React.memo(TitleBloc)
