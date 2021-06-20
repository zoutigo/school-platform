import { Grid, styled } from '@material-ui/core'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Document, Page, pdfjs } from 'react-pdf'

const StyledDocumentContainer = styled(Grid)(() => ({
  background: 'green',
  '& div': {
    // display: 'none',
    width: '100% !important',
    '& div': {
      // display: 'none',
      width: '100% !important',
      '& canvas': {
        // display: 'none !important',
        width: '100% !important',
        height: 'auto !important',
      },
    },
  },
}))

const StyledButtonContainer = styled(Grid)(() => ({}))

function PdfDocument({ file }) {
  const [totalPages, setTotalPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  React.useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
    /* To Prevent right click on screen */
    // document.addEventListener('contextmenu', (event) => {
    //   event.preventDefault()
    // })

    // return () => {
    //   /* To Prevent right click on screen */
    //   document.removeEventListener('contextmenu', (event) => {
    //     event.preventDefault()
    //   })
    // }
  }, [])

  function onDocumentLoadSuccess({ numPages }) {
    setTotalPages(numPages)
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  return (
    <Grid item container>
      <StyledDocumentContainer item xs={12}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </StyledDocumentContainer>
      <StyledButtonContainer item container xs={12}>
        <Grid item>
          Page
          {pageNumber || (totalPages ? 1 : '--')}
          -sur-
          {totalPages || '--'}
        </Grid>
        <Grid item>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="Pre"
          >
            Précédent
          </button>
          <button
            type="button"
            disabled={pageNumber >= totalPages}
            onClick={nextPage}
          >
            Suivant
          </button>
        </Grid>
      </StyledButtonContainer>
    </Grid>
  )
}

PdfDocument.defaultPropTypes = null
PdfDocument.propTypes = {
  file: PropTypes.string.isRequired,
}

export default PdfDocument
