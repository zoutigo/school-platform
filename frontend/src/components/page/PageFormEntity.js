/* eslint-disable import/named */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled, Grid, Button, List, ListItem } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack'

import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Title from '../elements/Title'

import { apiPostEntity } from '../../utils/api'
import useMutate from '../hooks/useMutate'
import MutateCircularProgress from '../elements/MutateCircularProgress'
import getError from '../../utils/getError'
import getResponse from '../../utils/getResponse'
import ReactPageInput from '../elements/inputs/ReactPageInput'
import StyledHookForm from '../styled-components/StyledHookForm'

function PageFormEntity({
  entity,
  pageParams,
  setShowPageForm,
  setShowEditToolTip,
}) {
  const { pageName, queryKey, isAllowedToChange } = pageParams

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { Token } = useSelector((state) => state.user)
  const formTitle = `Modification de la page ${pageName}`
  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostEntity)

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
        id: entity ? entity.id : null,
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

  if (!isAllowedToChange) return <Redirect to="/private/identification/login" />
  return (
    <StyledHookForm onSubmit={handleSubmit(onSubmit)}>
      {isMutating && <MutateCircularProgress />}
      <Grid item container justify="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      <List className="form-fields-container">
        <ListItem className="field">
          <ReactPageInput
            control={control}
            name="content"
            defaultValue={entity ? entity.content : null}
            label="Contenu de la page"
          />
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            color="secondary"
            type="submit"
            disabled={!isValid || isSubmitting}
            variant="contained"
            size="large"
          >{`Je modifie la page ${pageName}`}</Button>
        </ListItem>
      </List>
    </StyledHookForm>
  )
}

PageFormEntity.propTypes = {
  setShowPageForm: PropTypes.func.isRequired,
  setShowEditToolTip: PropTypes.func.isRequired,
  pageParams: PropTypes.exact({
    alias: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  entity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default PageFormEntity
