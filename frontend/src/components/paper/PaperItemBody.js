import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

import { StyledPaperBody } from '../elements/styled'
import PaperPdfHandler from './PaperPdfHandler'
import PageScreen from '../elements/reactpage/PageScreen'

function PaperItemBody({ text, content, file, paper: { paperFormat } }) {
  return (
    <StyledPaperBody>
      {paperFormat === 'pdf' && <PaperPdfHandler file={file} />}
      {/* {paperFormat === 'html' &&
        text &&
        (ReactHtmlParser(text) || "il n'y a pas plus de détails")} */}
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
