import React from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import { useQuery } from 'react-query'
import moment from 'moment'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import { apiFetchPaper } from '../../../../utils/api'
import capitilize from '../../../../utils/capitilize'

function NewsActivites() {
  const cardTitle = "Actualités de l'école"

  const queryKey = ['activites']
  const queryParams = `type=activite`

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchPaper(queryParams)
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return (
      <span>
        Error:
        {error.message}
      </span>
    )
  }

  if (!Array.isArray(data)) {
    return null
  }

  const items = []

  if (data && data.length > 0) {
    for (let i = 0; i < 3; i += 1) {
      if (data[i]) {
        const { entity, date, title } = data[i]
        const dateString = moment(Number(date)).format('DD/MM/YYYY')
        items.push(
          <CardItem
            title={title}
            detail={`${capitilize(entity.name)} - ${dateString}`}
            link="/informations/actualites/activites"
          />
        )
      }
    }
  }

  return (
    <NewsCard
      cardTitle={cardTitle}
      items={items}
      recipe={String(<MenuBookIcon />)}
    />
  )
}

export default NewsActivites
