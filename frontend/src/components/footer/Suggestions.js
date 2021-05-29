import { Typography } from '@material-ui/core'
import React from 'react'
import { StyledNavLink } from '../elements/styled'

import FooterCard from './card/FooterCard'
import { StyledFooterElementText } from './styles'

function Suggestions() {
  const suggestions = [
    {
      name: "proposer un idée à l'école",
      link: '/informations/contacts/ecrire',
      topic: 'school-idea',
    },
    {
      name: 'suggérer une amélioration du site',
      link: '/informations/contacts/ecrire',
      topic: 'site-improvment',
    },
    {
      name: 'signaler un bug',
      link: '/informations/contacts/ecrire',
      topic: 'bug',
    },
  ]

  const items = suggestions.map((partner) => {
    const { link, name, topic } = partner
    return (
      <StyledFooterElementText key={name}>
        <StyledNavLink
          to={{
            pathname: link,
            state: {
              topic: topic,
            },
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
