import React from 'react'
import { IconButton } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import CONTACTS from './contacts'
import AsideSubTitle from '../components/main/structure/AsideSubTitle'
import Adress from '../components/elements/Adress'
import { StyledNavLink } from '../components/elements/styled'

const { email, phone } = CONTACTS
const phoneString = `tel:${phone}`
const emailString = `mailto:${phone}`

const EmailItemIcon = () => (
  <IconButton href={emailString}>
    <EmailIcon style={{ fontSize: 70 }} />
  </IconButton>
)
const PhoneItemIcon = () => (
  <IconButton href={phoneString}>
    <PhoneIcon style={{ fontSize: 70 }} />
  </IconButton>
)
const AdressItemIcon = () => (
  <IconButton>
    <StyledNavLink to="/informations/contacts/localisation">
      <LocationOnIcon style={{ fontSize: 70 }} />
    </StyledNavLink>
  </IconButton>
)
const itemsDatas = [
  ['adresse', <Adress key="adress" />, <AdressItemIcon key="adress" />],
  ['Telephone', phone, <PhoneItemIcon key="phone" />],
  ['Email', email, <EmailItemIcon key="email" />],
]

const asideContacts = {
  title: 'Cordonnées',
  items: itemsDatas.map((item) => ({
    subtitle: <AsideSubTitle subtitle={item[0]} />,
    text: item[1],
    icon: item[2],
  })),
}

export default asideContacts
