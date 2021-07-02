import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { styled, Grid, useTheme } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useMutation } from 'react-query'
import Title from '../elements/Title'
import pageSchema from '../../schemas/pageSchema'
import TinyPageEditor from '../elements/TinyPageEditor'
import CostumButton from '../elements/CustomButton'
import { apiPostPage } from '../../utils/api'
import { useUpdateMutationOptions } from '../../utils/hooks'

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

function PageForms({ page, pageParams, setShowPageForm, setShowEditToolTip }) {
  const { pageName, setTopAlert, queryKey, isAllowedToChange } = pageParams
  const theme = useTheme()
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
    const { text } = datas
    const options = {
      headers: { 'x-access-token': Token },
    }
    const finalDatas = { text }

    try {
      await mutateAsync({
        id: page ? page._id : null,
        action: 'update',
        options: options,
        body: finalDatas,
      }).then((response) => {
        setTopAlert({
          severity: 'success',
          alertText: response.message,
          openAlert: true,
        })
        setShowEditToolTip(true)
        setShowPageForm(false)
        window.scrollTo(0, 0)
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
    setShowEditToolTip(false)
    return () => {
      setShowEditToolTip(true)
      setTopAlert({
        severity: 'error',
        alertText: '',
        openAlert: false,
      })
    }
  }, [])

  if (!isAllowedToChange) return <Redirect to="/login" />
  return (
    <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container justify="center">
        <Title title={formTitle} textcolor="whitesmoke" />
      </Grid>
      <Grid container className="form-fields-container">
        <Grid item container>
          <Controller
            name="text"
            control={control}
            defaultValue={page ? page.text : null}
            render={({ field: { onChange, value } }) => (
              <TinyPageEditor onChange={onChange} value={value} />
            )}
          />
        </Grid>
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
    setTopAlert: PropTypes.func.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
}

export default PageForms
