module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mails')
  },
}
