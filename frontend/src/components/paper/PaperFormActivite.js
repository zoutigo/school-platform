/* eslint-disable import/named */
import { styled, Grid, useTheme } from '@material-ui/core'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import Title from '../elements/Title'
import InputTextControl from '../elements/InputTextControl'
import { apiPostPaper } from '../../utils/api'
import { useUpdateMutationOptions } from '../../utils/hooks'
import paperActiviteSchema from '../../schemas/paperActiviteSchema'
import TinyPageEditor from '../elements/TinyPageEditor'
import CostumButton from '../elements/CustomButton'
import { setPaperMutateAlert } from '../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../constants/alerts'

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

function PaperFormActivite({
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
  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync } = useMutation(
    apiPostPaper,
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
    const { title, text } = datas
    const finalDatas = {
      title,
      text,
      type: paper.paperType,
      entityAlias: paper.entityAlias,
    }

    try {
      await mutateAsync({
        id: currentDocument ? currentDocument._id : null,
        action: formAction,
        body: finalDatas,
        Token: Token,
      }).then((response) => {
        dispatch(setPaperMutateAlert(successAlertCollapse(response.message)))

        setCurrentDocument(null)
        setShowTooltip(true)
        setShowPaperList(true)
        setShowPaperForm(false)
      })
    } catch (err) {
      setPaperMutateAlert(errorAlertCollapse(err.response.data.message))

      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    setShowTooltip(false)
    return () => {
      setShowTooltip(true)
      setFormAction(null)
    }
  }, [currentDocument])

  const formTitle =
    formAction === 'update'
      ? `Modification ${paper.paperType}`
      : `Ajout ${paper.paperType}`

  if (!currentDocument && formAction === 'update') return null

  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container justify="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      <Grid container className="form-fields-container">
        <InputTextControl
          name="title"
          control={control}
          initialValue={formAction === 'update' ? currentDocument.title : ''}
          helperText="au moins 10 caractères"
          label="Titre"
          width="100%"
        />

        <Grid item container>
          <Controller
            name="text"
            control={control}
            defaultValue={formAction === 'update' ? currentDocument.text : ''}
            render={({ field: { onChange, value } }) => (
              <TinyPageEditor onChange={onChange} value={value} />
            )}
          />
        </Grid>
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

PaperFormActivite.propTypes = {
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

export default PaperFormActivite
