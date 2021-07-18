import { Typography } from '@material-ui/core'
import React from 'react'
import { StyledNavLink } from '../elements/styled'

import FooterCard from './card/FooterCard'
import { StyledFooterElementText } from './styles'

function Suggestions() {
  const suggestions = [
    {
      name: "Proposer une idée à l'école",
      link: '/informations/contacts/ecrire/idea',
    },
    {
      name: 'Suggérer une amélioration du site',
      link: '/informations/contacts/ecrire/improvment',
    },
    {
      name: 'Signaler un bug',
      link: '/informations/contacts/ecrire/bug',
    },
  ]

  const items = suggestions.map((partner) => {
    const { link, name } = partner
    return (
      <StyledFooterElementText key={name}>
        <StyledNavLink
          to={{
            pathname: link,
          }}
        >
          <Typography variant="body2">{name}</Typography>
        </StyledNavLink>
      </StyledFooterElementText>
    )
  })

  const title = 'Améliorations'
  return <FooterCard items={items} title={title} />
}

export default Suggestions
