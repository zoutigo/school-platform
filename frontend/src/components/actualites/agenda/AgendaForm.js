import React, { useEffect, useState } from 'react'
import { Grid, styled, useTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiPostEvents } from '../../../utils/api'
import { useUpdateMutationOptions } from '../../../utils/hooks'
import DatePickerControl from '../../elements/DatePickerControl'
import TinyTextEditor from '../../elements/TinyTextEditor'
import CostumButton from '../../elements/CustomButton'
import eventSchema from '../../../schemas/eventSchema'
import Title from '../../elements/Title'
import InputTextControl from '../../elements/InputTextControl'

const StyledPaperForm = styled('form')(({ theme }) => ({
  width: '100%',
  margin: '1rem auto',
  background: 'gray',
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
  '& .form-fields-container': {
    background: 'whitesmoke',
    padding: '0.5rem 0.2rem',
    '& .field': {
      margin: '0.6rem 0px',
    },
  },
}))
function AgendaForm({
  events,
  currentEventId,
  queryKey,
  setTopAlert,
  setShowTooltip,
  setFormAction,
  formAction,
}) {
  const theme = useTheme()
  const [event, setEvent] = useState(null)
  const token = useSelector((state) => state.user.Token.token)
  const { mutateAsync } = useMutation(
    apiPostEvents,
    useUpdateMutationOptions(queryKey)
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(eventSchema),
  })

  const onSubmit = async (datas) => {
    const { title, description, date, place, text } = datas
    const options = {
      headers: { 'x-access-token': token },
    }
    const finalDatas = {
      title,
      description,
      date: date.valueOf(),
      place,
      text,
    }

    try {
      await mutateAsync({
        id: currentEventId || '',
        action: formAction,
        options: options,
        body: finalDatas,
      })
    } catch (err) {
      setTopAlert({
        severity: 'error',
        alertText: err.message,
        openAlert: true,
      })
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    if (currentEventId) {
      const myEvent = events.find((ev) => ev._id === currentEventId)
      setEvent(myEvent)
    }
    setShowTooltip(false)
    return () => {
      setEvent(null)
      setShowTooltip(true)
      setFormAction(null)
      setTopAlert({
        severity: 'error',
        alertText: '',
        openAlert: false,
      })
    }
  }, [currentEventId])

  const agendaTitle =
    event && formAction === 'update'
      ? `Modification d'un évènement`
      : `Ajout d'un évènement à l'agenda`

  if (!event && formAction === 'update') return null
  return (
    <Grid item container justify="center">
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <Grid item container justify="center">
          <Title title={agendaTitle} textcolor="whitesmoke" />
        </Grid>
        <Grid container className="form-fields-container">
          <InputTextControl
            name="title"
            control={control}
            initialValue={formAction === 'update' ? event.title : ''}
            helperText="au moins 10 caractères"
            label="Titre"
            width="100%"
          />

          <InputTextControl
            name="place"
            control={control}
            initialValue={
              event && formAction === 'update'
                ? event.place
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
              formAction === 'update' ? new Date(event.date) : new Date()
            }
          />

          <Grid item container>
            <Controller
              name="text"
              control={control}
              defaultValue={formAction === 'update' ? event.text : ''}
              render={({ field: { onChange, value } }) => (
                <TinyTextEditor onChange={onChange} value={value} />
              )}
            />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justify="flex-end">
          <CostumButton
            text={
              formAction === 'update'
                ? 'Je modifie mon evvènement '
                : 'Je poste mon évènement'
            }
            bgcolor={theme.palette.success.main}
            action="post"
            width="300px"
            type="submit"
            disabled={!isValid || isSubmitting}
          />
        </Grid>
      </StyledPaperForm>
    </Grid>
  )
}

AgendaForm.defaultProps = {
  currentEventId: null,
  events: [],
  formAction: null,
}

AgendaForm.propTypes = {
  currentEventId: PropTypes.string,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTopAlert: PropTypes.func.isRequired,
  setShowTooltip: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
  formAction: PropTypes.string,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.string,
      createdat: PropTypes.string,
      _id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default AgendaForm
