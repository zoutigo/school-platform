import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'
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
  const { palette } = useTheme()
  const PaperItemHeaderTitle = ({ criteria }) => {
    switch (criteria) {
      case 'fourniture':
        return (
          <>
            <StyledTypo variant="body1">
              {`${paperItem.classe_fourniture}  `}
            </StyledTypo>
            <Typography variant="caption">
              {`Année Scolaire ${moment(Number(paperItem.startdate)).format(
                'YYYY'
              )}-${moment(Number(paperItem.enddate)).format('YYYY')}`}
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

  const headerColor = useCallback((alias) => {
    switch (alias) {
      case 'cantine':
      case 'pastorale':
        return palette.viescolaire.ligth
      case 'ps':
      case 'ms':
      case 'gs':
      case 'cp':
      case 'ce1':
      case 'ce2':
      case 'cm1':
      case 'cm2':
      case 'adaptation':
        return palette.classes.ligth
      case 'apel':
      case 'ogec':
        return palette.apelogec.ligth

      default:
        return palette.ecole.ligth
    }
  }, [])

  const handleClick = () => {
    if (currentDocumentId && currentDocumentId === paperItem.id) {
      setCurrentDocument(null)
    } else {
      setCurrentDocument(paperItem)
    }
  }

  return (
    <StyledPaperHeader
      item
      container
      onClick={handleClick}
      bgcolor={
        paper.paperType === 'activite'
          ? headerColor(paperItem.entity.alias)
          : null
      }
    >
      <Grid item container>
        <PaperItemHeaderTitle criteria={paper.paperType} />
      </Grid>
      <Grid item container justify="space-between">
        <Box>
          {paper.paperType === 'event' && (
            <>
              <Typography variant="caption">
                Date: &nbsp;&nbsp;
                {moment(Number(paperItem ? paperItem.date : null)).format(
                  'DD/MM/YYYY'
                )}
              </Typography>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Typography variant="caption">
                Lieu:&nbsp;&nbsp;&nbsp; {paperItem ? paperItem.place : null}
              </Typography>
            </>
          )}
          {paper.paperType === 'activite' && (
            <Typography variant="caption">
              {moment(Number(paperItem ? paperItem.date : null)).format(
                'DD/MM/YYYY'
              )}
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
  currentDocumentId: PropTypes.number,
  paperItem: PropTypes.shape({
    id: PropTypes.number,
    place: PropTypes.string,
    text: PropTypes.string,
    name: PropTypes.string,
    classe_fourniture: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.number,
    startdate: PropTypes.string,
    enddate: PropTypes.string,
    entity: PropTypes.shape({
      name: PropTypes.string,
      alias: PropTypes.string,
    }),
    clientEntity: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdat: PropTypes.number,
  }).isRequired,
}

export default React.memo(PaperItemHeader)
