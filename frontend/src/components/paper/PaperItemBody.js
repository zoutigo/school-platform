import React from 'react'
import PropTypes from 'prop-types'

import { StyledPaperBody } from '../elements/styled'
import PaperPdfHandler from './PaperPdfHandler'
import PageScreen from '../elements/reactpage/PageScreen'

function PaperItemBody({ text, content, file, paper: { paperFormat } }) {
  return (
    <StyledPaperBody className="react-editor-read">
      {paperFormat === 'pdf' && <PaperPdfHandler file={file} />}

      {content && <PageScreen content={content} />}
    </StyledPaperBody>
  )
}
PaperItemBody.defaultProps = {
  text: null,
  file: null,
  content: null,
}

PaperItemBody.propTypes = {
  text: PropTypes.string,

  file: PropTypes.string,
  content: PropTypes.string,
  paper: PropTypes.shape({
    paperFormat: PropTypes.string,
  }).isRequired,
}
export default React.memo(PaperItemBody)
