/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useCallback } from 'react'
import { Grid, styled, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'

import PropTypes from 'prop-types'
import PaperItem from './PaperItem'

import theme from '../../constants/theme'
import useFetch from '../hooks/useFetch'
import AlertMessage from '../elements/AlertMessage'
import useRigths from '../hooks/useRigths'

const StyledGrid = styled(Grid)(() => ({
  padding: '0.5rem 0',
}))

function PaperNativeList({
  paper,
  setShowPaperForm,
  setShowPaperList,
  setCurrentDocument,
  currentDocument,
  setFormAction,
  setShowSearch,
}) {
  const { userLevel } = useRigths()
  const { queryKey, queryParams, fetcher } = paper

  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    fetcher
  )

  const papers = data ? data.data.datas : null

  // filter private datas
  const filteredPapers = useCallback(() => {
    if (!papers || !Array.isArray(papers)) return []
    if (userLevel) {
      return papers
    }

    const result = papers.filter((pack) => pack.isPrivate !== true)
    return result
  }, [papers, userLevel])

  const Screen = React.memo(() =>
    filteredPapers().length > 0 ? (
      filteredPapers().map((paperItem, index) => {
        if (
          index === 0 &&
          !currentDocument &&
          paper.paperType !== 'fourniture'
        ) {
          setCurrentDocument(paperItem)
        }
        return (
          <PaperItem
            key={paperItem.uuid}
            paper={paper}
            setShowPaperForm={setShowPaperForm}
            setShowPaperList={setShowPaperList}
            setCurrentDocument={setCurrentDocument}
            currentDocument={currentDocument}
            setFormAction={setFormAction}
            setShowSearch={setShowSearch}
            paperItem={paperItem}
          />
        )
      })
    ) : (
      <Grid
        item
        container
        justifyContent="center"
        style={{ background: theme.palette.error.light }}
      >
        <Typography variant="h4">
          {userLevel
            ? 'Rien de nouveau'
            : ' Rien de nouveau actuellement pour le public'}
        </Typography>
      </Grid>
    )
  )

  return (
    <StyledGrid item container>
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {data && <Screen />}
    </StyledGrid>
  )
}

PaperNativeList.defaultProps = {
  currentDocument: null,
}

PaperNativeList.propTypes = {
  paper: PropTypes.shape({
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string,
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
    fetcher: PropTypes.func.isRequired,
  }).isRequired,
  setShowPaperForm: PropTypes.func.isRequired,
  setShowPaperList: PropTypes.func.isRequired,
  setCurrentDocument: PropTypes.func.isRequired,
  currentDocument: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.func.isRequired,
}

export default React.memo(PaperNativeList)
