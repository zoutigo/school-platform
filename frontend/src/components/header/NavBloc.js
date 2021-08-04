import { styled, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { withTheme } from '@material-ui/styles'
import { StyledIconBox, StyledNavLink } from '../elements/styled'
import { useRigths } from '../../utils/hooks'
import Icons from '../elements/Icons'

const StyledRubricLi = withTheme(
  styled(({ bgcolor, theme, ...rest }) => <li {...rest} />)({
    background: 'transparent',
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
    margin: 0,
    '& >li': {
      background: 'whitesmoke',
      '&:hover': {
        background: ({ bgcolor }) => bgcolor || 'transparent',
      },
    },
  })
)

const StyledLine = withTheme(
  styled(({ active, theme, ...rest }) => <li {...rest} />)({
    minHeight: '3px',
    width: '50px',
    margin: '0px auto ',
    background: ({ active, theme: { palette } }) =>
      active ? palette.secondary.dark : 'transparent',
  })
)

function NavBloc({ rubric, rubcolor }) {
  const { state, routes } = rubric
  const { pathname } = useLocation()
  const { adminLevel, userLevel, managerLevel, moderatorLevel } = useRigths()
  const [showDropDown, setShowDropdown] = useState(true)

  useEffect(() => {
    const handleClick = () => {
      if (!showDropDown) setShowDropdown(true)
    }

    window.addEventListener('mousemove', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleClick)
    }
  }, [showDropDown])

  const active = useCallback(pathname.includes(rubric.path), [pathname])
  const handleClick = useCallback(() => {
    setShowDropdown(false)
  }, [])

  return (
    <li className="btn-width">
      <ul>
        <li>
          <StyledIconBox bgcolor={rubcolor} fontsize="2.2rem">
            <Icons alias={state.alias} />
          </StyledIconBox>
        </li>
        <StyledRubricLi
          className="dropdown btn-size"
          bgcolor={rubcolor}
          onClick={handleClick}
          role="presentation"
        >
          <StyledNavLink
            to={{
              pathname: rubric.path,
              state: rubric.state,
            }}
          >
            <Typography variant="h2">{rubric.state.name}</Typography>
          </StyledNavLink>
          {showDropDown && (
            <ul className="dropdown-content btn-width bg-transparent">
              {routes &&
                routes.map((category) => {
                  if (category.state.access === 'admin' && !adminLevel)
                    return null
                  if (category.state.access === 'manager' && !managerLevel)
                    return null
                  if (category.state.access === 'moderator' && !moderatorLevel)
                    return null
                  if (category.state.access === 'user' && !userLevel)
                    return null
                  return (
                    <StyledCategoryLi
                      key={category.state.alias}
                      bgcolor={rubcolor}
                      className="btn-size dropdown"
                      onClick={handleClick}
                      role="presentation"
                    >
                      <StyledNavLink
                        to={{
                          pathname: category.path,
                          state: category.state,
                        }}
                      >
                        <Typography variant="h4">
                          {category.state.name}
                        </Typography>
                      </StyledNavLink>{' '}
                      {category.routes && (
                        <StyledChapterUl
                          bgcolor={rubcolor}
                          className="dropdown-content"
                        >
                          {
                            // eslint-disable-next-line
                            category.routes.map((chapter) => (
                              <li
                                key={chapter.path}
                                className="btn-size"
                                onClick={handleClick}
                                role="presentation"
                              >
                                <StyledNavLink
                                  to={{
                                    pathname: chapter.path,
                                    state: chapter.state,
                                  }}
                                >
                                  <Typography variant="h4">
                                    {chapter.state.name || 'hello'}{' '}
                                  </Typography>{' '}
                                </StyledNavLink>
                              </li>
                            ))
                          }
                        </StyledChapterUl>
                      )}
                    </StyledCategoryLi>
                  )
                })}
            </ul>
          )}
        </StyledRubricLi>
        <StyledLine active={active} />
      </ul>
    </li>
  )
}
NavBloc.defaultProps = {
  rubric: {
    routes: null,
  },
}
NavBloc.propTypes = {
  rubcolor: PropTypes.string.isRequired,
  rubric: PropTypes.shape({
    path: PropTypes.string,
    state: PropTypes.shape({
      name: PropTypes.string,
      alias: PropTypes.string,
      type: PropTypes.string,
      access: PropTypes.string,
      icon: PropTypes.element,
    }),
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        state: PropTypes.shape({
          name: PropTypes.string,
          alias: PropTypes.string,
          type: PropTypes.string,
          access: PropTypes.string,
          icon: PropTypes.element,
          routes: PropTypes.arrayOf(
            PropTypes.shape({
              path: PropTypes.string,
              state: PropTypes.shape({
                name: PropTypes.string,
                alias: PropTypes.string,
                type: PropTypes.string,
                access: PropTypes.string,
                icon: PropTypes.element,
              }),
            })
          ),
        }),
      })
    ),
  }),
}

export default React.memo(NavBloc)
