/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useCallback } from 'react'
import { Grid, styled } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'

import PaperItem from './PaperItem'

import { setPaperFetchAlert } from '../../redux/alerts/AlertsActions'
import useFetchDispatch from '../elements/useFetchDispatch'
import { useRigths } from '../../utils/hooks'

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
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    fetcher(queryParams)
  )

  // hook to dispatch alerts
  useFetchDispatch(isLoading, isError, error, data, setPaperFetchAlert)

  // filter private datas
  const filteredPapers = useCallback(() => {
    if (!data || !Array.isArray(data)) return null
    if (userLevel) {
      return data
    }
    const result = data.filter((pack) => pack.isPrivate !== true)
    return result
  }, [data, userLevel])

  return (
    <StyledGrid item container>
      {filteredPapers() &&
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

PaperNativeList.defaultProps = {
  currentDocument: null,
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
  currentDocument: PropTypes.shape({
    _id: PropTypes.string,
  }),
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.func.isRequired,
}

export default React.memo(PaperNativeList)
