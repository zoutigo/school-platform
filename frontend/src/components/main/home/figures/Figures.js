import React from 'react'
import { styled } from '@material-ui/styles'
import image from '../../../../assets/images/home-figures.JPG'
import FiguresCard from './FiguresCard'
import { StyledHomeGrid } from '../../../elements/styled'

const StyledFiguresContainer = styled(StyledHomeGrid)(() => ({
  minHeight: '70vh',
  backgroundSize: '2100px',
  backgroundRepeat: 'no-repeat',
  backgroundPositionY: '-8vh',
  backgroundPosition: 'top  , right',
  background: `url(${image})`,
  alignItems: 'center',
  position: 'relative',
}))

const matrix = [
  ['6vh', '8vw'],
  ['50vh', '35vw'],
  ['20vh', '55vw'],
  ['35vh', '70vw'],
]

function Figures() {
  const items = [
    ['Eleves', 218, '#85C48E', matrix[0]],
    ['Familles', 100, '#C389BC', matrix[1]],
    ['Enseignants', 25, '#EE701D', matrix[2]],
    ['Jeux', 49, '#F9CE46', matrix[3]],
  ]

  return (
    <StyledFiguresContainer container>
      {items.map((item) => (
        <FiguresCard figureitem={item} key={item} />
      ))}
    </StyledFiguresContainer>
  )
}

export default Figures
