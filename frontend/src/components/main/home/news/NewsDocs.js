import React from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'

function NewsDocs() {
  const cardTitle = 'Documents récents'

  const items = [
    <CardItem
      title="Menu hebdomadaire"
      detail="du 14 au 20 Janvier 2021"
      key="1"
    />,
    <CardItem title="Newsletter mensuelle" detail="Avril 2021" key="2" />,
    <CardItem
      title="Circulaire du ministère"
      detail="11 Decembre 2020"
      key="3"
    />,
  ]

  return (
    <NewsCard cardTitle={cardTitle} items={items} recipe={<AttachFileIcon />} />
  )
}

export default NewsDocs
