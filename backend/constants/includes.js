const EntityP = require('../models/EntityP')
const RoleP = require('../models/RoleP')

module.exports.userInclude = [
  {
    model: RoleP,
    include: [
      {
        model: EntityP,
        attributes: ['id', 'alias', 'name'],
      },
    ],
  },
  { model: EntityP },
]
