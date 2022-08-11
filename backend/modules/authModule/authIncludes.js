const { entity, role } = require('../../database/models')

module.exports.userInclude = [
  {
    model: role,
    attributes: ['uuid', 'name'],
  },
  { model: entity, attributes: ['uuid', 'name'] },
]
