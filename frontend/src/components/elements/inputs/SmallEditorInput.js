import { Editor } from '@tinymce/tinymce-react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useController } from 'react-hook-form'
import tinyMceSmallEditorParams from '../../../constants/tinyMceSmallEditorParams'
import { apiFetchVariables } from '../../../utils/api'
import useFetch from '../../hooks/useFetch'
import AlertMessage from '../AlertMessage'

function SmallEditorInput({ name, control, rules, defaultValue, label }) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue,
  })

  const tinyQueryParams = ''
  const tinyQueryKey = ['TinyPageKey']

  const { isLoading, isError, data, errorMessage } = useFetch(
    tinyQueryKey,
    tinyQueryParams,
    apiFetchVariables
  )
  if (!data) return null
  return (
    <Grid container>
      {isLoading && <CircularProgress color="secondary" />}
      {isError && <AlertMessage severity="error" message={errorMessage} />}
      <Grid item container>
        <Typography color="secondary">{label}</Typography>
      </Grid>
      <Editor
        value={field.value}
        onEditorChange={(editor) => field.onChange(editor)}
        apiKey={data.TINYMCE_KEY.toString()}
        init={tinyMceSmallEditorParams}
      />

      {invalid && <AlertMessage severity="error" message={error.message} />}
    </Grid>
  )
}

SmallEditorInput.defaultProps = {
  defaultValue: null,
  rules: { fake: true },
}
SmallEditorInput.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  defaultValue: PropTypes.string,
  rules: PropTypes.shape({
    fake: PropTypes.bool,
  }),

  label: PropTypes.string.isRequired,
}

export default SmallEditorInput
