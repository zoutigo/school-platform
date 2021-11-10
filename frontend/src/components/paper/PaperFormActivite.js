/* eslint-disable import/named */
import { styled, List, ListItem, Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { apiPostPaper } from '../../utils/api'
import MutateCircularProgress from '../elements/MutateCircularProgress'
import useMutate from '../hooks/useMutate'
import getError from '../../utils/getError'
import getResponse from '../../utils/getResponse'
import TextInput from '../elements/inputs/TextInput'
import RadioInput from '../elements/inputs/RadioInput'
import ReactPageInput from '../elements/inputs/ReactPageInput'

const StyledPaperForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem auto',
  background: 'whitesmoke',
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
  formAction,
  paper,
  handleBack,
  isPrivateDatas,
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)

  const { mutateAsync, isMutating } = useMutate(paper.queryKey, apiPostPaper)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    const { title, content, isPrivate } = datas

    const finalDatas = {
      title,
      isPrivate: isPrivate === 'oui',
      content: JSON.stringify(content),
      type: paper.paperType,
      entityAlias: paper.entityAlias,
    }
    closeSnackbar()
    try {
      await mutateAsync({
        id: currentDocument ? currentDocument.id : null,
        action: formAction,
        body: finalDatas,
        Token: Token,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        handleBack()
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
      <List className="form-fields-container">
        <ListItem>
          <TextInput
            name="title"
            type="text"
            variant="standard"
            control={control}
            defaultValue={formAction === 'update' ? currentDocument.title : ''}
            label="Titre"
            example="le titre de votre activité"
            width="100%"
            rules={{
              required: 'le titre est obligatoire',
              minLength: {
                value: 5,
                message: 'Le titre ne peut pas avoir moins de cinq lettres',
              },
              maxLength: {
                value: 50,
                message: 'le titre ne peut avoir plus de 50 lettres',
              },
            }}
          />
        </ListItem>
        <ListItem>
          <RadioInput
            question="Activité privée ?"
            options={isPrivateDatas?.isPrivateOptions}
            name="isPrivate"
            defaultValue={isPrivateDatas?.isPrivateDefaultValue}
            control={control}
            radioGroupProps={{ row: true }}
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
            label="Saisir le contenu en cliquant sur le + pour créer un bloc:"
          />
        </ListItem>

        <ListItem>
          <Button
            variant="contained"
            type="submit"
            color="secondary"
            fullWidth
            disabled={!isValid || isSubmitting}
          >
            {formAction === 'update'
              ? `Modifier ${paper.paperType}`
              : `Poster ${paper.paperType}`}
          </Button>
        </ListItem>
      </List>
    </StyledPaperForm>
  )
}

PaperFormActivite.defaultProps = {
  currentDocument: null,
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
  formAction: PropTypes.string.isRequired,
  currentDocument: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    isPrivate: PropTypes.bool,
    title: PropTypes.string,
    entity: PropTypes.shape({
      id: PropTypes.number,
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

export default React.memo(PaperFormActivite)
