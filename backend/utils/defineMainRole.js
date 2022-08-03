const defineMainRole = (user) => {
  if (user.isAdmin) return 'admin'
  if (user.isManager) return 'manager'
  return 'moderator'
}

module.exports = defineMainRole
