import { Typography } from '@material-ui/core'
import React from 'react'
import AvTimerIcon from '@material-ui/icons/AvTimer'
import { StyledFooterElementText } from './styles'

import FooterCard from './card/FooterCard'

function Timing() {
  const title = 'Les horaires'
  const Timingbloc = () => (
    <StyledFooterElementText>
      <AvTimerIcon />
      <Typography variant="body2">Lundi-Vendredi: 07.45 - 18.00</Typography>
    </StyledFooterElementText>
  )

  const items = [<Timingbloc key="timingbloc" />]

  return <FooterCard items={items} title={title} />
}

export default Timing
