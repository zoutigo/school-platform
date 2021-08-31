/* eslint-disable import/named */
import { Grid, styled, useTheme } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import React from 'react'
import DatePickerControl from '../../../../../elements/DatePickerControl'
import InputSmallEditorControl from '../../../../../elements/InputSmallEditorControl'
import InputTextControl from '../../../../../elements/InputTextControl'
import Title from '../../../../../elements/Title'
import CostumButton from '../../../../../elements/CustomButton'
import { useUpdateMutationOptions } from '../../../../../../utils/hooks'
import { apiPostDialog } from '../../../../../../utils/api'
import modalSchema from '../../../../../../schemas/modalSchema'
import { setParametersMutateAlert } from '../../../../../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../../../../../constants/alerts'

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

function ManageDialogForm({
  setShowForm,
  setShowUpdateForm,
  setShowParams,
  formAction,
  currentModal,
  queryKey,
}) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { Token } = useSelector((state) => state.user)
  const { mutateAsync } = useMutation(
    apiPostDialog,
    useUpdateMutationOptions(queryKey)
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(modalSchema),
  })

  const onSubmit = async (datas) => {
    const { title, text, startdate, enddate } = datas
    const options = {
      headers: { 'x-access-token': Token },
    }
    const finalDatas = {
      title,
      startdate: startdate.valueOf(),
      enddate: enddate.valueOf(),
      text,
    }

    try {
      await mutateAsync({
        id: currentModal ? currentModal.id : null,
        action: formAction,
        options: options,
        body: finalDatas,
      }).then((response) => {
        dispatch(
          setParametersMutateAlert(successAlertCollapse(response.message))
        )
        setShowForm(false)

        window.scrollTo(0, 0)
      })
    } catch (err) {
      dispatch(
        setParametersMutateAlert(errorAlertCollapse(err.response.data.message))
      )
      window.scrollTo(0, 0)
    }
  }

  const formTitle =
    formAction === 'create' ? `Créer une modale` : `Modifier une modale`
  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container justify="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      <Grid container className="form-fields-container">
        <InputTextControl
          name="title"
          control={control}
          initialValue={
            currentModal && formAction === 'update' ? currentModal.title : ''
          }
          helperText="au moins 10 caractères"
          placeholder="Le titre qui vous convient"
          label="Titre"
          width="100%"
        />
        <DatePickerControl
          control={control}
          name="startdate"
          label="Date debut"
          format="dddd Do MMMM yyyy"
          initialDate={
            currentModal && formAction === 'update'
              ? new Date(Number(currentModal.startdate))
              : new Date()
          }
        />
        <DatePickerControl
          control={control}
          name="enddate"
          label="Date de fin"
          format="dddd Do MMMM yyyy"
          initialDate={
            currentModal && formAction === 'update'
              ? new Date(Number(currentModal.startdate))
              : new Date()
          }
        />
        <InputSmallEditorControl
          name="text"
          label="Message de la modale"
          control={control}
          initialValue={
            currentModal && formAction === 'update' ? currentModal.text : ''
          }
        />
      </Grid>
      <Grid item container alignItems="center" justify="flex-end">
        <CostumButton
          text={
            formAction === 'update'
              ? `Je modifie la modale`
              : `Je poste la modale`
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

ManageDialogForm.defaultProps = {
  formAction: 'create',
  currentModal: null,
  setShowForm: () => null,
  setShowUpdateForm: () => null,
}

ManageDialogForm.propTypes = {
  setShowUpdateForm: PropTypes.func,
  setShowForm: PropTypes.func,
  setShowParams: PropTypes.func.isRequired,
  formAction: PropTypes.string,
  queryKey: PropTypes.string.isRequired,
  currentModal: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    enddate: PropTypes.number,
    startdate: PropTypes.number,
    text: PropTypes.string,
  }),
}

export default ManageDialogForm
