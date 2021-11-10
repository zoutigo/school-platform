/* eslint-disable import/named */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, List, ListItem } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Title from '../elements/Title'
import { apiPostEntity, apiPostPage } from '../../utils/api'
import useMutate from '../hooks/useMutate'
import MutateCircularProgress from '../elements/MutateCircularProgress'
import getError from '../../utils/getError'
import getResponse from '../../utils/getResponse'
import ReactPageInput from '../elements/inputs/ReactPageInput'
import StyledHookForm from '../styled-components/StyledHookForm'

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

  // if (!isAllowedToChange) return <Redirect to="/private/identification/login" />

  return (
    <StyledHookForm onSubmit={handleSubmit(onSubmit)} data-testid="page-form">
      {isMutating && <MutateCircularProgress />}
      <Grid item container justifyContent="center">
        <Title title={formTitle} textcolor="whitesmoke" role="presentation" />
      </Grid>
      <List className="form-fields-container">
        <ListItem className="field">
          <ReactPageInput
            name="content"
            control={control}
            defaultValue={page.content}
            label="Saisir le texte en cliquant sur le +"
          />
        </ListItem>
        <ListItem>
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
        </ListItem>
      </List>
    </StyledHookForm>
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
