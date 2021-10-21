import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

const useRigths = () => {
  const { User } = useSelector((state) => state.user)

  const setRigths = useCallback(() => {
    const { isAdmin, isModerator, isManager, isTeacher, exp, id } = User
    const TokenIsValid = exp && id ? new Date().getTime() / 1000 < exp : false

    const userLevel = TokenIsValid
    const teacherLevel =
      TokenIsValid && (isAdmin || isManager || isModerator || isTeacher)
    const managerLevel = TokenIsValid && (isAdmin || isManager)
    const adminLevel = TokenIsValid && isAdmin
    const moderatorLevel = TokenIsValid && (isAdmin || isManager || isModerator)
    return { userLevel, teacherLevel, managerLevel, adminLevel, moderatorLevel }
  }, [User])

  return { ...setRigths() }
}

export default useRigths
