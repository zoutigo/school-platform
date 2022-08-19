const { Model, Sequelize } = require('sequelize')
const paperVariantList = require('../../constants/paperVariantList')

module.exports = (sequelize, DataTypes) => {
  class Paper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ file }) {
      this.hasMany(file, {
        foreignKey: 'paperId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
      file.belongsTo(this)
    }
  }
  Paper.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: DataTypes.STRING(DataTypes.ENUM(paperVariantList)),
        defaultValue: 'monsieur',
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: `le titre est obligatoire`,
          },
          len: {
            args: [2, 100],
            msg: 'le titre doit avoir entre 2 et 100 caractères',
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      classroom: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
          len: {
            args: [2, 30],
            msg: 'La classe doit avoir entre 2 et 30 caractères',
          },
        },
      },
      isPrivate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      place: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          len: {
            args: [2, 100],
            msg: 'La classe  doit avoir entre 2 et 100 caractères',
          },
        },
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      startdate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      enddate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'paper',
      tableName: 'papers',
      paranoid: true,
    }
  )
  return Paper
}
