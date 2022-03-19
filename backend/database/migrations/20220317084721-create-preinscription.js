module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('preinscriptions', {
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
      childFirstname: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
      },
      childLastname: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false,
      },
      message: {
        type: Sequelize.DataTypes.STRING(1500),
      },
      status: {
        type: Sequelize.DataTypes.ENUM('etude', 'encours', 'cloturé'),
        defaultValue: 'etude',
      },
      verdict: {
        type: Sequelize.DataTypes.ENUM('ok', 'nok', 'encours'),
        defaultValue: 'encours',
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        entityId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'entities',
            key: 'id',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
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
    await queryInterface.dropTable('preinscriptions')
  },
}
