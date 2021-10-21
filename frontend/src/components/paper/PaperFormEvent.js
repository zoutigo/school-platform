/* eslint-disable import/named */
import { useSnackbar } from 'notistack'
import { styled, Grid, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import InputTextControl from '../elements/InputTextControl'
import paperActiviteSchema from '../../schemas/paperActiviteSchema'
import CostumButton from '../elements/CustomButton'
import DatePickerControl from '../elements/DatePickerControl'
import InputReactPageControl from '../elements/InputReactPageControl'
import InputRadio from '../elements/InputRadio'
import useMutate from '../hooks/useMutate'
import MutateCircularProgress from '../elements/MutateCircularProgress'
import getError from '../../utils/error'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))

function PaperFormEvent({
  currentDocument,
  formAction,
  paper,
  handleBack,
  isPrivateDatas,
}) {
  const theme = useTheme()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync, isMutating } = useMutate(paper.queryKey, paper.poster)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(paperActiviteSchema),
  })

  const onSubmit = async (datas) => {
    const { title, content, date, place, isPrivate } = datas
    const finalDatas = {
      title,
      date: date.valueOf(),
      place,
      isPrivate: isPrivate === 'oui',
      content: JSON.stringify(content),
      entityAlias: paper.entityAlias,
    }

    closeSnackbar()

    try {
      await mutateAsync({
        id: currentDocument ? currentDocument.id : null,
        action: formAction,
        Token: Token,
        body: finalDatas,
      }).then((response) => {
        enqueueSnackbar(response.message, { variant: 'success' })
        handleBack()
        window.scrollTo(0, 0)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  if (!currentDocument && formAction === 'update') return null

  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      {isMutating && <MutateCircularProgress />}
      <Grid container className="form-fields-container">
        <InputTextControl
          name="title"
          control={control}
          initialValue={
            currentDocument && formAction === 'update'
              ? currentDocument.title
              : 'Ecole Saint Augustin'
          }
          helperText="au moins 10 caractères"
          label="Titre"
          width="100%"
        />

        <InputTextControl
          name="place"
          control={control}
          initialValue={
            currentDocument && formAction === 'update'
              ? currentDocument.place
              : 'Ecole Saint Augustin'
          }
          helperText="au moins 10 caractères"
          label="Lieu de l'évènement"
          width="100%"
        />

        <DatePickerControl
          control={control}
          name="date"
          label="Date de l'évènement"
          format="dddd Do MMMM yyyy"
          initialDate={
            currentDocument && formAction === 'update'
              ? new Date(Number(currentDocument.date))
              : new Date()
          }
        />

        <InputRadio
          question="Evenement privé ?"
          options={isPrivateDatas?.isPrivateOptions}
          name="isPrivate"
          defaultValue={isPrivateDatas?.isPrivateDefaultValue}
          control={control}
          radioGroupProps={{ row: true }}
          display="block"
        />
        <InputReactPageControl
          name="content"
          control={control}
          initialValue={formAction === 'update' ? currentDocument.content : ''}
          label="Texte:"
        />
      </Grid>
      <Grid item container alignItems="center" justify="flex-end">
        <CostumButton
          text={
            formAction === 'update'
              ? `Modifier ${paper.paperType}`
              : `Poster ${paper.paperType}`
          }
          bgcolor={theme.palette.success.main}
          action="post"
          width="300px"
          type="submit"
          disabled={!isValid || isSubmitting}
        />
      </Grid>
    </StyledPaperForm>
  )
}

PaperFormEvent.defaultProps = {
  currentDocument: null,
}

PaperFormEvent.propTypes = {
  paper: PropTypes.shape({
    queryParams: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string),
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
    fetcher: PropTypes.func.isRequired,
    poster: PropTypes.func.isRequired,
  }).isRequired,
  formAction: PropTypes.string.isRequired,
  currentDocument: PropTypes.shape({
    id: PropTypes.string,
    place: PropTypes.string,
    isPrivate: PropTypes.bool,
    content: PropTypes.string,
    date: PropTypes.number,
    title: PropTypes.string,
    entity: PropTypes.shape({
      id: PropTypes.string,
    }),
    createdat: PropTypes.number,
  }),
  handleBack: PropTypes.func.isRequired,
  isPrivateDatas: PropTypes.shape({
    isPrivateDefaultValue: PropTypes.string.isRequired,
    isPrivateOptions: PropTypes.arrayOf(
      PropTypes.shape({
        labelOption: PropTypes.string,
        optionvalue: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default React.memo(PaperFormEvent)
