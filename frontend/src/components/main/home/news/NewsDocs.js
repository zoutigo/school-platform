import React, { useCallback } from 'react'
import moment from 'moment'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CardItem from './card/CardItem'
import NewsCard from './card/NewsCard'
import useFetch from '../../../hooks/useFetch'
import { apiFetchPaper } from '../../../../utils/api'

function NewsDocs() {
  const cardTitle = 'Documents récents'
  const today = new Date().valueOf()

  const menuQueryKey = ['menu-hebdomadaire']
  const menuQueryParams = `type=menu&entityAlias=cantine`

  const newsLetterQueryKey = ['newletter-mensuelle']
  const newsLetterQueryParams = `type=newsletter&entityAlias=direction`

  const fournituresQueryKey = ['informations-fournitures']
  const fournituresQueryParams = `type=fourniture&entityAlias=secretariat`

  const { data: menus } = useFetch(menuQueryKey, menuQueryParams, apiFetchPaper)
  const { data: newsletters } = useFetch(
    newsLetterQueryKey,
    newsLetterQueryParams,
    apiFetchPaper
  )
  const { data: fournitures } = useFetch(
    fournituresQueryKey,
    fournituresQueryParams,
    apiFetchPaper
  )

  const currentMenu = useCallback(
    menus && Array.isArray(menus) && menus.length > 0
      ? menus.find((menu) => menu.startdate < today && today < menu.enddate)
      : null,
    [menus]
  )

  const currentNewsletter = useCallback(
    newsletters && Array.isArray(newsletters) && newsletters.length > 0
      ? newsletters[0]
      : null,
    [newsletters]
  )
  const currentFourniture = useCallback(
    fournitures && Array.isArray(fournitures) && fournitures.length > 0
      ? fournitures[0]
      : null,
    [fournitures]
  )

  const documents = [
    <CardItem
      title="Menu hebdomadaire"
      detail={
        currentMenu
          ? `Du ${moment(Number(currentMenu.startdate)).format(
              'Do MMM YYYY'
            )} au ${moment(Number(currentMenu.enddate)).format('Do MMM YYYY')}`
          : 'Pas de menu disponible'
      }
      link="/viescolaire/cantine/menus"
    />,
    <CardItem
      title="Newsletter mensuelle"
      detail={
        currentNewsletter
          ? `${moment(Number(currentNewsletter.date)).format('MMMM YYYY')}`
          : 'Pas de newsletter disponible'
      }
      link="/informations/actualites/newsletter"
    />,
    <CardItem
      title="Fournitures scolaires"
      detail={
        currentFourniture
          ? `De ${moment(Number(currentFourniture.startdate)).format(
              'MMMM YYYY'
            )} à ${moment(Number(currentFourniture.enddate)).format(
              'MMMM YYYY'
            )}`
          : 'Pas de liste de fournitures disponible'
      }
      link="/informations/fournitures"
    />,
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
