import { Grid } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import React from 'react'
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

function Aside({ aside, rubriccolors }) {
  return (
    <StyledAsideGrid item xs={false} md={aside ? 3 : false} show={aside}>
      <AsideTitle
        rubriccolors={rubriccolors}
        title={aside ? aside.title : ''}
      />
      <StyledAsideBodyGrid container>
        {aside &&
          aside.items &&
          aside.items.map((asideitem) => (
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
  aside: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        subtitle: PropTypes.element,
        text: PropTypes.element,
      })
    ),
    title: PropTypes.string,
  }),
}

export default Aside
