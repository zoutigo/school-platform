import { Grid, styled } from '@material-ui/core'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import ReactHtmlParser from 'react-html-parser'
import { apiFecthPage } from '../../../utils/api'
import PageForm from '../../elements/PageForm'
import { useRigths } from '../../../utils/hooks'

const StyledPageDiv = styled('div')(() => ({
  width: '100%',
}))

function Histoire() {
  const [showform, setShowform] = useState(false)
  const pageName = 'histoire'
  const queryKey = [pageName, { alias: pageName }]
  const queryParams = `alias=${pageName}`

  const { moderatorLevel } = useRigths()
  const isAllowedToChange = moderatorLevel

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

export default Histoire
