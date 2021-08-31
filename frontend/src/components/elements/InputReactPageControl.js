import React, { useCallback, useState } from 'react'
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

import { Grid, styled } from '@material-ui/core'
import AlertCollapse from './AlertCollapse'
import TRANSLATIONS from './reactpage/constants'
import cellSpacing from './reactpage/constants'
import { apiPostEditorImage } from '../../utils/api'
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
  '& .controller': {
    '& >div': {
      width: '100%',
    },
  },
}))
const StyledLabel = styled(Grid)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '0.8rem',
  margin: '1rem 0px',
}))

function InputReactPageControl({
  control,
  name,
  height,
  initialValue,
  label: formlabel,
  ...rest
}) {
  const { Token } = useSelector((state) => state.user)

  const [editorValue, setEditorValue] = useState(
    initialValue ? JSON.parse(initialValue) : null
  )

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
    fieldState: { invalid, error: formerror },
  } = useController({
    name,
    control,
    defaultValue: initialValue,
    rules: { required: false },
  })

  const { ref, onChange, value, ...inputProps } = field

  const handleChange = (data) => {
    setEditorValue(data)
    onChange(data)
  }
  return (
    <StyledGrid container>
      <Grid item container>
        <AlertCollapse {...alert} />
      </Grid>
      <StyledLabel item> {formlabel}</StyledLabel>
      <Grid item container className="controller">
        <Controller
          {...rest}
          control={control}
          defaultValue={initialValue}
          render={() => (
            <Editor
              cellPlugins={cellPlugins}
              value={editorValue}
              cellSpacing={cellSpacing}
              lang="fr"
              onChange={(newvalue) => handleChange(newvalue)}
              // cellSpacing={cellSpacing}
              // uiTranslator={useUiTranslator()}
            />
          )}
        />
      </Grid>
    </StyledGrid>
  )
}

InputReactPageControl.defaultProps = {
  initialValue: null,
  height: 300,
}
InputReactPageControl.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  initialValue: PropTypes.string,
  height: PropTypes.number,
  label: PropTypes.string.isRequired,
}

export default React.memo(InputReactPageControl)
