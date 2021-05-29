import { Link, Typography } from '@material-ui/core'
import React from 'react'
import PARTNERS from '../../constants/partners'

import FooterCard from './card/FooterCard'
import { StyledFooterElementText } from './styles'

function Partners() {
  const items = PARTNERS.map((partner) => {
    const { link, name } = partner
    return (
      <StyledFooterElementText key={link}>
        <Typography variant="body2">
          <Link href={link} target="blank">
            {name}
          </Link>
        </Typography>
      </StyledFooterElementText>
    )
  })

  const title = 'nos partenaires'

  return <FooterCard items={items} title={title} />
}

export default Partners
