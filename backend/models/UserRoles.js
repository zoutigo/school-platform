const db = require('../config/database')
const RoleP = require('./RoleP')
const UserP = require('./UserP')

const UserRoles = db.define('user_role', {}, { timestamps: false })
UserP.belongsToMany(RoleP, { through: UserRoles })
RoleP.belongsToMany(UserP, { through: UserRoles })

module.exports = UserRoles
