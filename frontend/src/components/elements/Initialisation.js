import { Button, Grid } from '@material-ui/core'

import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { apiInitialize } from '../../utils/api'
import { useUpdateMutationOptions } from '../../utils/hooks'
import { StyledPersoDataForm } from '../main/private/account/persodatas/Style'

function Initialisation() {
  const [synchro, setSynchro] = useState(null)
  const [message, setMessage] = useState(null)
  const queryKey = [`initialisation-${synchro}`]

  const { mutateAsync } = useMutation(
    apiInitialize,
    useUpdateMutationOptions(queryKey)
  )

  const handleSubmit = async () => {
    try {
      await mutateAsync({
        type: synchro,
      }).then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message)
          window.scrollTo(0, 0)
        }
      })
    } catch (err) {
      setMessage(err.response.data.message)

      window.scrollTo(0, 0)
    }
  }
  return (
    <Grid container>
      <Grid item container>
        <Button
          type="button"
          onClick={() => {
            setSynchro('models')
            handleSubmit()
          }}
        >
          Models
        </Button>
        <Button type="button"> Synchronize Pages</Button>
      </Grid>

      <Grid item container>
        {message}
      </Grid>
    </Grid>
  )
}

export default Initialisation
