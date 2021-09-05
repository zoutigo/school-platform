const db = require('../config/database')
const EntityP = require('./EntityP')
const UserP = require('./UserP')

const UserEntities = db.define('user_entity', {}, { timestamps: true })
UserP.belongsToMany(EntityP, { through: UserEntities })
EntityP.belongsToMany(UserP, { through: UserEntities })

module.exports = UserEntities
