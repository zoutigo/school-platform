import { makeStyles, styled, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/styles'
import { StyledIconBox, StyledNavLink } from '../elements/styled'

const useStyles = makeStyles(() => ({
  rubric: {
    minWidth: '16rem',
    background: 'transparent',
  },
  category: {
    minWidth: '14rem',
    background: 'whitesmoke',
  },
}))

const StyledRubricLi = withTheme(
  styled(({ bgcolor, theme, ...rest }) => <li {...rest} />)({
    background: 'yellow',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '&:hover': {
      background: ({ bgcolor }) => bgcolor || 'transparent',
      color: ({ theme }) => theme.palette.secondary.dark,
    },
  })
)
const StyledCategoryLi = withTheme(
  styled(({ bgcolor, theme, ...rest }) => <li {...rest} />)({
    background: 'whitesmoke',
    textAlign: 'center',
    boxSizing: 'border-box',
    cursor: 'pointer',
    marginTop: '1px',
    border: 'white',
    minWidth: '100%',
    '&:hover': {
      background: ({ bgcolor }) => bgcolor || 'transparent',
      color: ({ theme }) => theme.palette.secondary.dark,
      '& >ul': {
        // display: 'block',
      },
    },
  })
)

const StyledChapterUl = withTheme(
  styled(({ bgcolor, theme, ...rest }) => <ul {...rest} />)({
    position: 'absolute',
    display: 'none',
    top: 0,
    left: '100%',
    zIndex: 1,
    margin: 0,
    '& >li': {
      background: 'whitesmoke',
      '&:hover': {
        background: ({ bgcolor }) => bgcolor || 'transparent',
      },
    },
  })
)

function NavBloc({ rubric, rubcolor }) {
  const classes = useStyles()
  const { rubname, icon, categories } = rubric

  return (
    <li className="btn-width">
      <ul>
        <li>
          <StyledIconBox bgcolor={rubcolor}>{icon}</StyledIconBox>
        </li>
        <StyledRubricLi className="dropdown btn-size" bgcolor={rubcolor}>
          <StyledNavLink to={rubric.route.path}>
            <Typography variant="h4">{rubname}</Typography>
          </StyledNavLink>
          <ul className={`dropdown-content ${classes.category}`}>
            {categories &&
              categories.map((category) => (
                <StyledCategoryLi
                  key={category.alias}
                  bgcolor={rubcolor}
                  className="btn-size dropdown"
                >
                  <StyledNavLink to={category.route.path}>
                    <Typography variant="h4">{category.catname}</Typography>
                  </StyledNavLink>{' '}
                  {category.chapters && (
                    <StyledChapterUl
                      bgcolor={rubcolor}
                      className="dropdown-content"
                    >
                      {
                        // eslint-disable-next-line
                        category.chapters.map((chapter) => (
                          <li key={chapter.alias} className="btn-size">
                            <StyledNavLink to={chapter.route.path}>
                              <Typography variant="h4">
                                {chapter.chapname || 'hello'}{' '}
                              </Typography>{' '}
                            </StyledNavLink>
                          </li>
                        ))
                      }
                    </StyledChapterUl>
                  )}
                </StyledCategoryLi>
              ))}
          </ul>
        </StyledRubricLi>
      </ul>
    </li>
  )
}
// NavBloc.defaultProps = null
NavBloc.propTypes = {
  rubcolor: PropTypes.string.isRequired,
  rubric: PropTypes.shape({
    rubname: PropTypes.string,
    icon: PropTypes.element,
    alias: PropTypes.string,
    route: PropTypes.shape({
      path: PropTypes.string.isRequired,
      exact: PropTypes.bool.isRequired,
      component: PropTypes.func.isRequired,
    }),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        catname: PropTypes.string.isRequired,
        alias: PropTypes.string.isRequired,
        route: PropTypes.shape({
          path: PropTypes.string.isRequired,
          exact: PropTypes.bool.isRequired,
          component: PropTypes.func.isRequired,
        }).isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            chapname: PropTypes.string,
            alias: PropTypes.string,
            route: PropTypes.shape({
              path: PropTypes.string,
              exact: PropTypes.bool,
              component: PropTypes.func,
            }),
          })
        ),
      })
    ),
  }).isRequired,
}

export default NavBloc
