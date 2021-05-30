import React from 'react'
import moment from 'moment'
import DateRangeIcon from '@material-ui/icons/DateRange'
import { useQuery } from 'react-query'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import { apiFetchEvents } from '../../../../utils/api'

function NewsAgenda() {
  const cardTitle = 'Agenda à venir'

  const queryKey = ['events']
  const queryParams = ''

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchEvents(queryParams)
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
        const { place, date, title } = data[i]
        const dateString = moment(date).format('DD/MM/YYYY')
        items.push(
          <CardItem title={title} detail={`${place} - ${dateString}`} />
        )
      }
    }
  }

  return (
    <NewsCard cardTitle={cardTitle} items={items} recipe={<DateRangeIcon />} />
  )
}

export default NewsAgenda
