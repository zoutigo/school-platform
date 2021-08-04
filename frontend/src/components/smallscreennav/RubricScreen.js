import { Grid, Icon, styled, Typography, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { StyledIconBox, StyledNavLink } from '../elements/styled'
import CategoryScreen from './CategoryScreen'
import { openSmallScreenNav } from '../../redux/settings/SettingsActions'

const StyledRubricGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  marginTop: '0.3rem',
  color: theme.palette.secondary.main,
}))
const StyledRubricTextGrid = styled(Grid)(() => ({
  paddingLeft: '1rem',
}))

function RubricScreen({ rubric }) {
  const { SmallScreenNavIsOpened } = useSelector((state) => state.settings)
  const [showCategories, setShowCategories] = useState(false)
  const { path, state, routes } = rubric
  const theme = useTheme()
  const dispatch = useDispatch()

  const handleToggle = () => {
    setShowCategories((prev) => !prev)
  }
  const areCategories = SmallScreenNavIsOpened && routes && routes.length > 0
  return (
    <StyledRubricGrid container>
      <Grid item container>
        <StyledRubricTextGrid item xs={areCategories > 0 ? 10 : 12}>
          <StyledNavLink
            to={{
              pathname: path,
              state: state,
            }}
            onClick={() => dispatch(openSmallScreenNav(false))}
          >
            <Typography variant="h6">{state.name} </Typography>
          </StyledNavLink>
        </StyledRubricTextGrid>
        <Grid item xs={areCategories ? 2 : false}>
          <StyledIconBox
            onClick={handleToggle}
            className="cursor"
            fontsize="1rem"
            bgcolor={
              showCategories
                ? theme.palette.error.dark
                : theme.palette.secondary.main
            }
          >
            <Icon
              className={
                showCategories ? 'fa fa-ellipsis-v' : 'fa fa-ellipsis-h'
              }
              aria-hidden="true"
              style={{ marginTop: '1rem' }}
            />
          </StyledIconBox>
        </Grid>
      </Grid>
      {areCategories && showCategories && (
        <Grid item container>
          {routes.map((category) => (
            <CategoryScreen category={category} key={category.alias} />
          ))}
        </Grid>
      )}
    </StyledRubricGrid>
  )
}

RubricScreen.propTypes = {
  rubric: PropTypes.shape({
    path: PropTypes.string,
    alias: PropTypes.string,
    state: PropTypes.shape({
      alias: PropTypes.string,
      name: PropTypes.string,
    }),
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        alias: PropTypes.string,
        state: PropTypes.shape({
          alias: PropTypes.string,
          name: PropTypes.string,
        }),
        routes: PropTypes.arrayOf(
          PropTypes.shape({
            path: PropTypes.string,
            alias: PropTypes.string,
            state: PropTypes.shape({
              alias: PropTypes.string,
              name: PropTypes.string,
            }),
          })
        ),
      })
    ),
  }).isRequired,
}

export default RubricScreen
