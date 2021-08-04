import React from 'react'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'

function NewsDocs() {
  const cardTitle = 'Documents récents'

  const documents = [
    <CardItem
      title="Menu hebdomadaire"
      detail="du 14 au 20 Janvier 2021"
      link="viescolaire/cantine/menus"
    />,
    <CardItem
      title="Newsletter mensuelle"
      detail="Avril 2021"
      link="/informations/actualites/newsletter"
    />,
    <CardItem title="Circulaire du ministère" detail="11 Decembre 2020" />,
  ]

  return (
    <NewsCard
      cardTitle={cardTitle}
      items={documents}
      recipe={String(<AttachFileIcon />)}
    />
  )
}

export default NewsDocs
