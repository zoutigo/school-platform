import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Grid, Box, Typography, styled } from '@material-ui/core'

import { StyledPaperHeader } from '../elements/styled'

const StyledTypo = styled(Typography)(() => ({
  marginRight: '1rem',
  textTransform: 'capitalize',
}))

function PaperItemHeader({
  setCurrentDocument,
  paperItem,
  paper,
  currentDocumentId,
}) {
  const PaperItemHeaderTitle = ({ criteria }) => {
    switch (criteria) {
      case 'fourniture':
        return (
          <>
            <StyledTypo variant="body1">
              {`${paperItem.clientEntity.name}  `}
            </StyledTypo>
            <Typography variant="caption">
              {`Année Scolaire ${moment(paperItem.startdate).format(
                'YYYY'
              )}-${moment(paperItem.enddate).format('YYYY')}`}
            </Typography>
          </>
        )

      default:
        return (
          <Typography variant="body1">
            {paperItem ? paperItem.title : null}
          </Typography>
        )
    }
  }
  PaperItemHeaderTitle.defaultProps = null
  PaperItemHeaderTitle.propTypes = {
    criteria: PropTypes.string,
  }

  const handleClick = () => {
    if (currentDocumentId && currentDocumentId === paperItem._id) {
      setCurrentDocument(null)
    } else {
      setCurrentDocument(paperItem)
    }
  }
  return (
    <StyledPaperHeader item container onClick={handleClick}>
      <Grid item container>
        <PaperItemHeaderTitle criteria={paper.paperType} />
      </Grid>
      <Grid item container justify="space-between">
        <Box>
          {paper.paperType === 'event' && (
            <>
              <Typography variant="caption">
                Date: &nbsp;&nbsp;
                {moment(paperItem ? paperItem.date : null).format('DD/MM/YYYY')}
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Typography variant="caption">
                Lieu:&nbsp;&nbsp;&nbsp; {paperItem ? paperItem.place : null}
              </Typography>
            </>
          )}
          {paper.paperType === 'activite' && (
            <Typography variant="caption">
              {moment(paperItem ? paperItem.date : null).format('DD/MM/YYYY')}
            </Typography>
          )}
        </Box>
        <Box>
          <StyledTypo variant="caption">
            {paperItem ? paperItem.entity.name : null}
          </StyledTypo>
        </Box>
      </Grid>
    </StyledPaperHeader>
  )
}
PaperItemHeader.defaultProps = {
  currentDocumentId: null,
}
PaperItemHeader.propTypes = {
  setCurrentDocument: PropTypes.func.isRequired,
  paper: PropTypes.shape({
    paperType: PropTypes.string,
  }).isRequired,
  currentDocumentId: PropTypes.string,
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    place: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.number,
    startdate: PropTypes.number,
    enddate: PropTypes.number,
    entity: PropTypes.shape({
      name: PropTypes.string,
    }),
    clientEntity: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdat: PropTypes.number,
  }).isRequired,
}

export default PaperItemHeader
