import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Box, Typography } from '@material-ui/core'
import { styled, withTheme } from '@material-ui/styles'

const StyledAvatar = withTheme(
  styled(({ bgcolor, ...rest }) => <Avatar {...rest} />)({
    width: '150px',
    height: '150px',
    position: 'relative',
    background: ({ bgcolor }) => bgcolor,
  })
)

const StyledCountTypo = styled(Typography)(() => ({
  position: 'absolute',
  top: 0,
  fontSize: '3rem',
}))

const StyledDesignationTypo = styled(Typography)(() => ({
  position: 'absolute',
  top: 90,
}))

function FiguresCard({ figureitem }) {
  const [designation, count, bgcolor, positions] = figureitem

  const StyledFigureCards = styled(Box)(() => ({
    position: 'absolute',
    top: positions[0],
    left: positions[1],
  }))
  return (
    <StyledFigureCards positions={positions}>
      <StyledAvatar bgcolor={bgcolor}>
        <StyledDesignationTypo variant="h4">
          {designation}
        </StyledDesignationTypo>

        <StyledCountTypo variant="h3">{count}</StyledCountTypo>
      </StyledAvatar>
    </StyledFigureCards>
  )
}

FiguresCard.propTypes = {
  figureitem: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.string),
    ])
  ).isRequired,
}

export default FiguresCard
