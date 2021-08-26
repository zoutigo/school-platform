/* eslint-disable import/named */
import { styled, Grid, useTheme } from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Title from '../elements/Title'
import InputTextControl from '../elements/InputTextControl'
import { useUpdateMutationOptions } from '../../utils/hooks'
import paperActiviteSchema from '../../schemas/paperActiviteSchema'
import TinyPageEditor from '../elements/TinyPageEditor'
import CostumButton from '../elements/CustomButton'
import DatePickerControl from '../elements/DatePickerControl'
import { setPaperMutateAlert } from '../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../constants/alerts'
import InputReactPageControl from '../elements/InputReactPageControl'
import InputRadio from '../elements/InputRadio'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  //   [theme.breakpoints.up('md')]: {
  //     width: '60%',
  //   },
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
  const dispatch = useDispatch()
  const theme = useTheme()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync } = useMutation(
    paper.poster,
    useUpdateMutationOptions(paper.queryKey)
  )
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
    console.log('content', content)
    const finalDatas = {
      title,
      date: date.valueOf(),
      place,
      isPrivate: isPrivate === 'oui',
      content: JSON.stringify(content),
      entityAlias: paper.entityAlias,
    }

    try {
      await mutateAsync({
        id: currentDocument ? currentDocument._id : null,
        action: formAction,
        Token: Token,
        body: finalDatas,
      }).then((response) => {
        dispatch(setPaperMutateAlert(successAlertCollapse(response.message)))
        handleBack()
        window.scrollTo(0, 0)
      })
    } catch (err) {
      dispatch(
        setPaperMutateAlert(errorAlertCollapse(err.response.data.message))
      )
      window.scrollTo(0, 0)
    }
  }

  if (!currentDocument && formAction === 'update') return null

  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
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
              ? new Date(currentDocument.date)
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
        {/* <Grid item container>
          <Controller
            name="text"
            control={control}
            defaultValue={
              currentDocument && formAction === 'update'
                ? currentDocument.place
                : 'Ecole Saint Augustin'
            }
            render={({ field: { onChange, value } }) => (
              <TinyPageEditor onChange={onChange} value={value} />
            )}
          />
        </Grid> */}
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
    _id: PropTypes.string,
    place: PropTypes.string,
    isPrivate: PropTypes.bool,
    content: PropTypes.string,
    date: PropTypes.number,
    title: PropTypes.string,
    entity: PropTypes.shape({
      _id: PropTypes.string,
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
