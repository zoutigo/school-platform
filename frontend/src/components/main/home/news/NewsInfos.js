import React from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'

function NewsInfos() {
  const cardTitle = "Actualités de l'école"

  const items = [
    <CardItem
      title="Atelier peinture"
      detail="ce1 - Le 19 Mars 2021"
      key="1"
    />,
    <CardItem
      title="Eveil à la foi"
      detail="La pastorale - 07 Mars 2021"
      key="2"
    />,
    <CardItem
      title="Nouvelles regles sanitaires"
      detail="La direction - Le 01 Mars 2021"
      key="3"
    />,
  ]
  return (
    <NewsCard cardTitle={cardTitle} items={items} recipe={<MenuBookIcon />} />
  )
}

export default NewsInfos
