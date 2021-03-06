import React from 'react'
import moment from 'moment'
import DateRangeIcon from '@material-ui/icons/DateRange'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import { apiFetchEvents } from '../../../../utils/api'
import useFetch from '../../../hooks/useFetch'

function NewsAgenda() {
  const cardTitle = 'Agenda à venir'

  const queryKey = ['events']
  const queryParams = ''

  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchEvents
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
        const { place, date, title, id } = data[i]
        const dateString = moment(Number(date)).format('DD/MM/YYYY')
        items.push(
          <CardItem
            title={title}
            detail={`${place} - ${dateString}`}
            link="/informations/actualites/agenda"
            id={id}
          />
        )
      }
    }
  }

  return (
    <NewsCard
      cardTitle={cardTitle}
      items={items}
      recipe={String(<DateRangeIcon />)}
    />
  )
}

export default NewsAgenda
