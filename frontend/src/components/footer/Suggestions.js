import { Typography } from '@material-ui/core'
import React, { useCallback } from 'react'
import { useRoutesInfos } from '../../utils/hooks'
import { StyledNavLink } from '../elements/styled'

import FooterCard from './card/FooterCard'
import { StyledFooterElementText } from './styles'

function Suggestions() {
  const { routesList } = useRoutesInfos()
  const { path, state: ecrireState } = useCallback(
    routesList.find((route) => route.path === '/informations/contacts/ecrire'),
    [routesList]
  )
  const suggestions = [
    {
      name: "Proposer une idée à l'école",
      link: path,
      state: {
        ...ecrireState,
        topic: 'idea',
        text: "Proposer une idée à l'école",
      },
    },
    {
      name: 'Suggérer une amélioration du site',
      link: path,
      state: {
        ...ecrireState,
        topic: 'improvment',
        text: 'Suggérer une amélioration du site',
      },
    },
    {
      name: 'Signaler un bug',
      link: path,
      state: { ...ecrireState, topic: 'bug', text: 'Signaler un bug' },
    },
  ]

  const items = suggestions.map((partner) => {
    const { link, name, state } = partner
    return (
      <StyledFooterElementText key={name}>
        <StyledNavLink
          to={{
            pathname: link,
            state: state,
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
