import React from 'react'
import moment from 'moment'
import DateRangeIcon from '@material-ui/icons/DateRange'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import { apiFetchAlbum } from '../../../../utils/api'
import useFetch from '../../../hooks/useFetch'
import capitilize from '../../../../utils/capitilize'

const albumLink = (album) => {
  switch (album.entity.alias) {
    case 'cantine':
      return `/cantine/albums`
    case 'pastorale':
      return `/pastorale/albums`
    case 'ps':
      return `/petite-section/albums`
    case 'ms':
      return `/moyenne-section/albums`
    case 'gs':
      return `/grande-section/albums`

    default:
      return `/${album.entity.alias}/albums`
  }
}

function NewsAlbums() {
  const cardTitle = 'Nouveaux Albums'

  const queryKey = ['albums']
  const queryParams = ''

  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFetchAlbum
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
        const { entity, name, id, createdAt } = data[i]
        const dateString = moment(createdAt).format('DD/MM/YYYY')

        items.push(
          <CardItem
            title={name}
            detail={`${capitilize(entity.name)} - ${dateString}`}
            link={albumLink(data[i])}
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

export default NewsAlbums
