import React from 'react'
import { useRigths } from '../utils/hooks'

function PrivateAccountScreen() {
  const { userLevel, teacherLevel, managerLevel, adminLevel, moderatorLevel } =
    useRigths()

  return (
    <div>
      {userLevel && <div>User</div>}
      {teacherLevel && <div>Teatcher</div>}
      {managerLevel && <div>Manager</div>}
      {moderatorLevel && <div>Moderator</div>}
      {adminLevel && <div>Admin</div>}
    </div>
  )
}

export default PrivateAccountScreen
