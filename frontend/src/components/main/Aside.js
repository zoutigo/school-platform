/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useRoutesInfos } from '../../utils/hooks'
import AsideItem from './structure/AsideItem'
import AsideTitle from './structure/AsideTitle'

const StyledGrid = styled(Grid)(({ theme }) => ({
  paddingLeft: '4%',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '0px',
  },
}))

export const StyledAsideGrid = withTheme(
  styled(({ show, ...rest }) => <StyledGrid {...rest} />)({
    display: ({ show }) => (show ? 'block' : 'block'),
  })
)

const StyledAsideBodyGrid = styled(Grid)(() => ({
  background: 'whitesmoke',
}))

function Aside({ rubriccolors }) {
  const { category, current } = useRoutesInfos()

  const { Asides } = useSelector((state) => state.settings)

  const categoryAsideDatas = useCallback(() => {
    const currentCategory = category ? category.current : null
    if (!currentCategory) return null
    const { path: categoryPath } = currentCategory
    const categoryAside = Asides.find(
      ([asidePath, ...rest]) => asidePath === categoryPath
    )

    const [a, { title, items }] = categoryAside
    return {
      title,
      items,
    }
  }, [Asides, category.current])

  if (current.state.type === 'rubric' || !categoryAsideDatas()) return null

  return (
    <StyledAsideGrid
      item
      xs={false}
      md={categoryAsideDatas().title ? 3 : false}
      show={categoryAsideDatas().title}
    >
      <AsideTitle
        rubriccolors={rubriccolors}
        title={categoryAsideDatas().title || ''}
      />
      <StyledAsideBodyGrid container>
        {categoryAsideDatas().items &&
          categoryAsideDatas().items.map((asideitem) => (
            <AsideItem
              key={categoryAsideDatas().title}
              rubriccolors={rubriccolors}
              item={asideitem}
            />
          ))}
      </StyledAsideBodyGrid>
    </StyledAsideGrid>
  )
}

Aside.defaultProps = null

Aside.propTypes = {
  rubriccolors: PropTypes.shape({
    main: PropTypes.string,
    dark: PropTypes.string,
    ligth: PropTypes.string,
  }),
}

export default React.memo(Aside)
