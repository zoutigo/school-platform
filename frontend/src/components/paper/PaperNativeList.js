/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react'
import { Grid, styled } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'

import PaperItem from './PaperItem'

import { setPaperFetchAlert } from '../../redux/alerts/AlertsActions'
import useFetchDispatch from '../elements/useFetchDispatch'

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
  const { queryKey, queryParams, fetcher } = paper
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    fetcher(queryParams)
  )

  useFetchDispatch(isLoading, isError, error, data, setPaperFetchAlert)

  return (
    <StyledGrid item container>
      {Array.isArray(data) &&
        data.map((paperItem, index) => {
          if (
            index === 0 &&
            !currentDocument &&
            paper.paperType !== 'fourniture'
          ) {
            setCurrentDocument(paperItem)
          }
          return (
            <PaperItem
              key={paperItem._id}
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
        })}
    </StyledGrid>
  )
}

PaperNativeList.propTypes = {
  paper: PropTypes.shape({
    queryKey: PropTypes.string.isRequired,
    queryParams: PropTypes.arrayOf(PropTypes.string),
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
  currentDocument: PropTypes.string.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.bool.isRequired,
}

export default PaperNativeList
