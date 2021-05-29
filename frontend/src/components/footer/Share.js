import { Box, styled } from '@material-ui/core'
import React from 'react'

import {
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
  PinterestShareButton,
  PinterestIcon,
  TwitterShareButton,
  TwitterIcon,
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
  const Twitter = () => (
    <TwitterShareButton url={url} title={shareTitle} hashtag={hashtag}>
      <TwitterIcon size={36} />
    </TwitterShareButton>
  )
  const Pinterest = () => (
    <PinterestShareButton url={url} title={title} hashtag={hashtag}>
      <PinterestIcon size={36} />
    </PinterestShareButton>
  )
  const Instagram = () => (
    <InstapaperShareButton url={url} title={shareTitle} hashtag={title}>
      <InstapaperIcon size={36} />
    </InstapaperShareButton>
  )

  const items = [
    <StyledButtonGroup key="buttons">
      <Facebook />
      <Whatsapp />
      <Twitter />
      <Pinterest />
      <Instagram />
    </StyledButtonGroup>,
  ]

  return <FooterCard items={items} title={title} />
}

export default Share
