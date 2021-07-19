import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

import { StyledPaperBody } from '../elements/styled'
import PaperPdfHandler from './PaperPdfHandler'

function PaperItemBody({ text, file, paper: { paperFormat } }) {
  return (
    <StyledPaperBody>
      {paperFormat === 'pdf' && <PaperPdfHandler file={file} />}
      {paperFormat === 'html' &&
        (ReactHtmlParser(text) || "il n'y a pas plus de détails")}
    </StyledPaperBody>
  )
}
PaperItemBody.defaultProps = {
  text: null,
  file: null,
}

PaperItemBody.propTypes = {
  text: PropTypes.string,

  file: PropTypes.string,

  paper: PropTypes.shape({
    paperFormat: PropTypes.string,
  }).isRequired,
}
export default PaperItemBody
