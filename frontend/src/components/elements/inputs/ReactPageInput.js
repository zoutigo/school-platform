import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Controller, useController } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Editor, { useUiTranslator } from '@react-page/editor'
import slate from '@react-page/plugins-slate'
import image, { imagePlugin } from '@react-page/plugins-image'
import divider from '@react-page/plugins-divider'
import spacer from '@react-page/plugins-spacer'
import '@react-page/plugins-slate/lib/index.css'
import '@react-page/plugins-image/lib/index.css'
import '@react-page/editor/lib/index.css'

import { Grid, styled, Typography } from '@material-ui/core'

import cellSpacing from '../reactpage/constants'
import { apiPostEditorImage } from '../../../utils/api'
import AlertMessage from '../AlertMessage'

// import colorPlugin from './reactpage/colorPlugin'

// const cellSpacing = {
//   x: 15, // horizontal cell spacing
//   y: 20, // vertical cell spacing
// }
// const TRANSLATIONS = {
//   'Edit blocks': 'Editer le bloc',
//   'Add blocks': 'Ajouter un bloc',
//   'Move blocks': 'Deplacer les blocs',
//   'Resize blocks': 'Redimentionner les blocs',
//   'Preview blocks': 'Previsualiser les blocs',
// }

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
  padding: '0px 1rem',

  '& >div': {
    width: '100%',
  },
}))

function ReactPageInput({ control, name, defaultValue, label, ...rest }) {
  const { Token } = useSelector((state) => state.user)

  const uploadImage = useCallback(
    () => async (file, reportProgress) => {
      const data = await apiPostEditorImage({ file, Token })
      return { url: data.url }
    },
    []
  )

  const cellPlugins = [
    slate(),
    imagePlugin({
      imageUpload: uploadImage(),
    }),
    divider,
    spacer,
    // colorPlugin(),
  ]

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ? JSON.parse(defaultValue) : null,
    rules: {
      validate: {
        required: (val) =>
          (val && val.rows && val.rows.length > 0) ||
          'Veillez ajouter un texte ou une image',
      },
    },
  })

  //   const { ref, onChange, value, ...inputProps } = field

  return (
    <StyledGrid container>
      <Typography
        component="div"
        variant="label"
        style={{ fontSize: '0.8rem', marginBottom: '1rem' }}
      >
        {label}{' '}
      </Typography>

      <Controller
        {...rest}
        control={control}
        render={() => (
          <Editor
            {...field}
            cellPlugins={cellPlugins}
            cellSpacing={cellSpacing}
            lang="fr"
            onChange={(newvalue) => {
              // console.log(field.value)
              field.onChange(newvalue)
            }}

            // uiTranslator={useUiTranslator()}
          />
        )}
      />

      {invalid && <AlertMessage message={error.message} severity="error" />}
    </StyledGrid>
  )
}

ReactPageInput.defaultProps = {
  defaultValue: null,
}
ReactPageInput.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  defaultValue: PropTypes.string,
  label: PropTypes.string.isRequired,
}

export default React.memo(ReactPageInput)
