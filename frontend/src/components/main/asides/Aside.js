import { Grid } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React from 'react'

import randomkey from '../../../utils/randomkey'
import useIsTokenValid from '../../hooks/useIsTokenValid'
import useRoutesInfos from '../../hooks/useRoutesInfos'

import AsideError from './AsideError'

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

function Aside({ datas, module }) {
  const { current } = useRoutesInfos()
  const tokenIsValid = useIsTokenValid()

  const { title, items } = datas

  const itemsList =
    (module === 'classroom' || module === 'apel' || module === 'ogec') &&
    tokenIsValid
      ? items
      : null

  if (current.state.type === 'rubric') return null

  return (
    <StyledAsideGrid item xs={false} md={title ? 3 : false} show={title}>
      <AsideTitle title={title || ''} />
      <StyledAsideBodyGrid container>
        {itemsList ? (
          items.map((asideitem) => (
            <AsideItem key={randomkey(9999999)} item={asideitem} />
          ))
        ) : (
          <AsideError errortext="reservé aux inscrits" />
        )}
      </StyledAsideBodyGrid>
    </StyledAsideGrid>
  )
}

Aside.defaultProps = null

Aside.propTypes = {
  module: PropTypes.string,
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
