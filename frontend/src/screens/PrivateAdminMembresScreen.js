/* eslint-disable arrow-body-style */
import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AlertCollapse from '../components/elements/AlertCollapse'
import MembresForm from '../components/main/private/admin/membres/MembresForm'
import MembresList from '../components/main/private/admin/membres/MembresList'
import { initialAlertCollapse } from '../constants/alerts'
import {
  setMembresFetchAlert,
  setMembresMutateAlert,
} from '../redux/alerts/AlertsActions'

function PrivateAdminMembresScreen() {
  const dispatch = useDispatch()
  const { membresFetch, membresMutate } = useSelector((state) => state.alerts)
  const [search, setSearch] = useState(null)
  const [queryKey, setQueryKey] = useState(null)
  const [queryParams, setQueryParams] = useState(null)

  const collapseMutateCallback = () => {
    dispatch(setMembresMutateAlert(initialAlertCollapse))
  }
  const collapseFetchCallback = () => {
    dispatch(setMembresFetchAlert(initialAlertCollapse))
  }

  useEffect(() => {
    if (search) {
      setQueryKey([`${JSON.stringify(search)}`])
      setQueryParams(`email=${search.email}`)
    }
    return () => {
      setQueryKey(null)
      setQueryParams(null)
    }
  }, [search])

  useEffect(() => {
    collapseMutateCallback()
    collapseFetchCallback()
    return () => {
      collapseMutateCallback()
      collapseFetchCallback()
    }
  }, [])

  return (
    <Grid item container>
      <Grid item container>
        <AlertCollapse {...membresFetch} callback={collapseFetchCallback} />
      </Grid>
      <Grid item container>
        <AlertCollapse {...membresMutate} callback={collapseMutateCallback} />
      </Grid>
      <MembresForm setSearch={setSearch} />
      {search && (
        <MembresList
          search={search}
          queryKey={queryKey}
          queryParams={queryParams}
        />
      )}
    </Grid>
  )
}

export default PrivateAdminMembresScreen
