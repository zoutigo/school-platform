import React, { useCallback, useEffect } from 'react'
import { Grid, styled, useTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import PaperFormActivite from './PaperFormActivite'
import PaperFormPDF from './PaperFormPDF'
import PaperFormEvent from './PaperFormEvent'
import CustomButton from '../elements/CustomButton'
import Title from '../elements/Title'

const StyledHeaderGrid = styled(Grid)(({ theme }) => ({
  padding: '0 1rem',
  background: theme.palette.secondary.main,
}))

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
  const theme = useTheme()
  const { paperType } = paper

  const formTitle = useCallback(
    formAction === 'update'
      ? `Modification ${paper.paperType}`
      : `Ajout ${paper.paperType}`,
    [formAction, paper]
  )
  const handleBack = useCallback(() => {
    setCurrentDocument(null)
    setShowTooltip(true)
    setShowPaperList(true)
    setShowPaperForm(false)
    setFormAction(null)
  }, [])

  const isPrivateDefaultValue = useCallback(() => {
    if (formAction === 'create') return 'oui'
    if (currentDocument?.isPrivate) return 'oui'
    return 'non'
  }, [formAction, currentDocument])

  const isPrivateOptions = useCallback(
    [
      { labelOption: 'Oui', optionvalue: 'oui' },
      { labelOption: 'Non', optionvalue: 'non' },
    ],
    []
  )

  const isPrivateDatas = {
    isPrivateOptions: isPrivateOptions,
    isPrivateDefaultValue: isPrivateDefaultValue(),
  }

  useEffect(() => {
    setShowTooltip(false)
    return () => {
      handleBack()
    }
  }, [currentDocument])

  return (
    <Grid item container justify="center">
      <StyledHeaderGrid item container alignItems="center">
        <Grid item xs={9} style={{ textAlign: 'center' }}>
          <Title title={formTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid item xs={3}>
          <CustomButton
            text="Annuler"
            width="100%"
            bgcolor={theme.palette.warning.main}
            action="back"
            onClick={handleBack}
          />
        </Grid>
      </StyledHeaderGrid>
      {paperType === 'activite' ||
        (paperType === 'parent-info' && (
          <PaperFormActivite
            setCurrentDocument={setCurrentDocument}
            currentDocument={currentDocument}
            setShowTooltip={setShowTooltip}
            setFormAction={setFormAction}
            formAction={formAction}
            setShowPaperList={setShowPaperList}
            setShowPaperForm={setShowPaperForm}
            paper={paper}
            handleBack={handleBack}
            isPrivateDatas={isPrivateDatas}
          />
        ))}
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
          handleBack={handleBack}
          isPrivateDatas={isPrivateDatas}
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
          handleBack={handleBack}
          isPrivateDatas={isPrivateDatas}
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
  setFormAction: PropTypes.func.isRequired,
  setShowTooltip: PropTypes.func.isRequired,
  formAction: PropTypes.string.isRequired,
  currentDocument: PropTypes.shape({
    _id: PropTypes.string,
    isPrivate: PropTypes.bool,
  }).isRequired,
}

export default React.memo(PaperForm)
