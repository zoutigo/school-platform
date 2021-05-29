import { Link, Typography } from '@material-ui/core'
import React from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import { StyledAdressBox, StyledFooterElementText } from './styles'

import FooterCard from './card/FooterCard'
import CONTACTS from '../../constants/contacts'
import Adress from '../elements/Adress'

function Contact() {
  const { email, phone } = CONTACTS
  const phoneString = `tel:${phone}`
  const emailString = `mailto:${email}`

  const PhoneBloc = () => (
    <StyledFooterElementText>
      <PhoneIcon />
      <Typography variant="body2">
        <Link href={phoneString}>{phone} </Link>
      </Typography>
    </StyledFooterElementText>
  )
  const EmailBloc = () => (
    <StyledFooterElementText>
      <EmailIcon />
      <Typography variant="body2">
        <Link href={emailString}>{email} </Link>
      </Typography>
    </StyledFooterElementText>
  )

  const AdressBloc = () => (
    <StyledAdressBox>
      <LocationOnIcon />
      <Adress />
    </StyledAdressBox>
  )

  const items = [
    <AdressBloc key="adress" />,
    <PhoneBloc key="phone" />,
    <EmailBloc key="email" />,
  ]

  const title = 'Nous contacter'

  return <FooterCard items={items} title={title} />
}

export default Contact
