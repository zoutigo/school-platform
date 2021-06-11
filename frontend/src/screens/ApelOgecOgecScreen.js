import { Grid, styled } from '@material-ui/core'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { apiFecthPage } from '../utils/api'
import PageForm from '../components/elements/PageForm'
import { useCurrentCategory } from '../utils/hooks'
import OGECTEAM from '../constants/ogecteam'

import { setCategoryAside } from '../redux/settings/SettingsActions'

const StyledPageDiv = styled('div')(() => ({
  width: '100%',
}))

function ApelOgecOgecScreen() {
  const dispatch = useDispatch()
  const { path: categoryPath } = useCurrentCategory()
  const [showform, setShowform] = useState(false)
  const pageName = 'ogec'
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

  // build ogecaside
  const asideOgec = {
    title: 'Bureau Ogec',
    items: OGECTEAM.map((teamer) => {
      const { role, gender, firstname, lastname } = teamer
      return {
        subtitle: role,
        user: { gender, firstname, lastname },
      }
    }),
  }
  dispatch(setCategoryAside([categoryPath, asideOgec]))

  return (
    <Grid container>
      {showform ? (
        <PageForm id={id} text={text} setShowform={setShowform} />
      ) : (
        <StyledPageDiv>{textcontent}</StyledPageDiv>
      )}
    </Grid>
  )
}

export default ApelOgecOgecScreen
