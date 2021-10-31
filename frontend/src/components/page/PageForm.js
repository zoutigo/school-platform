/* eslint-disable import/named */
import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button } from '@material-ui/core'
import { styled } from '@material-ui/styles'
import { Controller, useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Editor, { getTextContents } from '@react-page/editor'
import slate from '@react-page/plugins-slate'
import { imagePlugin } from '@react-page/plugins-image'
import divider from '@react-page/plugins-divider'
import spacer from '@react-page/plugins-spacer'

import cellSpacing from '../elements/reactpage/constants'
import Title from '../elements/Title'
import { apiPostEditorImage, apiPostEntity, apiPostPage } from '../../utils/api'
import useMutate from '../hooks/useMutate'
import MutateCircularProgress from '../elements/MutateCircularProgress'
import getError from '../../utils/getError'
import getResponse from '../../utils/getResponse'

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

function PageForm({ page, pageParams, setShowPageForm, setShowEditToolTip }) {
  const { pageName, queryKey, type } = pageParams
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const formTitle = `Modification de la page ${pageName}`
  const buttonText = `Je modifie la page ${pageName}`
  const poster = type === 'entity' ? apiPostEntity : apiPostPage
  const { mutateAsync, isMutating } = useMutate(queryKey, poster)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    const { content } = datas
    const options = {
      headers: { 'x-access-token': Token },
    }
    const finalDatas = { content: JSON.stringify(content) }

    closeSnackbar()
    try {
      await mutateAsync({
        id: page ? page.id : null,
        action: 'update',
        options: options,
        body: finalDatas,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
        setShowEditToolTip(true)
        setShowPageForm(false)
        window.scrollTo(0, 0)
      })
    } catch (err) {
      console.log('err', err)
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    setShowEditToolTip(false)
    return () => {
      setShowEditToolTip(true)
    }
  }, [])

  const uploadImage = useCallback(
    () => async (file, reportProgress) => {
      const data = await apiPostEditorImage({ file, Token })
      return { url: data.url }
    },
    []
  )

  const cellPlugins = [
    slate(),
    imagePlugin({
      imageUpload: uploadImage(),
    }),
    divider,
    spacer,
    // colorPlugin(),
  ]

  // if (!isAllowedToChange) return <Redirect to="/private/identification/login" />

  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)} data-testid="page-form">
      <Grid item container justifyContent="center">
        <Title title={formTitle} textcolor="whitesmoke" role="presentation" />
      </Grid>
      {isMutating && <MutateCircularProgress />}
      <Grid container className="form-fields-container">
        {/* <InputReactPageControl
          control={control}
          name="content"
          initialValue={page ? page.content : null}
          label="Contenu de la page"
        /> */}
        <Grid item container className="controller">
          <Controller
            name="content"
            control={control}
            defaultValue={page ? JSON.parse(page.content) : null}
            rules={{
              required: 'il veillez ajouter un texte',
              // validate: (value) => {
              //   const datas = getTextContents(value, {
              //     cellPlugins,
              //     lang: 'fr',
              //   })
              //   console.log(value)
              // },
            }}
            render={({ field }) => (
              <Editor
                data-testid="page-editor"
                {...field}
                cellPlugins={cellPlugins}
                cellSpacing={cellSpacing}
                lang="fr"
                onChange={(newvalue) => field.onChange(newvalue)}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid item container alignItems="center" justifyContent="flex-end">
        <Button
          type="submit"
          fullWidth
          color="secondary"
          disabled={!isValid || isSubmitting}
          variant="contained"
          size="large"
        >
          {buttonText}
        </Button>
      </Grid>
    </StyledPaperForm>
  )
}

PageForm.defaultProps = {
  pageParams: {
    type: null,
  },
}

PageForm.propTypes = {
  setShowPageForm: PropTypes.func.isRequired,
  setShowEditToolTip: PropTypes.func.isRequired,
  pageParams: PropTypes.exact({
    alias: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
    type: PropTypes.string,
  }),
  page: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default PageForm
