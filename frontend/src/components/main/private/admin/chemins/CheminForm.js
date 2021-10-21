/* eslint-disable import/named */
import { Grid, styled, useTheme } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { useSelector } from 'react-redux'
import InputTextControl from '../../../../elements/InputTextControl'
import CustomButton from '../../../../elements/CustomButton'
import TinyPageEditor from '../../../../elements/TinyPageEditor'
import cheminSchema from '../../../../../schemas/cheminSchema'
import InputFileControl from '../../../../elements/InputFileControl'
import { apiPostChemin } from '../../../../../utils/api'
import useMutate from '../../../../hooks/useMutate'
import MutateCircularProgress from '../../../../elements/MutateCircularProgress'
import getError from '../../../../../utils/error'

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

function CheminForm({ queryKey, formAction, chemin, setShowAddForm }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const theme = useTheme()
  const { Token } = useSelector((state) => state.user)

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostChemin)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(cheminSchema),
  })

  const onSubmit = async (datas) => {
    const { alias, file, path, description } = datas
    const options = {
      headers: {
        'x-access-token': Token,
      },
    }
    const finalDatas = {
      alias,
      file: file ? file[0] : null,
      path,
      description,
    }

    closeSnackbar()

    try {
      await mutateAsync({
        id: chemin ? chemin.id : null,
        action: formAction,
        options: options,
        body: finalDatas,
        token: Token,
      }).then((response) => {
        enqueueSnackbar(response.statusText, { variant: 'success' })
        setShowAddForm(false)
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
      window.scrollTo(0, 0)
    }
  }
  return (
    <Grid container>
      {isMutating && <MutateCircularProgress />}
      <StyledPaperForm onSubmit={handleSubmit(onSubmit)}>
        <Grid container className="form-fields-container">
          <InputTextControl
            name="alias"
            control={control}
            initialValue={chemin && formAction === 'update' ? chemin.alias : ''}
            helperText="au moins 10 caractères"
            label="Alias"
            width="100%"
          />
          <InputTextControl
            name="path"
            control={control}
            initialValue={chemin && formAction === 'update' ? chemin.path : ''}
            helperText="au moins 3 caractères"
            label="Chemin"
            width="100%"
          />

          <InputFileControl
            control={control}
            name="file"
            type="file"
            label="Image"
            helperText="maximum 5Mo"
            accept="image/jpg,image/jpeg,image/gif,image/png "
          />

          <Grid item container>
            <Controller
              name="description"
              control={control}
              defaultValue={
                chemin && formAction === 'update' ? chemin.description : ''
              }
              render={({ field: { onChange, value } }) => (
                <TinyPageEditor
                  onChange={onChange}
                  value={value}
                  height={200}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justify="flex-end">
          <CustomButton
            text="je poste mon chemin"
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

CheminForm.defaultProps = null

CheminForm.propTypes = {
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  formAction: PropTypes.string.isRequired,
  setShowAddForm: PropTypes.func.isRequired,
  chemin: PropTypes.shape({
    id: PropTypes.string,
    alias: PropTypes.string,
    path: PropTypes.string,
    description: PropTypes.string,
  }),
}

export default React.memo(CheminForm)
