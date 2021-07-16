import { Grid } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import AlbumPage from '../components/elements/album/AlbumPage'
import AlertCollapse from '../components/elements/AlertCollapse'
import { apiFetchAlbum } from '../utils/api'
import { useRigths, useRouteDatas } from '../utils/hooks'

function EcoleInfrastructuresScreen() {
  const { adminLevel, managerLevel, moderatorLevel } = useRigths()
  const isAllowed = managerLevel || moderatorLevel || adminLevel

  const { categoryAlias, current } = useRouteDatas()

  const queryKey = [`album-${categoryAlias}`]
  const queryParams = `alias=${categoryAlias}`
  const { isLoading, isError, data, error } = useQuery(queryKey, () =>
    apiFetchAlbum(queryParams)
  )

  if (isLoading)
    return (
      <AlertCollapse severity="warning" alertText="Chargement ..." openAlert />
    )
  if (isError)
    return (
      <AlertCollapse severity="error" alertText={error.message} openAlert />
    )

  if (!Array.isArray(data) || data.length < 1)
    return (
      <AlertCollapse
        severity="error"
        alertText="aucun album trouvé  pour cette demande"
        openAlert
      />
    )

  // eslint-disable-next-line no-unused-vars
  const [album, ...rest] = data

  return <AlbumPage currentAlbum={album} isAllowed={isAllowed} />
}

export default EcoleInfrastructuresScreen
