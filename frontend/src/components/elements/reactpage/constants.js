import slate from '@react-page/plugins-slate'
import image, { imagePlugin, imageUpload } from '@react-page/plugins-image'
import { useCallback } from 'react'

const TRANSLATIONS = {
  'Edit blocks': 'Editer le bloc',
  'Add blocks': 'Ajouter un bloc',
  'Move blocks': 'Deplacer les blocs',
  'Resize blocks': 'Redimentionner les blocs',
  'Preview blocks': 'Previsualiser les blocs',
}

const cellSpacing = {
  x: 25, // horizontal cell spacing
  y: 25, // vertical cell spacing
}

const useUiTranslator = () => {
  const translator = useCallback(
    (label = undefined) => {
      if (TRANSLATIONS[label] !== undefined) {
        return TRANSLATIONS[label]
      }
      return `${label}(to translate)`
    },
    [TRANSLATIONS]
  )

  return translator
}

function uploadImage(defaultUrl) {
  return function (file, reportProgress) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ url: defaultUrl })
      }, 2000)
    })
  }
}

const formPlugings = [
  slate(),
  imagePlugin({
    imageUpload: uploadImage(
      'https://upload.wikimedia.org/wikipedia/commons/a/a8/Derbys_Peter_Pan_peanut_butter_sample_blikje%2C_foto3.JPG'
    ),
  }),
]

export default () => ({
  TRANSLATIONS,
  cellSpacing,
  useUiTranslator,
  formPlugings,
})
