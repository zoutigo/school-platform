import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Grid, Icon, styled, Typography, useTheme } from '@material-ui/core'
import { StyledIconBox, StyledNavLink } from '../elements/styled'
import { openSmallScreenNav } from '../../redux/settings/SettingsActions'

const StyledCategoryTextGrid = styled(Grid)(() => ({
  paddingLeft: '2.5rem',
}))
const StyledChapterTextGrid = styled(Grid)(() => ({
  paddingLeft: '4rem',
}))
const StyledCategoryGrid = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.light,
  marginTop: '0.05rem',
}))
const StyledChapterGrid = styled(Grid)(({ theme }) => ({
  background: 'whitesmoke',
  marginTop: '0.05rem',
}))

function CategoryScreen({ category }) {
  const { chapters, catname, route } = category
  // eslint-disable-next-line react/prop-types
  const { path } = route
  const theme = useTheme()
  const dispatch = useDispatch()
  const [showChapters, setShowChapters] = useState(false)

  const areChapters = chapters && chapters.length > 0

  const handleToggle = () => {
    setShowChapters((prev) => !prev)
  }

  return (
    <StyledCategoryGrid container>
      <Grid item container>
        <StyledCategoryTextGrid item xs={areChapters ? 10 : 12}>
          <StyledNavLink
            to={path}
            onClick={() => dispatch(openSmallScreenNav(false))}
          >
            <Typography variant="h6">{catname} </Typography>
          </StyledNavLink>
        </StyledCategoryTextGrid>
        {areChapters && (
          <Grid item xs={2}>
            <StyledIconBox
              onClick={handleToggle}
              className="cursor"
              fontsize="1rem"
              bgcolor={
                showChapters
                  ? theme.palette.error.dark
                  : theme.palette.secondary.main
              }
            >
              <Icon
                className={
                  showChapters ? 'fa fa-ellipsis-v' : 'fa fa-ellipsis-h'
                }
                aria-hidden="true"
                style={{ marginTop: '1rem' }}
              />
            </StyledIconBox>
          </Grid>
        )}
      </Grid>
      {areChapters && showChapters && (
        <StyledChapterGrid item container>
          {chapters.map((chapter) => (
            <StyledChapterTextGrid item key={chapter.alias} xs={12}>
              <StyledNavLink
                to={chapter.route.path}
                onClick={() => dispatch(openSmallScreenNav(false))}
              >
                <Typography variant="h6">{chapter.chapname}</Typography>
              </StyledNavLink>
            </StyledChapterTextGrid>
          ))}
        </StyledChapterGrid>
      )}
    </StyledCategoryGrid>
  )
}

CategoryScreen.propTypes = {
  category: PropTypes.shape({
    catname: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
      exact: PropTypes.bool.isRequired,
      component: PropTypes.func.isRequired,
    }).isRequired,
    chapters: PropTypes.arrayOf(
      PropTypes.shape({
        chapname: PropTypes.string,
        alias: PropTypes.string,
        route: PropTypes.shape({
          path: PropTypes.string,
          exact: PropTypes.bool,
          component: PropTypes.func,
        }).isRequired,
      })
    ),
  }).isRequired,
}
export default CategoryScreen
