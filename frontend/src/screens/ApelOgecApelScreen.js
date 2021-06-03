import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

import { useQuery } from 'react-query'
import PageForm from '../components/elements/PageForm'

import { apiFecthPage } from '../utils/api'

const StyledPageDiv = styled('div')(() => ({
  width: '100%',
}))

function ApelOgecApelScreen() {
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

export default ApelOgecApelScreen
