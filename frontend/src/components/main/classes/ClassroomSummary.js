import { Grid, styled } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import PropTypes from 'prop-types'
import PageScreen from '../../elements/reactpage/PageScreen'
import { apiFecthEntity } from '../../../utils/api'
import useFetchDispatch from '../../elements/useFetchDispatch'
import { setFetchAlert } from '../../../redux/alerts/AlertsActions'

const StyledClassroomContainer = styled(Grid)(() => ({
  padding: '1rem 0',
}))

function ClassroomSummary({ queryParams, queryKey, setCurrentClassroom }) {
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFecthEntity(queryParams)
  )

  useFetchDispatch(isLoading, isError, error, data, setFetchAlert)

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const [result] = data
      setCurrentClassroom(result)
    }
  }, [data])

  return (
    <StyledClassroomContainer item container className="react-editor-read">
      {data && Array.isArray(data) && <PageScreen content={data[0].content} />}
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
