import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Editor from '@react-page/editor'
import slate from '@react-page/plugins-slate'
import image from '@react-page/plugins-image'

import '@react-page/plugins-slate/lib/index.css'
import '@react-page/plugins-image/lib/index.css'
import cellSpacing from './constants'

const cellPlugins = [slate(), image]

function PageScreen({ content }) {
  const value = useCallback(JSON.parse(content), [])

  return (
    <Editor
      cellPlugins={cellPlugins}
      value={value}
      readOnly
      lang="fr"
      cellSpacing={cellSpacing}
    />
  )
}

PageScreen.propTypes = {
  content: PropTypes.string.isRequired,
}

export default React.memo(PageScreen)
