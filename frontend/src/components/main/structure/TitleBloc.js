import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { StyledNavLink, StyledTitle } from '../../elements/styled'
import Title from '../../elements/Title'
import asideApel from '../../../constants/asideapel'
import asideOgec from '../../../constants/ogecAside'

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

function TitleBloc({ rubriccolors, setAside }) {
  const { palette } = useTheme()
  const { pathname } = useLocation()
  const { Routes } = useSelector((state) => state.settings)
  const [categoryDatas, setCategoryDatas] = useState(null)
  const [chapters, setChapters] = useState(null)
  const [currentRoute, setCurrentRoute] = useState(null)

  useEffect(() => {
    const asides = [
      ['/apelogec/apel', asideApel],
      ['/apelogec/ogec', asideOgec],
    ]
    const categoryAside = asides.find(([path, aside]) =>
      pathname.includes(path)
    )
    if (categoryAside) setAside(categoryAside[1])

    return () => {
      setAside(null)
    }
  }, [pathname])

  useEffect(() => {
    setCurrentRoute(Routes.find((route) => pathname === route.path))
  }, [pathname])

  useEffect(() => {
    if (currentRoute && currentRoute.type === 'category') {
      setCategoryDatas(currentRoute)
      setChapters(
        Routes.filter(
          (route) =>
            route.type === 'chapter' && route.path.includes(currentRoute.path)
        )
      )
    } else if (currentRoute && currentRoute.type === 'rubric') {
      setCategoryDatas(null)
    } else {
      const categoryAlias = pathname.split('/')[2]
      const categoryInfos = Routes.find(
        (route) => route.alias === categoryAlias && route.type === 'category'
      )
      if (categoryInfos) {
        setCategoryDatas(categoryInfos)
        setChapters(
          Routes.filter(
            (route) =>
              route.type === 'chapter' &&
              route.path.includes(categoryInfos.path)
          )
        )
      }
    }

    return () => {
      setChapters(null)
      setCategoryDatas(null)
    }
  }, [currentRoute])

  const TitleTab = ({
    rubriccolors: tabcolors,
    tabtitle,

    tabpath,
  }) => (
    <StyledMainTitle
      bgcolor={pathname === tabpath ? tabcolors.main : tabcolors.ligth}
      bordercolor={tabcolors.dark}
    >
      <StyledNavLink to={pathname === tabpath ? '#' : tabpath}>
        <Title title={tabtitle} textcolor={palette.secondary.main} />
      </StyledNavLink>
    </StyledMainTitle>
  )

  TitleTab.defaultProps = {
    tabpath: '/',
  }
  TitleTab.propTypes = {
    tabtitle: PropTypes.string.isRequired,

    tabpath: PropTypes.string,
  }

  return (
    <StyledTitleBloc container>
      <StyledLargeScreenTitleBloc item container>
        {currentRoute && currentRoute.type === 'rubric' && (
          <TitleTab
            rubriccolors={rubriccolors}
            tabtitle={currentRoute.name}
            tabpath={currentRoute.path}
          />
        )}
        {currentRoute && currentRoute !== 'rubric' && categoryDatas && (
          <TitleTab
            rubriccolors={rubriccolors}
            tabtitle={categoryDatas.name}
            tabpath={categoryDatas.path}
          />
        )}

        {chapters &&
          chapters.length > 0 &&
          chapters.map((chapter) => (
            <TitleTab
              rubriccolors={rubriccolors}
              tabtitle={chapter.name}
              tabpath={chapter.path}
              key={chapter.path}
            />
          ))}
      </StyledLargeScreenTitleBloc>
      <StyledSmallScreenTitleBloc container>
        <TitleTab
          rubriccolors={rubriccolors}
          tabtitle={currentRoute ? currentRoute.name : ''}
        />
      </StyledSmallScreenTitleBloc>
      <Grid item container>
        <StyledLine bgcolor={rubriccolors.dark} />
      </Grid>
    </StyledTitleBloc>
  )
}

TitleBloc.propTypes = {
  rubriccolors: PropTypes.shape({
    main: PropTypes.string,
    dark: PropTypes.string,
    ligth: PropTypes.string,
  }).isRequired,
  setAside: PropTypes.func.isRequired,
}

export default TitleBloc
