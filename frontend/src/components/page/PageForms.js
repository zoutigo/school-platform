/* eslint-disable import/named */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled, Grid, useTheme } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useMutation } from 'react-query'
import Title from '../elements/Title'
import pageSchema from '../../schemas/pageSchema'
import TinyPageEditor from '../elements/TinyPageEditor'
import CostumButton from '../elements/CustomButton'
import { apiPostPage } from '../../utils/api'
import { useUpdateMutationOptions } from '../../utils/hooks'
import { setPageMutateAlert } from '../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../constants/alerts'
import InputReactPageControl from '../elements/InputReactPageControl'

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

function PageForms({ page, pageParams, setShowPageForm, setShowEditToolTip }) {
  const { pageName, queryKey, isAllowedToChange } = pageParams
  const theme = useTheme()
  const dispatch = useDispatch()
  const { Token } = useSelector((state) => state.user)
  const formTitle = `Modification de la page ${pageName}`

  const { mutateAsync } = useMutation(
    apiPostPage,
    useUpdateMutationOptions(queryKey)
  )

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(pageSchema),
  })

  const onSubmit = async (datas) => {
    const { content } = datas
    const options = {
      headers: { 'x-access-token': Token },
    }
    const finalDatas = { content: JSON.stringify(content) }

    try {
      await mutateAsync({
        id: page ? page.id : null,
        action: 'update',
        options: options,
        body: finalDatas,
      }).then((response) => {
        dispatch(setPageMutateAlert(successAlertCollapse(response.message)))
        setShowEditToolTip(true)
        setShowPageForm(false)
        window.scrollTo(0, 0)
      })
    } catch (err) {
      dispatch(
        setPageMutateAlert(errorAlertCollapse(err.response.data.message))
      )
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
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container justify="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      <Grid container className="form-fields-container">
        <InputReactPageControl
          control={control}
          name="content"
          initialValue={page ? page.content : null}
          label="Contenu de la page"
        />
      </Grid>
      <Grid item container alignItems="center" justify="flex-end">
        <CostumButton
          text={`Je modifie la page ${pageName}`}
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

PageForms.propTypes = {
  setShowPageForm: PropTypes.func.isRequired,
  setShowEditToolTip: PropTypes.func.isRequired,
  pageParams: PropTypes.exact({
    alias: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string.isRequired,
    pageName: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default PageForms
