import { Grid, styled } from '@material-ui/core'
import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import PropTypes from 'prop-types'
import PageScreen from '../../elements/reactpage/PageScreen'
import { apiFecthEntities } from '../../../utils/api'
import useFetch from '../../hooks/useFetch'
import AlertMessage from '../../elements/AlertMessage'

const StyledClassroomContainer = styled(Grid)(() => ({
  padding: '1rem 0',
}))

function ClassroomSummary({ queryParams, queryKey, setCurrentClassroom }) {
  const { isLoading, isError, data, errorMessage } = useFetch(
    queryKey,
    queryParams,
    apiFecthEntities
  )

  useEffect(() => {
    if (data && data.datas && Array.isArray(data.datas)) {
      const [result] = data.datas
      setCurrentClassroom(result)
    }
  }, [data])

  const entities = data && Array.isArray(data.datas) ? data.datas : []
  if (!entities.length > 0) return null
  const [entity] = entities
  return (
    <StyledClassroomContainer item container className="react-editor-read">
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      {isLoading && <CircularProgress color="secondary" />}
      {entity && <PageScreen content={entity.content} />}
    </StyledClassroomContainer>
  )
}

ClassroomSummary.defaultProps = null

ClassroomSummary.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryParams: PropTypes.string.isRequired,
  setCurrentClassroom: PropTypes.func.isRequired,
  currentClassroom: PropTypes.shape({
    content: PropTypes.string,
  }),
}

export default React.memo(ClassroomSummary)
