import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import PaperFormActivite from './PaperFormActivite'
import PaperFormPDF from './PaperFormPDF'
import PaperFormEvent from './PaperFormEvent'

function PaperForm({
  currentDocument,
  setCurrentDocument,
  setShowTooltip,
  setFormAction,
  formAction,
  setShowPaperList,
  setShowPaperForm,
  paper,
}) {
  const { paperType } = paper
  return (
    <Grid item container justify="center">
      {paperType === 'activite' && (
        <PaperFormActivite
          setCurrentDocument={setCurrentDocument}
          currentDocument={currentDocument}
          setShowTooltip={setShowTooltip}
          setFormAction={setFormAction}
          formAction={formAction}
          setShowPaperList={setShowPaperList}
          setShowPaperForm={setShowPaperForm}
          paper={paper}
        />
      )}
      {(paperType === 'menu' ||
        paperType === 'fourniture' ||
        paperType === 'breve' ||
        paperType === 'newsletter') && (
        <PaperFormPDF
          setCurrentDocument={setCurrentDocument}
          currentDocument={currentDocument}
          setShowTooltip={setShowTooltip}
          setFormAction={setFormAction}
          formAction={formAction}
          setShowPaperList={setShowPaperList}
          setShowPaperForm={setShowPaperForm}
          paper={paper}
        />
      )}

      {paperType === 'event' && (
        <PaperFormEvent
          setCurrentDocument={setCurrentDocument}
          currentDocument={currentDocument}
          setShowTooltip={setShowTooltip}
          setFormAction={setFormAction}
          formAction={formAction}
          setShowPaperList={setShowPaperList}
          setShowPaperForm={setShowPaperForm}
          paper={paper}
        />
      )}
    </Grid>
  )
}

PaperForm.propTypes = {
  paper: PropTypes.shape({
    queryParams: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string),
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  setShowPaperForm: PropTypes.func.isRequired,
  setShowPaperList: PropTypes.func.isRequired,
  setCurrentDocument: PropTypes.func.isRequired,
  currentDocument: PropTypes.string.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShowTooltip: PropTypes.func.isRequired,
  formAction: PropTypes.string.isRequired,
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.string,
    createdat: PropTypes.number,
  }).isRequired,
}

export default PaperForm
