import { Box, styled } from '@material-ui/core'
import React from 'react'

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'
import FooterCard from './card/FooterCard'

const StyledButtonGroup = styled(Box)(() => ({
  '& >*': {
    marginRight: '16px !important',
    borderRadius: '5px',
  },
}))

function Share() {
  const url = process.env.REACT_APP_URL
  const title = 'Partager'
  const shareTitle = 'Ecole Saint Augustin'
  const hashtag = '#ecolesaintaugustincremieu'

  const Facebook = () => (
    <FacebookShareButton url={url} quote={shareTitle} hashtag={hashtag}>
      <FacebookIcon size={36} />
    </FacebookShareButton>
  )
  const Whatsapp = () => (
    <WhatsappShareButton
      url={url}
      title={shareTitle}
      hashtag={hashtag}
      separator=":: "
    >
      <WhatsappIcon size={36} />
    </WhatsappShareButton>
  )

  const items = [
    <StyledButtonGroup key="buttons">
      <Facebook />
      <Whatsapp />
    </StyledButtonGroup>,
  ]

  return <FooterCard items={items} title={title} />
}

export default Share
