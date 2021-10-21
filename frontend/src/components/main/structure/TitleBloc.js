/* eslint-disable import/named */
import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { StyledNavLink, StyledTitle } from '../../elements/styled'
import Title from '../../elements/Title'

import theme from '../../../constants/theme'
import useRoutesInfos from '../../hooks/useRoutesInfos'

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

const StyledSmallScreenTitleBloc = styled(Grid)(({ theme: thema }) => ({
  [thema.breakpoints.up('md')]: {
    display: 'none',
  },
}))

const StyledLargeScreenTitleBloc = styled(Grid)(({ theme: themeb }) => ({
  '& >div': {
    marginRight: '0.2rem',
  },
  [themeb.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

const fakeState = {
  name: 'Fake',
  alias: 'fake',
  access: 'public',
  type: 'chapter',
  filepath: null,
  description: null,
  icon: null,
}

function TitleBloc() {
  const { rubricColors: rubriccolors, category, current } = useRoutesInfos()

  const { palette } = useTheme()
  const { pathname, state: locationState } = useLocation()

  const state = locationState || current?.state || fakeState

  const TitleTab = ({ tabcolors, tabpath, state: tabstate }) => (
    <StyledMainTitle
      bgcolor={
        tabcolors && pathname === tabpath ? tabcolors.main : tabcolors.ligth
      }
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
    tabcolors: palette.third,
  }
  TitleTab.propTypes = {
    tabcolors: PropTypes.shape({
      main: PropTypes.string,
      dark: PropTypes.string,
      ligth: PropTypes.string,
    }),
    tabpath: PropTypes.string,
    state: PropTypes.shape({
      name: PropTypes.string,
    }),
  }

  return (
    <StyledTitleBloc container>
      <StyledLargeScreenTitleBloc item container>
        {state.type === 'rubric' && rubriccolors && (
          <TitleTab
            tabcolors={rubriccolors}
            state={state}
            tabpath={state.path}
          />
        )}
        {state.type !== 'rubric' && category.current && rubriccolors && (
          <TitleTab
            tabcolors={rubriccolors}
            tabpath={category.current.path}
            state={category.current.state}
          />
        )}

        {category &&
          category.chapters.length > 0 &&
          rubriccolors &&
          category.chapters.map((chapter) => (
            <TitleTab
              tabcolors={rubriccolors}
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
        <StyledLine
          bgcolor={rubriccolors ? rubriccolors.dark : palette.third.dark}
        />
      </Grid>
    </StyledTitleBloc>
  )
}

TitleBloc.defaultProps = {
  state: null,
}

TitleBloc.propTypes = {
  state: PropTypes.shape({
    type: PropTypes.string,
  }),
}

export default React.memo(TitleBloc)
