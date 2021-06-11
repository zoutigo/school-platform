import { Grid } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCurrentCategory } from '../../utils/hooks'
import randomkey from '../../utils/randomkey'
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
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([])
  const { path: catePath } = useCurrentCategory()

  // fetch the current category using pathname
  // fetch aside datas from redux

  const { Asides } = useSelector((state) => state.settings)

  // remove aside(datas) as props from main file
  // use  the aboce data to build the below aside
  useEffect(() => {
    const categoryAside = Asides.find(
      // eslint-disable-next-line no-unused-vars
      ([categoryPath, categoryInfos]) => categoryPath === catePath
    )
    if (categoryAside) {
      // eslint-disable-next-line no-unused-vars
      const [a, { title: catTitle, items: catItems }] = categoryAside
      setTitle(catTitle)
      setItems(catItems)
    }
    return () => {
      setTitle('')
      setItems([])
    }
  }, [catePath])

  return (
    <StyledAsideGrid item xs={false} md={title ? 3 : false} show={title}>
      <AsideTitle rubriccolors={rubriccolors} title={title || ''} />
      <StyledAsideBodyGrid container>
        {items &&
          items.map((asideitem) => (
            <AsideItem
              key={randomkey(987654)}
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

export default Aside
