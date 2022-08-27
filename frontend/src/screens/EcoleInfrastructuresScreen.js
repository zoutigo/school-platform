/* eslint-disable import/named */
import React, { useCallback } from 'react'
import { useQuery } from 'react-query'
import AlbumPage from '../components/elements/album/AlbumPage'
import AlertCollapse from '../components/elements/AlertCollapse'
import useRigths from '../components/hooks/useRigths'
import useRoutesInfos from '../components/hooks/useRoutesInfos'
import { apiFetchAlbum } from '../utils/api'

import redefineAlias from '../utils/redefineAlias'

function EcoleInfrastructuresScreen() {
  const { adminLevel, managerLevel, moderatorLevel } = useRigths()
  const isAllowed = managerLevel || moderatorLevel || adminLevel

  const { category } = useRoutesInfos()
  const categoryAlias = useCallback(
    redefineAlias(category.current.state.alias),
    [category]
  )

  const queryKey = [`album-${categoryAlias}`]

  const queryParams = `slug=${categoryAlias}`

  console.log('queryparams', queryParams)
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

  return <AlbumPage currentAlbum={album} isAllowed={isAllowed} type="page" />
}

export default React.memo(EcoleInfrastructuresScreen)
