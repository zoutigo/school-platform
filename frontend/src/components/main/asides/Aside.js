/* eslint-disable import/named */
import { Grid } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useRoutesInfos } from '../../../utils/hooks'

import AsideItem from './AsideItem'
import AsideTitle from './AsideTitle'

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

function Aside({ datas }) {
  const { current } = useRoutesInfos()

  const { title, items } = datas

  if (current.state.type === 'rubric') return null

  return (
    <StyledAsideGrid item xs={false} md={title ? 3 : false} show={title}>
      <AsideTitle title={title || ''} />
      <StyledAsideBodyGrid container>
        {items &&
          items.map((asideitem) => <AsideItem key={title} item={asideitem} />)}
      </StyledAsideBodyGrid>
    </StyledAsideGrid>
  )
}

Aside.defaultProps = null

Aside.propTypes = {
  datas: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        subtitle: PropTypes.string,
      })
    ),
  }),
}

export default React.memo(Aside)
