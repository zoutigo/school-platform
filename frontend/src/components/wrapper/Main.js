import { Grid, styled, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Title from '../elements/Title'
import { StyledMainWrapper, StyledTitle } from '../elements/styled'

const StyledLine = styled('div')(({ bgcolor }) => ({
  minWidth: '900px',
  height: '0.05rem',
  background: bgcolor,
}))

const StyledMainTitle = styled(StyledTitle)(() => ({
  textAlign: 'center',
}))

function Main({ main }) {
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
    <StyledMainWrapper container item xs={12}>
      <Grid container>
        <StyledMainTitle bgcolor={rubriccolors.main}>
          <Title title={rubricdatas.name} textcolor={palette.secondary.main} />
          <StyledLine bgcolor={rubriccolors.dark} />
        </StyledMainTitle>
      </Grid>
      <Grid container>{main}</Grid>
    </StyledMainWrapper>
  )
}

Main.propTypes = {
  main: PropTypes.element.isRequired,
}

export default Main
