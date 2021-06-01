import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, styled, useTheme } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StyledCentralScreen, StyledTitle } from '../elements/styled'

import Title from '../elements/Title'
import AsideTitle from './AsideTitle'
import AsideItem from './AsideItem'
import randomkey from '../../utils/randomkey'

const StyledLine = styled('div')(({ bgcolor }) => ({
  minWidth: '900px',
  height: '0.05rem',
  background: bgcolor,
}))

const StyledMainTitle = styled(StyledTitle)(() => ({
  textAlign: 'center',
}))

const StyledWrapperGrid = styled(Grid)(({ theme }) => ({
  paddingTop: '6rem',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '3rem',
  },
}))
const StyledAsideGrid = styled(Grid)(() => ({
  paddingLeft: '4%',
}))
const StyledAsideBodyGrid = styled(Grid)(() => ({
  width: '100%',
  background: 'whitesmoke',
}))

function Wrapper({ main, aside = null }) {
  const { pathname } = useLocation()
  const [rubriccolors, setRubriccolors] = useState({
    main: 'white',
    light: 'white',
    dark: 'white',
  })
  const [rubricdatas, setRubricdatas] = useState({
    name: '',
    alias: '',
    path: '/',
  })
  // define the color
  const { ActiveRubric: rubric, Routes } = useSelector(
    (state) => state.settings
  )

  const { palette } = useTheme()
  const entries = Object.entries(palette)

  useEffect(() => {
    const routesDatas = Routes.filter((route) => route.path === pathname)
    if (rubric.rubname !== 'home') {
      setRubriccolors(
        // eslint-disable-next-line no-unused-vars
        entries.filter(([key, value]) => key === rubric.rubalias)[0][1]
      )
      setRubricdatas(routesDatas[0])
    }
  }, [rubric])

  return (
    <StyledCentralScreen>
      <StyledWrapperGrid container>
        <Grid container item xs={12} md={aside ? 9 : 12}>
          <Grid container>
            <StyledMainTitle bgcolor={rubriccolors.main}>
              <Title
                title={rubricdatas.name}
                textcolor={palette.secondary.main}
              />
              <StyledLine bgcolor={rubriccolors.dark} />
            </StyledMainTitle>
          </Grid>
          <Grid container>{main}</Grid>
        </Grid>
        {aside && (
          <StyledAsideGrid item xs={false} md={aside ? 3 : false}>
            <AsideTitle rubriccolors={rubriccolors} title={aside.title} />
            <StyledAsideBodyGrid>
              {aside &&
                aside.items.map((asideitem) => (
                  <AsideItem
                    key={randomkey(987654)}
                    rubriccolors={rubriccolors}
                    item={asideitem}
                  />
                ))}
            </StyledAsideBodyGrid>
          </StyledAsideGrid>
        )}
      </StyledWrapperGrid>
    </StyledCentralScreen>
  )
}
Wrapper.defaultProps = {
  aside: {
    title: 'essai',
    items: [
      {
        subtitle: 'essai',
        text: 'essai',
      },
    ],
  },
}
Wrapper.propTypes = {
  main: PropTypes.element.isRequired,
  aside: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        subtitle: PropTypes.string,
        text: PropTypes.string,
      })
    ),
  }),
}

export default Wrapper
