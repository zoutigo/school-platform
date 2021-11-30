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
      return `/viescolaire/cantine/albums`
    case 'pastorale':
      return `/viescolaire/pastorale/albums`
    case 'ps':
      return `/classes/petite-section/albums`
    case 'ms':
      return `/classes/moyenne-section/albums`
    case 'gs':
      return `/classes/grande-section/albums`
    case 'cp':
      return `/classes/cp/albums`
    case 'ce1':
      return `/classes/ce1/albums`
    case 'ce2':
      return `/classes/ce2/albums`
    case 'cm1':
      return `/classes/cm1/albums`
    case 'cm2':
      return `/classes/cm2/albums`
    case 'adaptation':
      return `/classes/adaptation/albums`
    case 'apel':
      return `/apelogec/apel/albums`
    case 'ogec':
      return `/apelogec/ogec/albums`

    default:
      return `/informations/actualites`
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
