module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      uuid: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      title: {
        type: Sequelize.DataTypes.STRING(50),
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
        type: Sequelize.DataTypes.STRING(5000),
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
        type: Sequelize.DataTypes.STRING,
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
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mails')
  },
}
