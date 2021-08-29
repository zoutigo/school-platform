import React from 'react'
import PropTypes from 'prop-types'

import { StyledPaperBody } from '../elements/styled'
import PaperPdfHandler from './PaperPdfHandler'
import PageScreen from '../elements/reactpage/PageScreen'

function PaperItemBody({ content, files, paper: { paperFormat } }) {
  return (
    <StyledPaperBody className="react-editor-read">
      {paperFormat === 'pdf' && <PaperPdfHandler files={files} />}

      {content && <PageScreen content={content} />}
    </StyledPaperBody>
  )
}
PaperItemBody.defaultProps = {
  files: [],
  content: null,
}

PaperItemBody.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string,
      filepath: PropTypes.string,
    })
  ),
  content: PropTypes.string,
  paper: PropTypes.shape({
    paperFormat: PropTypes.string,
  }).isRequired,
}
export default React.memo(PaperItemBody)
