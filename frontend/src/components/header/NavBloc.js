import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

import { StyledIconBox, StyledNavLink } from '../elements/styled'

const useStyles = makeStyles(() => ({
  rubric: {
    minWidth: '16rem',
    background: 'transparent',
  },
  category: {
    minWidth: '14rem',
    background: 'blue',
  },
  chapter: {
    background: 'pink',
  },
}))

function NavBloc({ rubric, rubcolor }) {
  const classes = useStyles()
  const { rubname, icon, categories } = rubric
  const { chapters } = categories

  return (
    <li className={classes.rubric}>
      <ul>
        <li>
          <StyledIconBox bgcolor={rubcolor}>{icon}</StyledIconBox>
        </li>
        <li
          className="mt-2 dropdown "
          style={{
            background: 'yellow',
            textAlign: 'center',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h2">{rubname}</Typography>
          <ul className={`dropdown-content ${classes.category}`}>
            {categories &&
              categories.map((category) => (
                <li key={category.alias}>
                  <StyledNavLink to={category.route.path}>
                    {category.catname}
                  </StyledNavLink>{' '}
                  {chapters && (
                    <ul className={classes.chapter}>
                      {
                        // eslint-disable-next-line
                        chapters.map((chapter) => (
                          <li key={chapter.alias}>
                            <StyledNavLink>
                              <Typography variant="h3">
                                {chapter.name}{' '}
                              </Typography>{' '}
                            </StyledNavLink>
                          </li>
                        ))
                      }
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </li>
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
