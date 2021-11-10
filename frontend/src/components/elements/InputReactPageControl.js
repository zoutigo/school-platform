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

import { Grid, styled, TextField } from '@material-ui/core'
import AlertCollapse from './AlertCollapse'
import TRANSLATIONS from './reactpage/constants'
import cellSpacing from './reactpage/constants'
import { apiPostEditorImage } from '../../utils/api'
import AlertMessage from './AlertMessage'
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
const StyledTextField = styled(TextField)(({ theme }) => ({
  padding: '1rem 0.5rem',
  '& >div': {
    width: '100%',
  },
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
    defaultValue: initialValue ? JSON.parse(initialValue) : null,
    rules: { required: false },
  })

  const { ref, onChange, value, ...inputProps } = field

  return (
    <StyledGrid container>
      <Grid item container className="controller">
        <Controller
          {...rest}
          control={control}
          // rules={{
          //   required: "le nombre d'élèves est obligatoire",
          //   maxLength: {
          //     value: 5,
          //     message: "le nombre d'élèves doit avoir au plus 5 caractères",
          //   },
          //   validate: {
          //     number: (val) =>
          //       Number.isInteger(val) ||
          //       "le nombre d'élèves doit etre un nombre entier",
          //   },
          //   max: {
          //     value: 20000,
          //     message: "le nombre d'élèves doit etre inférieur à 20000",
          //   },
          // }}
          // rules={{
          //   validate: {
          //     mandatory: (val) =>
          //       (val && val.rows && val.rows.length > 0) ||
          //       'Veillez ajouter un texte ou une image',
          //   },
          // }}
          render={() => (
            <Editor
              {...field}
              cellPlugins={cellPlugins}
              cellSpacing={cellSpacing}
              lang="fr"
              onChange={(newvalue) => {
                field.onChange(newvalue)
              }}

              // uiTranslator={useUiTranslator()}
            />
          )}
        />
        {error && <AlertMessage message={error.message} severity="error" />}
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
