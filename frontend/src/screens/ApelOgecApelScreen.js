import { Grid } from '@material-ui/core'
import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import PageForm from '../components/elements/PageForm'
import APELTEAM from '../constants/apelteam'
import { setCategoryAside } from '../redux/settings/SettingsActions'

import { apiFecthPage } from '../utils/api'
import { useCurrentCategory } from '../utils/hooks'

function ApelOgecApelScreen() {
  const dispatch = useDispatch()
  const { path: categoryPath } = useCurrentCategory()
  const [showform, setShowform] = useState(false)
  const pageName = 'apel'
  const queryKey = [pageName, { alias: pageName }]
  const queryParams = `alias=${pageName}`

  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthPage(queryParams)
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

  const [page] = data
  const { _id: id, text } = page
  const textcontent = ReactHtmlParser(text) || "il n'y a pas plus de détails"

  // build apel aside
  const asideApel = {
    title: 'Bureau Apel',
    items: APELTEAM.map((teamer) => {
      const { role, gender, firstname, lastname } = teamer
      return {
        subtitle: role,
        user: { gender, firstname, lastname },
      }
    }),
  }
  dispatch(setCategoryAside([categoryPath, asideApel]))

  return (
    <Grid container>
      {showform ? (
        <PageForm id={id} text={text} setShowform={setShowform} />
      ) : (
        <Grid item container>
          {' '}
          {textcontent}{' '}
        </Grid>
      )}
    </Grid>
  )
}

export default ApelOgecApelScreen
