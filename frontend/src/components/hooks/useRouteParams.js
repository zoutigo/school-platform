import React from 'react'
import { useLocation } from 'react-router-dom'

const useRouteParams = (arg) => {
  const useQueryP = () => new URLSearchParams(useLocation().search)
  const query = useQueryP()

  return query.get(arg)
}

export default useRouteParams
