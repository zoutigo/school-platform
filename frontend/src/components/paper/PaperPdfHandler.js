import React from 'react'
import PropTypes from 'prop-types'
import { Grid, styled } from '@material-ui/core'
import PdfDocument from '../elements/PdfDocument'

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& >:first-child': {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function PaperPdfHandler({ file }) {
  return (
    <StyledGrid item container>
      <Grid item container>
        <PdfDocument file={file} />
      </Grid>
    </StyledGrid>
  )
}

PaperPdfHandler.propTypes = {
  file: PropTypes.string.isRequired,
}

export default PaperPdfHandler
