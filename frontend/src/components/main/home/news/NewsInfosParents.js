import React from 'react'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import moment from 'moment'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import { apiFetchPaper } from '../../../../utils/api'
import capitilize from '../../../../utils/capitilize'
import useFetch from '../../../hooks/useFetch'

function NewsInfosParents() {
  const cardTitle = 'Infos Parents'

  const queryKey = ['infos-parents']
  const queryParams = `type=parent-info`

  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchPaper
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return (
      <span>
        Error:
        {errorMessage}
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
            link="/informations/actualites/infosparents"
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

export default NewsInfosParents
