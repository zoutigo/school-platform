import PropTypes from 'prop-types'
import { Grid, styled, TextField } from '@material-ui/core'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { Controller, useForm } from 'react-hook-form'
import StyledBasicButton from '../../../../styled-components/StyledBasicButton'

const StyledForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem 0px',
  '& >div': {
    padding: ' 0 1rem',
  },
}))

function MembreSearchForm({ setSearch }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (datas) => {
    setSearch(datas)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container alignItems="center">
        <Grid item xs={9}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'saisissez une adresse mail',
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                message: 'le format mail est incorrect',
              },
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Adresse mail"
                placeholder="Entrez une adresse email"
                inputProps={{ type: 'email' }}
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : null}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <StyledBasicButton
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            fullWidth
            className="button"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Rechercher
          </StyledBasicButton>
        </Grid>
      </Grid>
    </StyledForm>
  )
}

MembreSearchForm.defaultProps = {
  setSearch: () => null,
}

MembreSearchForm.propTypes = {
  setSearch: PropTypes.func,
}

export default MembreSearchForm
