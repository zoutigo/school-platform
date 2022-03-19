const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Role,
      Entity,
      Suggestion,
      Paper,
      Dialog,
      Event,
      Preinscription,
    }) {
      // define association here
      this.belongsToMany(Role, { through: 'user_roles' })
      Role.belongsToMany(this, { through: 'user_roles' })

      this.belongsToMany(Entity, { through: 'user_entities' })
      Entity.belongsToMany(this, { through: 'user_entities' })

      this.hasMany(Suggestion, { foreignKey: 'userId' })
      Suggestion.belongsTo(this)

      this.hasMany(Paper, { foreignKey: 'userId' })
      Paper.belongsTo(this)

      this.hasMany(Dialog, { foreignKey: 'userId' })
      Dialog.belongsTo(this)

      this.hasMany(Event, { foreignKey: 'userId' })
      Event.belongsTo(this)

      this.hasMany(Preinscription, { foreignKey: 'userId' })
      Preinscription.belongsTo(this)
    }

    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }

  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      lastname: {
        type: DataTypes.STRING(30),
      },
      firstname: {
        type: DataTypes.STRING(30),
      },
      gender: {
        type: DataTypes.ENUM('monsieur', 'madame', 'choisir'),
        defaultValue: 'choisir',
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(14),
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isManager: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isModerator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isTeacher: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING(64),
      },
      emailToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      losspassToken: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )

  return User
}
