/* eslint-disable import/named */
import { useSnackbar } from 'notistack'
import {
  styled,
  Grid,
  useTheme,
  Button,
  List,
  ListItem,
} from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import InputTextControl from '../elements/InputTextControl'
import paperActiviteSchema from '../../schemas/paperActiviteSchema'
import CostumButton from '../elements/CustomButton'
import DatePickerControl from '../elements/DatePickerControl'
import useMutate from '../hooks/useMutate'
import MutateCircularProgress from '../elements/MutateCircularProgress'
import getError from '../../utils/getError'
import getResponse from '../../utils/getResponse'
import RadioInput from '../elements/inputs/RadioInput'
import ReactPageInput from '../elements/inputs/ReactPageInput'
import TextInput from '../elements/inputs/TextInput'
import DatePickerInput from '../elements/inputs/DatePickerInput'
import StyledHookForm from '../styled-components/StyledHookForm'

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
    // resolver: yupResolver(paperActiviteSchema),
  })

  const onSubmit = async (datas) => {
    console.log('datas', datas)
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
        enqueueSnackbar(getResponse(response), { variant: 'success' })
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
    <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
      {isMutating && <MutateCircularProgress />}
      <List className="form-fields-container">
        <ListItem className="field">
          <TextInput
            name="title"
            control={control}
            defaultValue={
              currentDocument && formAction === 'update'
                ? currentDocument.title
                : ''
            }
            example="Plus de 5 caractères et moins de 50 caractères"
            label="Titre"
            width="100%"
            variant="standard"
            rules={{
              minLength: {
                value: 5,
                message: 'le titre doit avoir au moins 5 caractères',
              },
              maxLength: {
                value: 50,
                message: 'le titre doit avoir au plus 50 caractères',
              },
            }}
          />
        </ListItem>
        <ListItem className="field">
          <TextInput
            name="place"
            control={control}
            defaultValue={
              currentDocument && formAction === 'update'
                ? currentDocument.place
                : ''
            }
            example="Plus de 5 caractères et moins de 50 caractères"
            label="Lieu de l'évènement"
            width="100%"
            variant="standard"
            rules={{
              minLength: {
                value: 5,
                message: 'le lieu doit avoir au moins 5 caractères',
              },
              maxLength: {
                value: 50,
                message: 'le lieu doit avoir au plus 50 caractères',
              },
            }}
          />
        </ListItem>
        <ListItem className="field">
          <DatePickerInput
            control={control}
            name="date"
            label="Date de l'évènement"
            format="dddd Do MMMM yyyy"
            defaultValue={
              currentDocument && formAction === 'update'
                ? new Date(Number(currentDocument.date))
                : new Date()
            }
          />
        </ListItem>
        <ListItem className="field">
          <RadioInput
            question="Evenement privé ?"
            options={isPrivateDatas?.isPrivateOptions}
            name="isPrivate"
            defaultValue={isPrivateDatas?.isPrivateDefaultValue}
            control={control}
            radioGroupProps={{ row: true }}
            display="block"
            variant="standard"
          />
        </ListItem>
        <ListItem>
          <ReactPageInput
            name="content"
            control={control}
            defaultValue={
              formAction === 'update' ? currentDocument.content : ''
            }
            label="Texte:"
          />
        </ListItem>
        <ListItem>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            color="secondary"
            fullWidth
            variant="contained"
          >
            {formAction === 'update'
              ? `Modifier ${paper.paperType}`
              : `Poster ${paper.paperType}`}
          </Button>
        </ListItem>
      </List>
      {/* <Grid container className="form-fields-container"></Grid>
      <Grid item container alignItems="center" justify="flex-end"></Grid> */}
    </StyledHookForm>
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
