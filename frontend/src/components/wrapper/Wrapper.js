import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, styled, useTheme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { StyledCentralScreen } from '../elements/styled'

import AsideTitle from './AsideTitle'
import AsideItem from './AsideItem'
import randomkey from '../../utils/randomkey'
import TitleBloc from './TitleBloc'

const StyledWrapperGrid = styled(Grid)(({ theme }) => ({
  paddingTop: '6rem',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '3rem',
  },
}))
const StyledAsideGrid = styled(Grid)(({ theme }) => ({
  paddingLeft: '4%',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '0px',
  },
}))

const StyledAsideBodyGrid = styled(Grid)(() => ({
  background: 'whitesmoke',
}))

function Wrapper({ main, aside = null }) {
  const [rubriccolors, setRubriccolors] = useState({
    main: 'white',
    light: 'white',
    dark: 'white',
  })

  // define the color
  const { ActiveRubric: rubric } = useSelector((state) => state.settings)

  const { palette } = useTheme()
  const entries = Object.entries(palette)

  useEffect(() => {
    if (rubric.rubname !== 'home') {
      setRubriccolors(
        // eslint-disable-next-line no-unused-vars
        entries.filter(([key, value]) => key === rubric.rubalias)[0][1]
      )
    }
  }, [])

  return (
    <StyledCentralScreen>
      <StyledWrapperGrid container>
        <Grid container item xs={12} md={aside ? 9 : 12}>
          <TitleBloc rubriccolors={rubriccolors} />
          <Grid container>{main}</Grid>
        </Grid>
        {aside && (
          <StyledAsideGrid item xs={false} md={aside ? 3 : false}>
            <AsideTitle rubriccolors={rubriccolors} title={aside.title} />
            <StyledAsideBodyGrid container>
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
  aside: null,
}
Wrapper.propTypes = {
  main: PropTypes.element.isRequired,
  aside: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        subtitle: PropTypes.element,
        text: PropTypes.element,
      })
    ),
  }),
}

export default Wrapper
