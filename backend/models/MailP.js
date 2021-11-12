const Sequelize = require('sequelize')
const db = require('../config/database')
const UserP = require('./UserP')

const MailP = db.define(
  'mail',
  {
    title: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'le titre est obligatoire',
        },
        len: {
          args: [5, 50],
          msg: 'le titre doit avoir entre 5 et 50 caractères',
        },
      },
    },
    content: {
      type: Sequelize.STRING(5000),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'le contenu est obligatoire',
        },
        len: {
          args: [5, 5000],
          msg: 'le contenu doit avoir entre 5 et 5000 caractères',
        },
      },
    },
    datetosend: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "la date d'envoi est obligatoire",
        },
        isInt: {
          args: true,
          msg: 'la date doit etre un entier',
        },
      },
    },
    isSent: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'mails',
  }
)

UserP.hasMany(MailP, { foreignKey: 'userId' })
MailP.belongsTo(UserP)

module.exports = MailP
