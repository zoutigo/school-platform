import React from 'react'
import PropTypes from 'prop-types'
import { Grid, styled } from '@material-ui/core'
import PdfDocument from '../elements/PdfDocument'
import fileProptypes from '../../constants/proytypes/fileProptypes'

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& >:first-child': {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

function PaperPdfHandler({ files }) {
  return (
    <StyledGrid item container>
      <Grid item container>
        {files &&
          files.map((file) => (
            <PdfDocument file={file.filepath} key={file.filepath} />
          ))}
      </Grid>
    </StyledGrid>
  )
}

PaperPdfHandler.defaultProps = null

PaperPdfHandler.propTypes = {
  files: PropTypes.arrayOf(fileProptypes),
}

export default PaperPdfHandler
