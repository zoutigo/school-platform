import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { Grid, styled } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import membreSchema from '../../../../../schemas/membreSchema'
import CustomButton from '../../../../elements/CustomButton'
import InputTextControl from '../../../../elements/InputTextControl'

const StyledForm = styled('form')(() => ({
  width: '100%',
  margin: '1rem 0px',
  '& >div': {
    border: `solid 1px green`,
    padding: ' 0 1rem',
  },
}))
function MembresForm({ setSearch }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(membreSchema),
  })

  const onSubmit = async (datas) => {
    setSearch(datas)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid item container alignItems="center">
        <Grid item xs={8}>
          <InputTextControl
            name="email"
            width="100%"
            control={control}
            helperText="recherche par adresse mail"
          />
        </Grid>
        <Grid item xs={4}>
          <CustomButton
            width="100%"
            text="rechercher"
            action="search"
            type="submit"
          />
        </Grid>
      </Grid>
    </StyledForm>
  )
}

MembresForm.propTypes = {
  setSearch: PropTypes.func.isRequired,
}

export default MembresForm
