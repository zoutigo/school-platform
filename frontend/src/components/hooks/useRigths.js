import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

const useRigths = () => {
  const { User } = useSelector((state) => state.user)

  const setRigths = useCallback(() => {
    // const { isAdmin, isModerator, isManager, isTeacher, exp, id } = User
    const TokenIsValid =
      User?.exp && User?.id ? new Date().getTime() / 1000 < User?.exp : false

    const userLevel = TokenIsValid
    const teacherLevel =
      TokenIsValid &&
      (User?.isAdmin || User?.isManager || User?.isModerator || User?.isTeacher)
    const managerLevel = TokenIsValid && (User?.isAdmin || User?.isManager)
    const adminLevel = TokenIsValid && User?.isAdmin
    const moderatorLevel =
      TokenIsValid && (User?.isAdmin || User?.isManager || User?.isModerator)
    return { userLevel, teacherLevel, managerLevel, adminLevel, moderatorLevel }
  }, [User])

  return { ...setRigths() }
}

export default useRigths
