import { styled, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { withTheme } from '@material-ui/styles'
import { StyledIconBox, StyledNavLink } from '../elements/styled'

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
  const { rubname, icon, categories, route } = rubric
  const { pathname } = useLocation()

  const [showDropDown, setShowDropdown] = useState(true)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleClick = () => {
      if (!showDropDown) setShowDropdown(true)
    }

    window.addEventListener('mousemove', handleClick)
    return () => {
      window.removeEventListener('mousemove', handleClick)
    }
  }, [showDropDown])

  useEffect(() => {
    const matchRubric = pathname === route.path
    const matchCategory =
      categories.filter((category) => category.route.path === pathname).length >
      0

    const chaptersRouteList = []
    for (let i = 0; i < categories.length; i += 1) {
      const listchapters = categories[i].chapters
      for (let j = 0; j < listchapters.length; j += 1) {
        const { route: chapterroute } = listchapters[j]
        chaptersRouteList.push(chapterroute)
      }
    }

    const matchChapter =
      chaptersRouteList.filter((chaproute) => chaproute.path === pathname)
        .length > 0

    if (matchRubric || matchCategory || matchChapter) {
      setActive(true)
    }

    return () => {
      setActive(false)
    }
  }, [pathname])

  return (
    <li className="btn-width">
      <ul>
        <li>
          <StyledIconBox bgcolor={rubcolor} fontsize="2.2rem">
            {icon}
          </StyledIconBox>
        </li>
        <StyledRubricLi
          className="dropdown btn-size"
          bgcolor={rubcolor}
          onClick={() => setShowDropdown(false)}
          role="presentation"
        >
          <StyledNavLink to={rubric.route.path}>
            <Typography variant="h2">{rubname}</Typography>
          </StyledNavLink>
          {showDropDown && (
            <ul className="dropdown-content btn-width bg-transparent">
              {categories &&
                categories.map((category) => (
                  <StyledCategoryLi
                    key={category.alias}
                    bgcolor={rubcolor}
                    className="btn-size dropdown"
                    onClick={() => setShowDropdown(false)}
                    role="presentation"
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
                            <li
                              key={chapter.alias}
                              className="btn-size"
                              onClick={() => setShowDropdown(false)}
                              role="presentation"
                            >
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
          )}
        </StyledRubricLi>
        <StyledLine active={active} />
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
        chapters: PropTypes.arrayOf(
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
