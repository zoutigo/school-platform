/* eslint-disable import/named */
import { styled, Grid, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
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
import InputEditorControl from '../elements/editor/InputEditorControl'
import InputReactPageControl from '../elements/InputReactPageControl'
import InputRadio from '../elements/InputRadio'

// import InputCKEditorControl from '../elements/editor/InputCKEditorControl'

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
  formAction,
  paper,
  handleBack,
  isPrivateDatas,
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
    const { title, content, isPrivate } = datas

    const finalDatas = {
      title,
      isPrivate: isPrivate === 'oui',
      content: JSON.stringify(content),
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
        handleBack()
      })
    } catch (err) {
      setPaperMutateAlert(errorAlertCollapse(err.response.data.message))
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
          initialValue={formAction === 'update' ? currentDocument.title : ''}
          helperText="au moins 10 caractères"
          label="Titre"
          width="100%"
        />

        <InputRadio
          question="Activité privée ?"
          options={isPrivateDatas?.isPrivateOptions}
          name="isPrivate"
          defaultValue={isPrivateDatas?.isPrivateDefaultValue}
          control={control}
          radioGroupProps={{ row: true }}
          display="block"
        />

        {/* <Grid item container>
          <Controller
            name="text"
            control={control}
            defaultValue={formAction === 'update' ? currentDocument.text : ''}
            render={({ field: { onChange, value } }) => (
              <TinyPageEditor onChange={onChange} value={value} />
            )}
          />
        </Grid> */}
        {/* <InputEditorControl
          name="text"
          control={control}
          initialValue={formAction === 'update' ? currentDocument.text : ''}
          label="Texte:"
          width="100%"
          height={200}
        /> */}
        {/* <InputCKEditorControl
          name="text"
          control={control}
          initialValue={formAction === 'update' ? currentDocument.text : ''}
          label="Texte:"
          width="100%"
          height={200}
        /> */}
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
    _id: PropTypes.string,
    content: PropTypes.string,
    isPrivate: PropTypes.bool,
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

export default React.memo(PaperFormActivite)
