import React from 'react'
import moment from 'moment'
import DateRangeIcon from '@material-ui/icons/DateRange'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import { apiFetchEvents, apiFetchPaper } from '../../../../utils/api'
import useFetch from '../../../hooks/useFetch'

function NewsAgenda() {
  const cardTitle = 'Agenda à venir'

  const queryKey = ['events']
  const queryParams = `type=event`

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

  const papers =
    data.data?.datas.sort((a, b) => new Date(b.date) - new Date(a.date)) || []

  if (!Array.isArray(papers)) {
    return null
  }

  const items = []

  if (papers && papers.length > 0) {
    for (let i = 0; i < 3; i += 1) {
      if (papers[i]) {
        const { place, date, title } = papers[i]
        const dateString = moment(date).format('DD/MM/YYYY')
        items.push(
          <CardItem
            title={title}
            detail={`${place} - ${dateString}`}
            link="/informations/actualites/agenda"
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
